"""
Groq API service with retry logic and exponential backoff.
Based on the notebook's implementation using tenacity.
"""
import json
from typing import Optional
from groq import Groq
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
    before_sleep_log,
)
from pydantic import ValidationError

from ..core.config import Settings
from ..core.logging_config import get_logger
from ..schemas import NewsAnalysis
from ..prompts import SYSTEM_PROMPT, build_user_prompt

logger = get_logger(__name__)


class PipelineError(Exception):
    """Recoverable failure in the Groq call/parse/validate chain."""
    pass


class GroqService:
    """
    Service for interacting with Groq API.
    Includes retry logic with exponential backoff.
    """
    
    def __init__(self, settings: Settings):
        """
        Initialize Groq service.
        
        Args:
            settings: Application settings containing Groq configuration
        """
        self.settings = settings
        self.client: Optional[Groq] = None
        
        if settings.groq_configured:
            try:
                self.client = Groq(
                    api_key=settings.groq_api_key,
                    timeout=settings.groq_timeout
                )
                logger.info("Groq client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Groq client: {e}")
                self.client = None
        else:
            logger.warning("Groq API key not configured")
    
    def is_available(self) -> bool:
        """Check if Groq service is available."""
        return self.client is not None
    
    def _log_retry_attempt(self, retry_state):
        """Log retry attempts for debugging."""
        logger.warning(
            f"[retry] call_llm attempt {retry_state.attempt_number} "
            f"failed with {retry_state.outcome.exception()!r} -- "
            f"retrying in {retry_state.next_action.sleep:.1f}s"
        )
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(PipelineError),
        reraise=True,
    )
    def analyze_news(
        self,
        headline: str,
        short_description: str,
        authors: str = "",
        date: str = "",
    ) -> NewsAnalysis:
        """
        Analyze a news article using Groq API with retry logic.
        
        This method uses tenacity for automatic retries with exponential backoff:
        - Maximum 3 attempts
        - Wait time: 2s to 10s with exponential backoff
        - Only retries on PipelineError
        
        Args:
            headline: Article headline
            short_description: Article description
            authors: Article author(s)
            date: Publication date
            
        Returns:
            NewsAnalysis object with validated results
            
        Raises:
            PipelineError: If Groq API call fails or response is invalid
        """
        if not self.is_available():
            raise PipelineError("Groq API key is not configured")
        
        try:
            # Build the user prompt
            user_prompt = build_user_prompt(
                headline=headline,
                short_description=short_description,
                authors=authors or "Unknown",
                date=date or "Unknown"
            )
            
            logger.info(f"Calling Groq API for headline: {headline[:50]}...")
            
            # Call Groq API
            response = self.client.chat.completions.create(
                model=self.settings.groq_model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0.7,
                response_format={"type": "json_object"},
            )
            
            # Extract response content
            raw_text = response.choices[0].message.content
            
            if not raw_text:
                raise PipelineError("Empty response from Groq API")
            
            logger.debug(f"Groq raw response: {raw_text[:200]}...")
            
            # Parse JSON response
            try:
                data = json.loads(raw_text)
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {raw_text[:500]}")
                raise PipelineError(f"Invalid JSON response from Groq: {e}") from e
            
            # Validate with Pydantic
            try:
                result = NewsAnalysis(**data)
                logger.info(
                    f"Successfully analyzed: category={result.category}, "
                    f"confidence={result.confidence:.2f}"
                )
                return result
            except ValidationError as e:
                logger.error(f"Pydantic validation failed: {e}")
                raise PipelineError(
                    f"Groq response validation failed: {e}"
                ) from e
        
        except PipelineError:
            # Re-raise PipelineError for retry logic
            raise
        except Exception as exc:
            # Wrap other exceptions as PipelineError
            logger.error(f"Unexpected error in Groq service: {exc}")
            raise PipelineError(
                f"Groq request or response processing failed: {exc}"
            ) from exc
