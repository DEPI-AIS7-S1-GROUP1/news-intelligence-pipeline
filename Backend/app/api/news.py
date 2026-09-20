"""
News analysis API endpoints.
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List

from ..core.config import Settings, get_settings
from ..core.logging_config import get_logger
from ..schemas import (
    NewsAnalysisRequest,
    NewsAnalysisResponse,
    CategoriesResponse,
    MASTER_CATEGORIES,
)
from ..services import NewsAnalysisService

logger = get_logger(__name__)

router = APIRouter(prefix="/api/news", tags=["news"])

# Dependency to get news analysis service
def get_news_service(settings: Settings = Depends(get_settings)) -> NewsAnalysisService:
    """Dependency injection for news analysis service."""
    return NewsAnalysisService(settings)


@router.post("/analyze", response_model=NewsAnalysisResponse)
async def analyze_news(
    request: NewsAnalysisRequest,
    service: NewsAnalysisService = Depends(get_news_service)
):
    """
    Analyze a news article and extract category, entities, and summary.
    
    This endpoint implements the complete news intelligence pipeline:
    1. Validates input (headline and description required)
    2. Attempts analysis with Groq API (with automatic retry)
    3. Falls back to rule-based analysis if Groq fails
    4. Returns structured, validated results
    
    **Example Request:**
    ```json
    {
        "headline": "Apple Unveils New iPhone With AI Features",
        "short_description": "Apple CEO Tim Cook announced the device at headquarters.",
        "authors": "Jane Doe",
        "date": "2024-01-15"
    }
    ```
    
    **Example Response:**
    ```json
    {
        "success": true,
        "data": {
            "category": "TECH",
            "confidence": 0.95,
            "entities": {
                "people": ["Tim Cook"],
                "organizations": ["Apple"],
                "locations": ["headquarters"]
            },
            "key_dates": [],
            "summary": "Apple announced a new iPhone with AI features."
        },
        "provider": "groq"
    }
    ```
    """
    try:
        logger.info(f"Received analysis request for: {request.headline[:50]}...")
        
        # Perform analysis
        result, provider = service.analyze(request)
        
        return NewsAnalysisResponse(
            success=True,
            data=result,
            error=None,
            provider=provider
        )
    
    except Exception as e:
        logger.error(f"Analysis failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"News analysis service temporarily unavailable: {str(e)}"
        )


@router.get("/categories", response_model=CategoriesResponse)
async def get_categories():
    """
    Get the list of valid news categories.
    
    Returns the 9 master categories used by the model after consolidating
    the original 42 categories from the HuffPost dataset.
    
    **Categories:**
    - BUSINESS & FINANCE
    - CRIME
    - EDUCATION
    - HEALTH & WELLNESS
    - POLITICS & NEWS
    - SCIENCE & ENVIRONMENT
    - SOCIETY & LIFESTYLE
    - SPORTS
    - TECH
    """
    return CategoriesResponse(
        categories=MASTER_CATEGORIES,
        count=len(MASTER_CATEGORIES)
    )
