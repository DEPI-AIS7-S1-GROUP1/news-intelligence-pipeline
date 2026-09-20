"""
Application configuration using environment variables.
Based on the notebook's environment setup.
"""
import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Configuration
    app_name: str = "News Intelligence API"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Groq Configuration (Primary LLM Provider)
    groq_api_key: str = ""
    groq_model: str = "openai/gpt-oss-120b"
    groq_timeout: int = 30
    
    # Retry Configuration
    max_retry_attempts: int = 3
    retry_min_wait: int = 2  # seconds
    retry_max_wait: int = 10  # seconds
    retry_multiplier: int = 1
    
    # CORS Configuration
    cors_origins: list = ["http://localhost:3000", "http://localhost:5173"]
    
    # Logging
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
    
    @property
    def groq_configured(self) -> bool:
        """Check if Groq API key is configured."""
        return bool(self.groq_api_key and self.groq_api_key.strip())


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to ensure settings are loaded only once.
    """
    return Settings()
