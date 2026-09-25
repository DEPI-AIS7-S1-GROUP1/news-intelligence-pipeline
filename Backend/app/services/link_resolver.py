"""
Link resolution service for news articles.
Finds article links from explicit input, embedded URLs in text, or dataset lookup.
Keeps LLM prompt untouched to preserve the ~85% classification accuracy.
"""
import re
import os
import sqlite3
from typing import Optional
from ..core.logging_config import get_logger

logger = get_logger(__name__)

# Regex pattern to match URLs (http, https, www)
URL_REGEX = re.compile(r'(https?://[^\s<>"]+|www\.[^\s<>"]+)', re.IGNORECASE)

# Path to the SQLite database containing indexed dataset links
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "news_links.db")


def normalize_headline(headline: str) -> str:
    """Normalize headline string for indexing and lookup."""
    if not headline:
        return ""
    # Strip spaces, lower case, remove surrounding quotes
    return headline.strip().lower().strip("\"'")


def lookup_dataset_link(headline: str) -> Optional[str]:
    """Look up original link from the local news_links SQLite database."""
    if not os.path.exists(DB_PATH) or not headline:
        return None
    try:
        norm = normalize_headline(headline)
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT link FROM article_links WHERE normalized_headline = ?", (norm,))
        row = cur.fetchone()
        conn.close()
        if row and row[0]:
            return row[0].strip()
    except Exception as e:
        logger.warning(f"Error querying news_links.db: {e}")
    return None


def resolve_article_link(
    headline: str,
    short_description: str = "",
    explicit_link: Optional[str] = None
) -> str:
    """
    Resolve link of the article if found, otherwise return 'could not find it'.

    Order of resolution:
    1. Explicit link provided in the request
    2. URL embedded in the headline or description text
    3. Match against dataset archive by headline
    4. Default fallback: 'could not find it'
    """
    # 1. Explicit link in request
    if explicit_link and explicit_link.strip():
        link_str = explicit_link.strip()
        if link_str.lower() != "could not find it":
            return link_str

    # 2. Extract embedded URL from text
    full_text = f"{headline or ''} {short_description or ''}"
    match = URL_REGEX.search(full_text)
    if match:
        url = match.group(0).rstrip('.,;:)')
        if url.lower().startswith('www.'):
            url = 'https://' + url
        return url

    # 3. Look up in dataset
    dataset_link = lookup_dataset_link(headline)
    if dataset_link:
        return dataset_link

    # 4. Not found
    return "could not find it"
