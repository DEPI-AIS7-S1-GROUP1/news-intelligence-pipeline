"""Prompt templates and builders for news analysis."""
from .news_prompt import (
    FEW_SHOT_EXAMPLES,
    FEW_SHOT_BLOCK,
    SYSTEM_PROMPT_TEMPLATE,
    SYSTEM_PROMPT,
    build_system_prompt,
    build_user_prompt,
)

__all__ = [
    "FEW_SHOT_EXAMPLES",
    "FEW_SHOT_BLOCK",
    "SYSTEM_PROMPT_TEMPLATE",
    "SYSTEM_PROMPT",
    "build_system_prompt",
    "build_user_prompt",
]
