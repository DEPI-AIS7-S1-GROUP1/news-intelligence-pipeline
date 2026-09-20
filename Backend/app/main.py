"""
FastAPI application entry point.
News Intelligence API - converts news articles into structured analysis.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .core.config import get_settings
from .core.logging_config import setup_logging, get_logger
from .api import news_router
from .schemas import HealthResponse

# Setup logging
settings = get_settings()
setup_logging(settings.log_level)
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    logger.info("Starting News Intelligence API...")
    logger.info(f"Groq configured: {settings.groq_configured}")
    logger.info(f"Debug mode: {settings.debug}")
    yield
    logger.info("Shutting down News Intelligence API...")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="""
    News Intelligence API - AI-powered news article classification and analysis.
    
    ## Features
    
    * **Category Classification**: Automatically categorizes news articles into 9 major categories
    * **Entity Extraction**: Identifies people, organizations, and locations mentioned
    * **Summary Generation**: Creates concise one-sentence summaries
    * **Confidence Scoring**: Provides confidence levels for classifications
    * **High Availability**: Automatic retry with fallback to rule-based analysis
    
    ## Categories
    
    The system uses 9 consolidated categories from the original HuffPost dataset:
    - BUSINESS & FINANCE
    - CRIME
    - EDUCATION
    - HEALTH & WELLNESS
    - POLITICS & NEWS
    - SCIENCE & ENVIRONMENT
    - SOCIETY & LIFESTYLE
    - SPORTS
    - TECH
    
    ## Architecture
    
    1. **Primary**: Groq API with advanced LLM (with retry and exponential backoff)
    2. **Fallback**: Rule-based classification when Groq is unavailable
    
    Based on the News Intelligence Pipeline notebook implementation.
    """,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(news_router)


@app.get("/", tags=["root"])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "News Intelligence API",
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/api/health"
    }


@app.get("/api/health", response_model=HealthResponse, tags=["health"])
async def health_check():
    """
    Health check endpoint.
    
    Returns the health status of the API and whether Groq is configured.
    """
    return HealthResponse(
        status="healthy",
        groq_configured=settings.groq_configured
    )
