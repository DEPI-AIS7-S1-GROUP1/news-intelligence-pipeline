# News Intelligence Pipeline

An AI-powered news article intelligence and analysis platform that automatically categorizes news articles, extracts named entities, generates concise summaries, and resolves original publication links using Groq LLM inference and a fast dataset archive lookup.

---

## Overview

The **News Intelligence Pipeline** is a full-stack, containerized application comprising a high-performance **FastAPI** backend and a responsive **React 19** frontend.

It processes raw news article headlines and descriptions, classifies them into **9 consolidated master categories** with ~85% accuracy, extracts entities (people, organizations, locations) and dates, generates single-sentence summaries, and retrieves the original article URL if available.

---

## Key Features

- **Smart Category Classification** – Classifies articles into 9 consolidated master topics with high confidence scoring (~85% accuracy).
- **Article Link Retrieval & Resolution** – Automatically retrieves the original article link if matched in the 209k HuffPost dataset archive, extracts URLs embedded in the text, or accepts user-provided links. Returns `"could not find it"` if no link is found.
- **Named Entity Recognition (NER)** – Accurately extracts individuals, organizations, and geographic locations mentioned in the article.
- **AI Summarization** – Produces concise, neutral one-sentence summaries of the core story.
- **High Availability & Fault Tolerance** – Implements exponential backoff retries (via Tenacity) and falls back to a rule-based engine if the LLM provider is temporarily unreachable.
- **Dockerized Architecture** – Fully containerized with Docker and Docker Compose (FastAPI + Nginx reverse proxy + Vite React).
- **Interactive Web Interface** – Clean, modern UI with real-time analysis, animations, and clickable source links.
- **RESTful API & OpenAPI Docs** – Self-documenting API with interactive Swagger UI and ReDoc.

---

## The Dataset & Category Consolidation

