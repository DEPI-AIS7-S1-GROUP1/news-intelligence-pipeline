# News Intelligence API

A production-ready FastAPI backend for AI-powered news article classification and analysis. This implementation is based on the **News Intelligence Pipeline** notebook and preserves its core functionality while providing a clean REST API interface.

## Features

- **Automated Category Classification**: Categorizes news articles into 9 major categories
- **Entity Extraction**: Identifies people, organizations, and locations mentioned in articles
- **Intelligent Summarization**: Generates concise one-sentence summaries
- **Confidence Scoring**: Provides confidence levels for all classifications
- **High Availability**: Automatic retry with exponential backoff and fallback to rule-based analysis
- **Production-Ready**: Clean architecture, comprehensive logging, CORS support, and Swagger documentation

## Categories

The system uses 9 consolidated categories (reduced from the original 42 HuffPost dataset categories):

1. **BUSINESS & FINANCE**
2. **CRIME**
3. **EDUCATION**
4. **HEALTH & WELLNESS**
5. **POLITICS & NEWS**
6. **SCIENCE & ENVIRONMENT**
7. **SOCIETY & LIFESTYLE**
8. **SPORTS**
9. **TECH**

## Architecture

```
┌─────────────────┐
│  FastAPI App    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ News Service    │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────┐
│  Groq Service   │  │   Fallback   │
│  (Primary LLM)  │  │   Service    │
│  + Retry Logic  │  │ (Rule-based) │
└─────────────────┘  └──────────────┘
```

### Flow

1. **Primary**: Groq API with advanced LLM (with 3 retry attempts and exponential backoff)
2. **Fallback**: Rule-based classification when Groq is unavailable or fails

## Installation

### Prerequisites

- Python 3.8+
- pip

### Setup

1. **Clone the repository** (if not already done)

2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Groq API key
   # Get a free key at: https://console.groq.com
   ```

   Example `.env`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=openai/gpt-oss-120b
   DEBUG=false
   LOG_LEVEL=INFO
   ```

## Running the API

### Development Server

```bash
uvicorn app.main:app --reload --port 8000
```

Or using Python module syntax:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- **Base URL**: http://localhost:8000
- **Interactive API docs (Swagger)**: http://localhost:8000/docs
- **Alternative docs (ReDoc)**: http://localhost:8000/redoc

### Production Server

For production, use Gunicorn with Uvicorn workers:

```bash
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## API Endpoints

### 1. Health Check

**GET** `/api/health`

Check the health status of the API.

**Response**:
```json
{
  "status": "healthy",
  "groq_configured": true
}
```

### 2. Get Categories

**GET** `/api/news/categories`

Retrieve the list of valid news categories.

**Response**:
```json
{
  "categories": [
    "BUSINESS & FINANCE",
    "CRIME",
    "EDUCATION",
    "HEALTH & WELLNESS",
    "POLITICS & NEWS",
    "SCIENCE & ENVIRONMENT",
    "SOCIETY & LIFESTYLE",
    "SPORTS",
    "TECH"
  ],
  "count": 9
}
```

### 3. Analyze News Article

**POST** `/api/news/analyze`

Analyze a news article and extract structured information.

**Request Body**:
```json
{
  "headline": "Apple Unveils New iPhone With AI Features",
  "short_description": "Apple CEO Tim Cook announced the device at company headquarters.",
  "authors": "Jane Doe",
  "date": "2024-01-15"
}
```

**Response**:
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
    "summary": "Apple announced a new iPhone with AI features at its headquarters."
  },
  "provider": "groq"
}
```

**Fields**:
- `headline` (required): Article headline
- `short_description` (required): Article description or summary
- `authors` (optional): Article author(s)
- `date` (optional): Publication date

**Response Fields**:
- `success`: Whether the analysis was successful
- `data`: The analysis results
  - `category`: Classified category (one of the 9 categories)
  - `confidence`: Confidence score (0.0 to 1.0)
  - `entities`: Extracted named entities
    - `people`: List of person names
    - `organizations`: List of organizations
    - `locations`: List of locations
  - `key_dates`: Date expressions found in the text
  - `summary`: One-sentence summary of the article
- `provider`: Which provider was used (`"groq"` or `"fallback"`)
- `error`: Error message (if `success` is false)

## Example Usage

### cURL

```bash
curl -X POST "http://localhost:8000/api/news/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Local Team Wins Championship",
    "short_description": "The hometown basketball team secured victory in the final game.",
    "authors": "Sports Reporter",
    "date": "2024-01-16"
  }'
```

### Python (requests)

```python
import requests

url = "http://localhost:8000/api/news/analyze"
data = {
    "headline": "New Study Shows Benefits of Exercise",
    "short_description": "Researchers found that regular exercise improves mental health.",
    "authors": "Dr. Smith",
    "date": "2024-01-16"
}

response = requests.post(url, json=data)
result = response.json()

print(f"Category: {result['data']['category']}")
print(f"Confidence: {result['data']['confidence']}")
print(f"Summary: {result['data']['summary']}")
```

### JavaScript (fetch)

```javascript
const url = "http://localhost:8000/api/news/analyze";
const data = {
  headline: "Tech Company Announces New Product",
  short_description: "The company revealed its latest innovation at an event.",
  authors: "Tech Reporter",
  date: "2024-01-16"
};

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log("Category:", result.data.category);
    console.log("Confidence:", result.data.confidence);
    console.log("Summary:", result.data.summary);
  });
```

