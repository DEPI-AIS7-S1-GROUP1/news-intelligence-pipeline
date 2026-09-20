"""
Fallback service for when Groq API is unavailable.
Provides basic classification with low confidence.

Note: The notebook uses a transformers-based local model (Qwen/Qwen2.5-0.5B-Instruct)
as fallback. For production API, we implement a simpler fallback that:
1. Returns POLITICS & NEWS as the most common category (from notebook analysis)
2. Sets low confidence (0.3)
3. Attempts basic entity extraction from text
4. Provides a simple summary

To implement full transformers fallback, the model would need to be downloaded
and loaded at startup (several GB), which is optional for production deployment.
"""
import re
from typing import List

from ..core.logging_config import get_logger
from ..schemas import NewsAnalysis, Entities

logger = get_logger(__name__)

# Most common category from the original dataset analysis
MOST_COMMON_CATEGORY = "POLITICS & NEWS"


class FallbackService:
    """
    Simple fallback service when Groq API is unavailable.
    Provides basic analysis with clearly marked low confidence.
    """
    
    def __init__(self):
        """Initialize fallback service."""
        logger.info("Fallback service initialized (rule-based)")
    
    def analyze_news(
        self,
        headline: str,
        short_description: str,
        authors: str = "",
        date: str = "",
    ) -> NewsAnalysis:
        """
        Provide basic fallback analysis when Groq API fails.
        
        Uses simple heuristics:
        - Default category: POLITICS & NEWS (most common in dataset)
        - Low confidence: 0.3
        - Basic entity extraction using capitalized word patterns
        - Simple summary generation
        
        Args:
            headline: Article headline
            short_description: Article description
            authors: Article author(s)
            date: Publication date
            
        Returns:
            NewsAnalysis with fallback results
        """
        logger.warning(
            "Using fallback service for article analysis "
            f"(Groq unavailable): {headline[:50]}..."
        )
        
        combined_text = f"{headline} {short_description}"
        
        # Simple keyword-based category detection
        category = self._detect_category(combined_text)
        
        # Basic entity extraction using capitalization patterns
        entities = self._extract_entities(combined_text, authors)
        
        # Extract potential dates
        key_dates = self._extract_dates(combined_text)
        
        # Generate simple summary
        summary = self._generate_summary(headline, short_description)
        
        return NewsAnalysis(
            category=category,
            confidence=0.3,  # Low confidence for fallback
            entities=entities,
            key_dates=key_dates,
            summary=summary
        )
    
    def _detect_category(self, text: str) -> str:
        """
        Simple keyword-based category detection.
        Returns most common category if no match.
        """
        text_lower = text.lower()
        
        # Simple keyword patterns for major categories
        if any(word in text_lower for word in ['tech', 'ai', 'software', 'app', 'computer', 'digital', 'cyber']):
            return "TECH"
        elif any(word in text_lower for word in ['sport', 'game', 'player', 'team', 'championship', 'match']):
            return "SPORTS"
        elif any(word in text_lower for word in ['business', 'market', 'stock', 'economy', 'financial', 'company', 'ceo']):
            return "BUSINESS & FINANCE"
        elif any(word in text_lower for word in ['health', 'medical', 'doctor', 'hospital', 'disease', 'wellness']):
            return "HEALTH & WELLNESS"
        elif any(word in text_lower for word in ['crime', 'arrest', 'police', 'court', 'guilty', 'sentence']):
            return "CRIME"
        elif any(word in text_lower for word in ['school', 'university', 'student', 'education', 'college']):
            return "EDUCATION"
        elif any(word in text_lower for word in ['science', 'research', 'study', 'environment', 'climate']):
            return "SCIENCE & ENVIRONMENT"
        elif any(word in text_lower for word in ['art', 'music', 'food', 'travel', 'style', 'culture', 'entertainment']):
            return "SOCIETY & LIFESTYLE"
        
        # Default to most common category
        return MOST_COMMON_CATEGORY
    
    def _extract_entities(self, text: str, authors: str = "") -> Entities:
        """
        Extract entities using simple capitalization patterns.
        This is a basic heuristic and not as accurate as LLM extraction.
        """
        # Find capitalized words (potential entities)
        # Pattern: words starting with capital letter
        words = re.findall(r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b', text)
        
        # Filter out common non-entity words
        common_words = {'The', 'A', 'An', 'This', 'That', 'These', 'Those', 'In', 'On', 'At'}
        potential_entities = [w for w in words if w not in common_words]
        
        # Simple heuristic: assume multi-word capitalized phrases are organizations or locations
        people = []
        organizations = []
        locations = []
        
        # Add authors as people if provided
        if authors and authors != "Unknown":
            people.append(authors)
        
        # Distribute extracted entities (very basic heuristic)
        for entity in potential_entities[:5]:  # Limit to top 5
            if len(entity.split()) == 2:  # Two-word phrases often names
                people.append(entity)
            elif len(entity.split()) > 2:  # Multi-word often organizations
                organizations.append(entity)
        
        return Entities(
            people=list(set(people))[:3],  # Deduplicate and limit
            organizations=list(set(organizations))[:3],
            locations=list(set(locations))[:3]
        )
    
    def _extract_dates(self, text: str) -> List[str]:
        """Extract potential date expressions from text."""
        date_patterns = [
            r'\b\d{4}\b',  # Years
            r'\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b',
            r'\b(?:today|tomorrow|yesterday|last\s+\w+|this\s+\w+|next\s+\w+)\b'
        ]
        
        dates = []
        for pattern in date_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            dates.extend(matches)
        
        return list(set(dates))[:3]  # Deduplicate and limit
    
    def _generate_summary(self, headline: str, description: str) -> str:
        """Generate a simple summary from headline and description."""
        if not headline and not description:
            return "No content available for summarization."
        
        # Use headline if available, otherwise first sentence of description
        if headline:
            return headline.strip('.')  + "."
        
        # Take first sentence from description
        sentences = re.split(r'[.!?]', description)
        if sentences:
            return sentences[0].strip() + "."
        
        return description[:100] + "..." if len(description) > 100 else description