### Dataset Details
* **Source:** [Kaggle News Category Dataset v3](https://www.kaggle.com/datasets/rmisra/news-category-dataset) by Rishabh Misra.
* **Volume:** **209,527 news articles** published on HuffPost between 2012 and 2022.
* **Original Attributes:**
  * `link` – Original URL to the news article on HuffPost.
  * `headline` – Headline of the news article.
  * `category` – Topic category of the article.
  * `short_description` – Brief summary or teaser of the article.
  * `authors` – Author(s) of the article.
  * `date` – Publication date (YYYY-MM-DD).

### The "Ultra-Merge" (42 Categories → 9 Master Categories)
The original dataset contained 42 fine-grained, highly overlapping categories (e.g., separating *POLITICS*, *WORLD NEWS*, *THE WORLDPOST*, and *U.S. NEWS*), which caused model confusion and lower accuracy. 

Through exploratory data analysis in the project notebook (`News_Intelligence.ipynb`), categories were consolidated into **9 distinct master categories**, boosting model classification accuracy to **~85%**:

| # | Master Category | Examples of Merged Topics |
|---|---|---|
| 1 | **BUSINESS & FINANCE** | Business, Money, Finance |
| 2 | **CRIME** | Crime, Justice |
| 3 | **EDUCATION** | Education, College, School |
| 4 | **HEALTH & WELLNESS** | Healthy Living, Wellness, Medical |
| 5 | **POLITICS & NEWS** | Politics, World News, U.S. News, WorldPost |
| 6 | **SCIENCE & ENVIRONMENT** | Science, Environment, Green |
| 7 | **SOCIETY & LIFESTYLE** | Lifestyle, Culture, Arts, Travel, Food, Style |
| 8 | **SPORTS** | Sports |
| 9 | **TECH** | Tech, Artificial Intelligence, Software |

### Link Indexing (`news_links.db`)
To enable instantaneous lookup of original article links without burdening the LLM or slowing down response times, the 209k article dataset links are indexed into a local SQLite database (`Backend/news_links.db`). This allows sub-millisecond URL lookups by headline while preserving 100% of LLM classification accuracy.

---

## API Keys & Requirements

### Required API Key: Groq
The primary LLM inference engine runs on **Groq Cloud** for high-speed inference.

1. Create a free account at [console.groq.com](https://console.groq.com).
2. Generate an API key under **API Keys** ([console.groq.com/keys](https://console.groq.com/keys)).
3. Add the key to `Backend/.env`:
   ```env
   GROQ_API_KEY=gsk_your_actual_groq_api_key_here
   ```

> **Note:** If no Groq API key is configured or if the API is unreachable, the system automatically engages the **rule-based fallback service** so the application remains functional.

---

## Quick Start with Docker (Recommended)

The easiest way to run the entire pipeline is using **Docker Compose**:

### 1. Configure Your API Key
Ensure your `Backend/.env` file exists and contains your Groq API key:
```bash
# If .env does not exist, copy from .env.example
cp Backend/.env.example Backend/.env
```
Open `Backend/.env` and paste your key:
```env
GROQ_API_KEY=gsk_your_key_here
```

### 2. Start Containers
Run from the root directory:
```bash
docker compose up -d
```

### 3. Open in Browser
* **Frontend Web App:** [http://localhost:5173](http://localhost:5173) (or [http://localhost:3000](http://localhost:3000))
* **Backend API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)
* **Backend Health Check:** [http://localhost:8000/api/health](http://localhost:8000/api/health)

### 4. Useful Docker Commands
```bash
# View live container logs
docker compose logs -f

# Check container status and health
docker compose ps

# Rebuild containers after modifying code
docker compose up -d --build

# Stop all containers
docker compose down
```

---

## Local Development (Without Docker)

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** and npm
- **Groq API Key**

### 1. Backend Setup

```bash
cd Backend

# Create and activate virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and set GROQ_API_KEY=gsk_...

# Start FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```
Backend will be available at [http://localhost:8000](http://localhost:8000) (Docs: [http://localhost:8000/docs](http://localhost:8000/docs)).

### 2. Frontend Setup

```bash
cd Frontend/news-intelligence-frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
news-intelligence-pipeline/
├── docker-compose.yml                  # Multi-container Docker Compose configuration
├── .dockerignore                       # Root Docker ignore file
├── News_Intelligence.ipynb             # Research, EDA, prompt engineering, and evaluation
├── README.md                           # Master project documentation
│
├── Backend/
│   ├── Dockerfile                      # Backend container definition
│   ├── .dockerignore                   # Backend Docker ignore rules
│   ├── .env                            # Backend environment configuration (git-ignored)
│   ├── .env.example                    # Backend environment template
│   ├── requirements.txt                # Python runtime dependencies
│   ├── news_links.db                   # Fast SQLite index for dataset links
│   └── app/
│       ├── main.py                     # FastAPI application entrypoint & CORS
│       ├── api/
│       │   ├── news.py                 # REST endpoints (/analyze, /categories, /health)
│       │   └── __init__.py
│       ├── core/
│       │   ├── config.py               # Pydantic Settings & environment variables
│       │   ├── logging_config.py       # Application logging
│       │   └── __init__.py
│       ├── prompts/
│       │   ├── news_prompt.py          # Few-shot examples & LLM system prompt
│       │   └── __init__.py
│       ├── schemas/
│       │   ├── news.py                 # Pydantic models (NewsAnalysis, Request, Response)
│       │   └── __init__.py
│       └── services/
│           ├── news_service.py         # Main orchestrator (Groq -> Fallback)
│           ├── groq_service.py         # Groq API client with Tenacity retry logic
│           ├── fallback_service.py     # Rule-based backup classification & extraction
│           ├── link_resolver.py        # Safe article link discovery & resolution
│           └── __init__.py
│
└── Frontend/
    └── news-intelligence-frontend/
        ├── Dockerfile                  # Multi-stage Dockerfile (Node build + Nginx Alpine)
        ├── nginx.conf                  # Nginx SPA routing and /api/ reverse proxy
        ├── .dockerignore               # Frontend Docker ignore rules
        ├── package.json                # React dependencies and scripts
        ├── vite.config.js              # Vite configuration
        └── src/
            ├── App.jsx                 # Router & application shell
            ├── config/
            │   └── api.js              # Centralized API endpoints
            ├── pages/
            │   ├── Home.jsx            # Landing page
            │   ├── Analyze.jsx         # Interactive article analysis interface
            │   └── Analyze.css         # Styling for analysis cards and links
            └── components/             # Reusable visual components
```

---

## API Reference

### `POST /api/news/analyze`
Analyzes a news article to classify its category, extract entities, produce a summary, and resolve the article link.

#### Request Body
```json
{
  "headline": "Under Pressure, Apple Will Allow Self-Repairs To iPhones, Macs",
  "short_description": "The company has long prohibited users to repair their own devices. The shift reflects a strengthening right to repair movement.",
  "authors": "Matt O'Brien, AP",
  "date": "2021-11-18",
  "link": ""
}
```

#### Successful Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "category": "TECH",
    "confidence": 0.95,
    "entities": {
      "people": ["Matt O'Brien"],
      "organizations": ["Apple"],
      "locations": []
    },
    "key_dates": ["2021-11-18"],
    "summary": "Apple announces it will allow users to self-repair iPhones and Macs in response to the growing right to repair movement.",
    "article_link": "https://www.huffpost.com/entry/apple-self-repair-iphone-mac_n_61959749e4b044a1cc01e614"
  },
  "error": null,
  "provider": "groq"
}
```

*Note:* If the article link is not found anywhere in the dataset archive, text, or request, `article_link` returns `"could not find it"`.

---

### `GET /api/news/categories`
Returns the 9 consolidated master categories used by the system.

#### Response (`200 OK`)
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

---

### `GET /api/health`
Checks API health status and whether Groq is configured.

#### Response (`200 OK`)
```json
{
  "status": "healthy",
  "groq_configured": true
}
```

---

## Configuration Reference

### Backend Settings (`Backend/.env`)

| Variable | Required | Default | Description |
|:---|:---:|:---|:---|
| `GROQ_API_KEY` | **Yes** | `""` | Groq API key from [console.groq.com](https://console.groq.com) |
| `GROQ_MODEL` | No | `openai/gpt-oss-120b` | Groq LLM model name |
| `GROQ_TIMEOUT` | No | `30` | Request timeout in seconds |
| `MAX_RETRY_ATTEMPTS`| No | `3` | Maximum retry attempts for transient API errors |
| `RETRY_MIN_WAIT` | No | `2` | Minimum backoff wait (seconds) |
| `RETRY_MAX_WAIT` | No | `10` | Maximum backoff wait (seconds) |
| `CORS_ORIGINS` | No | `["http://localhost:3000","http://localhost:5173"]` | Allowed frontend origins (JSON array) |
| `LOG_LEVEL` | No | `INFO` | Logging level (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |

### Frontend Settings (`Frontend/news-intelligence-frontend/.env`)

| Variable | Required | Default | Description |
|:---|:---:|:---|:---|
| `VITE_API_BASE_URL` | No | `http://localhost:8000` | Backend API base URL |

---

## Cloudflare Tunnel Setup (Optional Remote Access)

To expose your application to the internet securely without port forwarding:

1. **Install Cloudflare Tunnel:**
   * Windows: `winget install Cloudflare.cloudflared`
   * macOS: `brew install cloudflared`
2. **Expose Backend:**
   ```bash
   cloudflared tunnel --url http://localhost:8000
   ```
   *(Copy the generated `https://<backend-id>.trycloudflare.com` URL)*
3. **Expose Frontend:**
   ```bash
   cloudflared tunnel --url http://localhost:5173
   ```
4. **Update Configuration:**
   * In `Backend/.env`: Add the frontend tunnel URL to `CORS_ORIGINS`.
   * In `Frontend/news-intelligence-frontend/.env`: Set `VITE_API_BASE_URL=https://<backend-id>.trycloudflare.com`.

---

## License

This project is developed as part of the Digital Egypt Pioneers Initiative (DEPI) AI & Data Science program.