## Configuration

All configuration is done via environment variables (in `.env` file):

| Variable | Default | Description |
|----------|---------|-------------|
| `GROQ_API_KEY` | (empty) | **Required** for full functionality. Get from https://console.groq.com |
| `GROQ_MODEL` | `openai/gpt-oss-120b` | Groq model to use |
| `GROQ_TIMEOUT` | `30` | API timeout in seconds |
| `MAX_RETRY_ATTEMPTS` | `3` | Maximum retry attempts |
| `RETRY_MIN_WAIT` | `2` | Minimum wait between retries (seconds) |
| `RETRY_MAX_WAIT` | `10` | Maximum wait between retries (seconds) |
| `RETRY_MULTIPLIER` | `1` | Exponential backoff multiplier |
| `DEBUG` | `false` | Enable debug mode |
| `LOG_LEVEL` | `INFO` | Logging level (DEBUG, INFO, WARNING, ERROR) |
| `CORS_ORIGINS` | `http://localhost:3000,http://localhost:5173` | Allowed CORS origins |

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   │
│   ├── api/                    # API endpoints
│   │   ├── __init__.py
│   │   └── news.py             # News analysis endpoints
│   │
│   ├── schemas/                # Pydantic models
│   │   ├── __init__.py
│   │   └── news.py             # Request/response schemas
│   │
│   ├── services/               # Business logic
│   │   ├── __init__.py
│   │   ├── news_service.py     # Main orchestration service
│   │   ├── groq_service.py     # Groq API client with retry
│   │   └── fallback_service.py # Rule-based fallback
│   │
│   ├── core/                   # Core configuration
│   │   ├── __init__.py
│   │   ├── config.py           # Settings management
│   │   └── logging_config.py   # Logging setup
│   │
│   ├── prompts/                # LLM prompts
│   │   ├── __init__.py
│   │   └── news_prompt.py      # System/user prompts
│   │
│   └── utils/                  # Utilities
│       └── __init__.py
│
├── .env.example                # Environment template
├── .env                        # Your local config (not in git)
├── .gitignore
├── requirements.txt
└── README.md
```

## Error Handling

The API uses proper HTTP status codes:

- **200 OK**: Successful analysis
- **422 Unprocessable Entity**: Invalid request data
- **500 Internal Server Error**: Service error

Error response format:
```json
{
  "detail": "Error message description"
}
```

## Logging

The application provides detailed logging:

- **INFO**: Normal operation, request tracking
- **WARNING**: Fallback usage, retry attempts
- **ERROR**: Failures, exceptions

Logs include:
- Request received
- LLM provider used
- Retry attempts
- Fallback activation
- Analysis results

## Fallback Behavior

When Groq API is unavailable or fails:

1. **Automatic Retry**: 3 attempts with exponential backoff (2-10 seconds)
2. **Fallback Service**: Rule-based classification if retries exhausted
   - Uses keyword matching for category detection
   - Basic entity extraction via regex
   - Returns confidence of 0.3 (indicating lower accuracy)
   - Default category: POLITICS & NEWS (most common in dataset)

## Differences from Notebook

The API implementation differs from the original notebook in these ways:

### **Included** (Production API Features):
- ✅ Category classification (9 master categories)
- ✅ Entity extraction (people, organizations, locations)
- ✅ Summary generation
- ✅ Confidence scoring
- ✅ Groq API integration with retry logic
- ✅ Fallback classification
- ✅ Prompt engineering with few-shot examples
- ✅ Pydantic validation

### **Excluded** (Notebook/Research Only):
- ❌ Dataset loading and EDA (Pandas, Matplotlib, Seaborn)
- ❌ Dataset visualization and statistics
- ❌ Kaggle dataset download
- ❌ Batch evaluation loops
- ❌ Progress bars (tqdm)
- ❌ Jupyter-specific code
- ❌ Full transformers model (Qwen/Qwen2.5-0.5B-Instruct)
  - The notebook uses a 500MB+ local model
  - The API uses lightweight rule-based fallback instead
  - To enable full transformers fallback, uncomment dependencies in requirements.txt

## Troubleshooting

### "Groq API key not configured"
- Add your Groq API key to the `.env` file
- Get a free key at https://console.groq.com

### "Uvicorn not found"
- Install dependencies: `pip install -r requirements.txt`
- Or run with: `python -m uvicorn app.main:app --reload`

### Low confidence scores
- Without Groq API key, fallback service returns confidence=0.3
- Configure Groq API key for higher accuracy (typically 0.7-0.95)

### CORS errors from frontend
- Add your frontend URL to `CORS_ORIGINS` in `.env`
- Example: `CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://your-app.com`

## Performance

- **With Groq API**: ~2-5 seconds per article (including retries if needed)
- **Fallback mode**: ~50-100ms per article
- **Concurrent requests**: Supports multiple simultaneous analyses

## Security

- API keys stored in environment variables (never in code)
- `.env` excluded from git via `.gitignore`
- Input validation via Pydantic
- Prompt injection protection in system prompts
- CORS configured for specific origins

## Related Files

- **Original notebook**: `../News_Intelligence.ipynb` (DO NOT MODIFY)
- **Dataset requirements**: `../requirements.txt` (notebook dependencies)

## Support

For issues or questions about the API implementation, check:
1. Server logs for error details
2. Swagger UI at `/docs` for endpoint testing
3. `.env` configuration

## License

Based on the News Intelligence Pipeline notebook implementation.
