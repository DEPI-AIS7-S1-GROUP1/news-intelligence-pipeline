"""
Main news analysis service.
Orchestrates the flow: Groq (with retry) → Fallback (if Groq fails).
"""
from typing import Tuple

from ..core.config import Settings
from ..core.logging_config import get_logger
from ..schemas import NewsAnalysis, NewsAnalysisRequest
from .groq_service import GroqService, PipelineError
from .fallback_service import FallbackService
from .link_resolver import resolve_article_link

logger = get_logger(__name__)


class NewsAnalysisService:
    """
    Main service for analyzing news articles.
    Implements the pipeline: Groq (primary) → Fallback (if Groq fails).
    """
    
    def __init__(self, settings: Settings):
        """
        Initialize news analysis service with Groq and fallback services.
        
        Args:
            settings: Application settings
        """
        self.settings = settings
        self.groq_service = GroqService(settings)
        self.fallback_service = FallbackService()
        
        logger.info(
            f"NewsAnalysisService initialized "
            f"(Groq available: {self.groq_service.is_available()})"
        )
    
    def analyze(self, request: NewsAnalysisRequest) -> Tuple[NewsAnalysis, str]:
        """
        Analyze a news article using the best available method.
        
        Flow:
        1. Try Groq API (with automatic retry via tenacity)
        2. If Groq fails after retries, use fallback service
        
        Args:
            request: News analysis request with article metadata
            
        Returns:
            Tuple of (NewsAnalysis result, provider name)
            Provider is either "groq" or "fallback"
        """
        # Try Groq first (if available)
        if self.groq_service.is_available():
            try:
                logger.info(f"Attempting analysis with Groq: {request.headline[:50]}...")
                
                result = self.groq_service.analyze_news(
                    headline=request.headline,
                    short_description=request.short_description,
                    authors=request.authors or "",
                    date=request.date or ""
                )
                
                # Resolve article link without altering LLM prompt
                result.article_link = resolve_article_link(
                    headline=request.headline,
                    short_description=request.short_description,
                    explicit_link=request.link
                )
                
                logger.info(
                    f"Successfully analyzed with Groq: "
                    f"category={result.category}, confidence={result.confidence:.2f}, link={result.article_link}"
                )
                
                return result, "groq"
            
            except PipelineError as e:
                logger.error(
                    f"Groq analysis failed after retries: {e}. "
                    "Falling back to rule-based analysis."
                )
                # Fall through to fallback
            
            except Exception as e:
                logger.error(
                    f"Unexpected error in Groq analysis: {e}. "
                    "Falling back to rule-based analysis."
                )
                # Fall through to fallback
        else:
            logger.warning(
                "Groq API not configured. Using fallback analysis."
            )
        
        # Fallback service
        logger.info(f"Using fallback service for: {request.headline[:50]}...")
        
        result = self.fallback_service.analyze_news(
            headline=request.headline,
            short_description=request.short_description,
            authors=request.authors or "",
            date=request.date or ""
        )
        
        # Resolve article link for fallback
        result.article_link = resolve_article_link(
            headline=request.headline,
            short_description=request.short_description,
            explicit_link=request.link
        )
        
        logger.info(
            f"Fallback analysis complete: "
            f"category={result.category}, confidence={result.confidence:.2f}, link={result.article_link}"
        )
        
        return result, "fallback"
    
    def get_health_status(self) -> dict:
        """
        Get health status of the service.
        
        Returns:
            Dictionary with health information
        """
        return {
            "groq_available": self.groq_service.is_available(),
            "groq_configured": self.settings.groq_configured,
            "fallback_available": True,
        }
