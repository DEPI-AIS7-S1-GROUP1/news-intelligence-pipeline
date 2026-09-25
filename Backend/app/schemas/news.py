"""
Pydantic schemas for news analysis.
Extracted from the original notebook's implementation.
"""
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

# Master categories after ultra-merge from 42 original categories to 9
# This is the exact list from the notebook after category consolidation
MASTER_CATEGORIES = [
    'BUSINESS & FINANCE',
    'CRIME',
    'EDUCATION',
    'HEALTH & WELLNESS',
    'POLITICS & NEWS',
    'SCIENCE & ENVIRONMENT',
    'SOCIETY & LIFESTYLE',
    'SPORTS',
    'TECH'
]

# Category is constrained to the exact cleaned master list
CategoryLiteral = Literal[
    'BUSINESS & FINANCE',
    'CRIME',
    'EDUCATION',
    'HEALTH & WELLNESS',
    'POLITICS & NEWS',
    'SCIENCE & ENVIRONMENT',
    'SOCIETY & LIFESTYLE',
    'SPORTS',
    'TECH'
]


class Entities(BaseModel):
    """Named entities extracted from the article."""
    people: List[str] = Field(
        default_factory=list,
        description="Named individuals mentioned in the article."
    )
    organizations: List[str] = Field(
        default_factory=list,
        description="Companies, institutions, government bodies, etc."
    )
    locations: List[str] = Field(
        default_factory=list,
        description="Cities, countries, regions, or named places."
    )


class NewsAnalysis(BaseModel):
    """Complete news analysis result with strict validation."""
    category: CategoryLiteral
    confidence: float = Field(
        ge=0.0,
        le=1.0,
        description="Model's self-reported confidence in the category label."
    )
    entities: Entities
    key_dates: List[str] = Field(
        default_factory=list,
        description="Any explicit dates/date expressions found in the text, as written."
    )
    summary: str = Field(
        description="One-sentence, neutral restatement of the article's key point."
    )
    article_link: str = Field(
        default="could not find it",
        description="Link to the article if found, otherwise 'could not find it'"
    )


class NewsAnalysisRequest(BaseModel):
    """Request schema for news analysis endpoint."""
    headline: str = Field(
        ...,
        min_length=1,
        description="Article headline"
    )
    short_description: str = Field(
        ...,
        min_length=1,
        description="Brief article summary or description"
    )
    authors: Optional[str] = Field(
        default="",
        description="Article author(s)"
    )
    date: Optional[str] = Field(
        default="",
        description="Publication date"
    )
    link: Optional[str] = Field(
        default="",
        description="Optional article link or URL"
    )


class NewsAnalysisResponse(BaseModel):
    """Response schema for news analysis endpoint."""
    success: bool
    data: Optional[NewsAnalysis] = None
    error: Optional[str] = None
    provider: str = Field(
        description="Which provider was used: 'groq' or 'fallback'"
    )


class CategoriesResponse(BaseModel):
    """Response schema for categories endpoint."""
    categories: List[str]
    count: int


class HealthResponse(BaseModel):
    """Response schema for health check endpoint."""
    status: str
    groq_configured: bool
