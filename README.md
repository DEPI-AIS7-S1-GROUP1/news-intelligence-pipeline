# News Intelligence Pipeline

An AI-powered news article classification and analysis system that automatically categorizes news articles, extracts named entities, and generates intelligent summaries using advanced language models.

## Overview

The News Intelligence Pipeline is a full-stack application consisting of a FastAPI backend and a React frontend. It leverages the Groq API for high-speed LLM inference to analyze news articles and extract structured information including category classification, entity recognition, and automated summarization.

The system consolidates 42 original HuffPost dataset categories into 9 master categories for improved classification accuracy and practical usability.

## Features

- **Smart Category Classification** - Automatically categorizes news into 9 major categories with confidence scoring
- **Entity Extraction** - Identifies people, organizations, and locations mentioned in articles
- **AI Summarization** - Generates concise one-sentence summaries of article content
- **High Availability** - Automatic retry logic with exponential backoff and rule-based fallback
- **Interactive UI** - Modern React interface with smooth animations and real-time analysis
- **RESTful API** - Well-documented FastAPI backend with Swagger/ReDoc documentation
- **Production Ready** - Comprehensive logging, CORS support, and environment-based configuration

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework for building APIs
- **Groq API** - High-performance LLM inference for article analysis
- **Pydantic** - Data validation and settings management
- **Tenacity** - Retry logic with exponential backoff
- **Uvicorn** - ASGI web server
- **Python 3.8+**

### Frontend
- **React 19** - UI library for building interactive interfaces
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **GSAP** - Professional animations library
- **Lucide React** - Modern icon library

## Project Structure

```
news-intelligence-pipeline/
├── Backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── news.py              # API endpoints
│   │   │   └── __init__.py
│   │   ├── core/
│   │   │   ├── config.py            # Settings & configuration
│   │   │   ├── logging_config.py    # Logging setup
│   │   │   └── __init__.py
│   │   ├── prompts/
│   │   │   ├── news_prompt.py       # LLM system & user prompts
│   │   │   └── __init__.py
│   │   ├── schemas/
│   │   │   ├── news.py              # Pydantic models
│   │   │   └── __init__.py
│   │   ├── services/
│   │   │   ├── groq_service.py      # Groq API client with retry
│   │   │   ├── fallback_service.py  # Rule-based fallback
│   │   │   ├── news_service.py      # Main orchestration
│   │   │   └── __init__.py
│   │   ├── main.py                  # FastAPI application
│   │   └── __init__.py
│   ├── .env                         # Environment configuration
│   ├── .env.example                 # Environment template
│   ├── requirements.txt             # Python dependencies
│   └── README.md                    # Backend documentation
│
├── Frontend/
│   └── news-intelligence-frontend/
│       ├── src/
│       │   ├── components/          # Reusable UI components
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── Hero.jsx
│       │   │   ├── CoreCapabilities.jsx
│       │   │   ├── HowItWorks.jsx
│       │   │   └── ...
│       │   ├── pages/
│       │   │   ├── Home.jsx         # Landing page
│       │   │   └── Analyze.jsx      # Analysis interface
│       │   ├── config/
│       │   │   └── api.js           # API configuration
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       ├── .env                     # Frontend configuration
│       ├── .env.example             # Frontend template
│       ├── package.json
│       └── README.md                # Frontend documentation
│
└── README.md                        # This file
```

## News Categories

The system classifies articles into 9 master categories (consolidated from 42 original HuffPost categories):

1. **BUSINESS & FINANCE** - Economics, markets, corporate news
2. **CRIME** - Criminal activities, law enforcement
3. **EDUCATION** - Schools, universities, learning
4. **HEALTH & WELLNESS** - Medicine, fitness, mental health
5. **POLITICS & NEWS** - Government, elections, policy
6. **SCIENCE & ENVIRONMENT** - Research, climate, nature
7. **SOCIETY & LIFESTYLE** - Culture, relationships, entertainment
8. **SPORTS** - Athletics, competitions, teams
9. **TECH** - Technology, gadgets, software, AI

## Getting Started

### Prerequisites

- **Python 3.8+** and pip
- **Node.js 16+** and npm
- **Groq API Key** (free at [console.groq.com](https://console.groq.com))

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env and add your Groq API key
   # GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the server:**
   ```bash
   python -m uvicorn app.main:app --reload --port 8000
   ```

The API will be available at:
- **Base URL:** http://localhost:8000
- **Interactive Docs (Swagger):** http://localhost:8000/docs
- **Alternative Docs (ReDoc):** http://localhost:8000/redoc

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd Frontend/news-intelligence-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Default uses http://localhost:8000
   # Edit .env to change API URL if needed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at: http://localhost:5173

## Configuration

### Backend Environment Variables

Configure in `Backend/.env`:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | Yes | - | Your Groq API key from console.groq.com |
| `GROQ_MODEL` | No | `openai/gpt-oss-120b` | Groq model to use |
| `GROQ_TIMEOUT` | No | `30` | API timeout in seconds |
| `MAX_RETRY_ATTEMPTS` | No | `3` | Maximum retry attempts on failure |
| `RETRY_MIN_WAIT` | No | `2` | Minimum wait between retries (seconds) |
| `RETRY_MAX_WAIT` | No | `10` | Maximum wait between retries (seconds) |
| `DEBUG` | No | `false` | Enable debug mode |
| `LOG_LEVEL` | No | `INFO` | Logging level (DEBUG, INFO, WARNING, ERROR) |
| `CORS_ORIGINS` | No | `["http://localhost:3000","http://localhost:5173"]` | Allowed CORS origins (JSON array format) |

**Example `Backend/.env`:**
```env
GROQ_API_KEY=gsk_your_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
DEBUG=false
LOG_LEVEL=INFO
CORS_ORIGINS=["http://localhost:5173"]
```

### Frontend Environment Variables

Configure in `Frontend/news-intelligence-frontend/.env`:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | No | `http://localhost:8000` | Backend API base URL |

**Example `Frontend/news-intelligence-frontend/.env`:**
```env
VITE_API_BASE_URL=http://localhost:8000
```

## API Documentation

### Endpoints

#### Health Check
```http
GET /api/health
```

Check API health and configuration status.

**Response:**
```json
{
  "status": "healthy",
  "groq_configured": true
}
```

#### Get Categories
```http
GET /api/news/categories
```

Retrieve the list of valid news categories.

**Response:**
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

#### Analyze News Article
```http
POST /api/news/analyze
```

Analyze a news article and extract structured information.

**Request Body:**
```json
{
  "headline": "Apple Unveils New iPhone With AI Features",
  "short_description": "Apple CEO Tim Cook announced the device at company headquarters.",
  "authors": "Jane Doe",
  "date": "2024-01-15"
}
```

**Response:**
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

### Interactive API Documentation

Once the backend is running, visit:
- **Swagger UI:** http://localhost:8000/docs - Interactive API testing
- **ReDoc:** http://localhost:8000/redoc - Clean API reference

## Using the Application

1. **Start both backend and frontend** following the setup instructions above
2. **Open your browser** and navigate to http://localhost:5173
3. **Navigate to the Analyze page** using the navigation menu
4. **Enter article details:**
   - Headline (required)
   - Description (required)
   - Author (optional)
   - Date (optional)
5. **Click "Analyze Article"** to process
6. **View results** including category, confidence, entities, and summary

## Cloudflare Tunnel Setup

Cloudflare Tunnel allows you to expose both your backend and frontend to the internet without port forwarding or firewall configuration, providing HTTPS access for testing and demos.

### Prerequisites

Install Cloudflare Tunnel (cloudflared):
- **Windows:** `winget install Cloudflare.cloudflared`
- **macOS:** `brew install cloudflared`
- **Linux:** Download from [Cloudflare Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation)

### Setup Steps

#### 1. Expose Backend (Terminal 1)

Start your backend normally:
```bash
cd Backend
python -m uvicorn app.main:app --reload --port 8000
```

#### 2. Create Backend Tunnel (Terminal 2)

```bash
cloudflared tunnel --url http://localhost:8000
```

This will output a URL like:
```
https://xyz-abc-123.trycloudflare.com
```

**Copy this backend tunnel URL** - you'll need it for configuration.

#### 3. Expose Frontend (Terminal 3)

First, start your frontend dev server:
```bash
cd Frontend/news-intelligence-frontend
npm run dev
```

#### 4. Create Frontend Tunnel (Terminal 4)

```bash
cloudflared tunnel --url http://localhost:5173
```

This will output a URL like:
```
https://def-ghi-456.trycloudflare.com
```

**Copy this frontend tunnel URL** - this is what you share with others.

#### 5. Update Backend CORS

Add the frontend tunnel URL to your backend CORS configuration.

Edit `Backend/.env`:
```env
CORS_ORIGINS=["http://localhost:5173","https://def-ghi-456.trycloudflare.com"]
```

**Restart the backend server** (Terminal 1: Ctrl+C, then restart).

#### 6. Update Frontend API URL

Update the frontend to use the backend tunnel URL.

Edit `Frontend/news-intelligence-frontend/.env`:
```env
VITE_API_BASE_URL=https://xyz-abc-123.trycloudflare.com
```

Or use the helper script:
```bash
cd Frontend/news-intelligence-frontend
npm run update-api https://xyz-abc-123.trycloudflare.com
```

**Restart the frontend server** (Terminal 3: Ctrl+C, then `npm run dev`).

### Access Your Application

- **Public Frontend URL:** `https://def-ghi-456.trycloudflare.com`
- **Public Backend API:** `https://xyz-abc-123.trycloudflare.com/docs`

Share the frontend URL with anyone to demo your application!

### Important Notes

⚠️ **Tunnel URLs Change** - Free Cloudflare Tunnel URLs are temporary and change each time you restart `cloudflared`. You'll need to update both `.env` files and restart servers when this happens.

⚠️ **Public Access** - Tunnel URLs are publicly accessible. Anyone with the URL can access your application.

⚠️ **Rate Limits** - Free tunnels may have rate limits. For permanent deployment, consider using named tunnels or production hosting.

### Tunnel Command Summary

```bash
# Terminal 1: Backend
cd Backend
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2: Backend Tunnel
cloudflared tunnel --url http://localhost:8000

# Terminal 3: Frontend
cd Frontend/news-intelligence-frontend
npm run dev

# Terminal 4: Frontend Tunnel
cloudflared tunnel --url http://localhost:5173
```

## Architecture

### System Flow

```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │
       │ HTTP POST /api/news/analyze
       ▼
┌─────────────────┐
│   FastAPI       │
│   Backend       │
└──────┬──────────┘
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
┌─────────────────┐  ┌────────────────┐
│  Groq Service   │  │   Fallback     │
│  (Primary LLM)  │  │   Service      │
│  + Retry Logic  │  │  (Rule-based)  │
└─────────────────┘  └────────────────┘
```

### Backend Architecture

1. **FastAPI Application** (`app/main.py`) - Entry point with CORS and lifecycle management
2. **API Routes** (`app/api/news.py`) - RESTful endpoints for news analysis
3. **Services Layer**:
   - `news_service.py` - Orchestrates analysis flow
   - `groq_service.py` - Groq API client with retry logic
   - `fallback_service.py` - Rule-based backup when Groq unavailable
4. **Schemas** (`app/schemas/news.py`) - Pydantic models for validation
5. **Configuration** (`app/core/config.py`) - Settings from environment variables
6. **Prompts** (`app/prompts/news_prompt.py`) - LLM system and user prompts

### Frontend Architecture

1. **App Component** (`App.jsx`) - Main application with routing
2. **Pages**:
   - `Home.jsx` - Landing page with feature showcase
   - `Analyze.jsx` - Article analysis interface
3. **Components** - Reusable UI components (Navbar, Footer, Hero, etc.)
4. **API Configuration** (`config/api.js`) - Centralized API endpoint management

## Error Handling & Reliability

### Automatic Retry

The backend implements exponential backoff retry for Groq API failures:
- **3 retry attempts** by default
- **2-10 second** wait between retries
- **Exponential backoff** to prevent API overload

### Fallback Service

When Groq API is unavailable or exhausted retries:
- **Rule-based classification** using keyword matching
- **Regex entity extraction** for basic entity recognition
- **Lower confidence score** (0.3) to indicate reduced accuracy
- **Default category** (POLITICS & NEWS) when no match found

### Logging

Comprehensive logging at all levels:
- Request tracking
- Provider usage (Groq vs. Fallback)
- Retry attempts
- Errors and exceptions

## Development

### Backend Development

```bash
cd Backend

# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
python -m uvicorn app.main:app --reload --port 8000

# View logs
# Logs are output to console with configurable LOG_LEVEL
```

### Frontend Development

```bash
cd Frontend/news-intelligence-frontend

# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Deployment

### Backend Deployment Options

- **Railway** - https://railway.app (recommended)
- **Render** - https://render.com
- **AWS Lambda** - Serverless with Mangum adapter
- **Google Cloud Run** - Container deployment
- **Heroku** - Platform as a Service

### Frontend Deployment Options

- **Vercel** - https://vercel.com (recommended for Vite)
  ```bash
  npm install -g vercel
  cd Frontend/news-intelligence-frontend
  vercel
  ```

- **Netlify** - https://netlify.com
  ```bash
  npm run build
  netlify deploy --prod --dir=dist
  ```

- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable static hosting

### Environment Variables for Production

**Backend:**
- Set all variables from `Backend/.env.example`
- Update `CORS_ORIGINS` to include production frontend URL
- Set `DEBUG=false` and `LOG_LEVEL=INFO`

**Frontend:**
- Set `VITE_API_BASE_URL` to production backend URL
- Rebuild after changing environment variables

## Troubleshooting

### Backend Issues

**"Groq API key not configured"**
- Add `GROQ_API_KEY` to `Backend/.env`
- Get free API key at https://console.groq.com

**"Port already in use"**
- Another process is using port 8000
- Stop the other process or use a different port: `--port 8001`

**CORS errors in browser**
- Add frontend URL to `CORS_ORIGINS` in `Backend/.env`
- Restart backend server
- Format: `CORS_ORIGINS=["http://localhost:5173"]` (JSON array)

### Frontend Issues

**"Failed to connect to API"**
- Verify backend is running: http://localhost:8000/docs
- Check `VITE_API_BASE_URL` in `Frontend/news-intelligence-frontend/.env`
- Restart frontend dev server after changing `.env`

**"Module not found" errors**
- Run `npm install` in frontend directory
- Delete `node_modules` and `package-lock.json`, then reinstall

**Styles not loading**
- Hard refresh browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache

### Tunnel Issues

**Tunnel URL not accessible**
- Wait 10-30 seconds for tunnel to initialize
- Verify backend/frontend is running before starting tunnel
- Test tunnel URL in browser directly

**CORS errors with tunnel**
- Add tunnel URL to `Backend/.env` CORS_ORIGINS
- Restart backend after updating CORS
- Format: `CORS_ORIGINS=["http://localhost:5173","https://your-tunnel.trycloudflare.com"]`

## Performance

- **Groq API Response Time:** 2-5 seconds per article (including retries if needed)
- **Fallback Service:** 50-100ms per article
- **Concurrent Requests:** Supports multiple simultaneous analyses
- **Confidence Scores:**
  - Groq analysis: 0.7-0.95 (typical)
  - Fallback analysis: 0.3 (fixed, indicating lower accuracy)

## Security

- API keys stored in environment variables (never in code)
- `.env` files excluded from version control
- Input validation via Pydantic
- CORS configured for specific origins
- Prompt injection protection in system prompts

## License

This project is part of the News Intelligence Pipeline implementation.

## Related Documentation

- **Backend Details:** [Backend/README.md](Backend/README.md)
- **Frontend Details:** [Frontend/news-intelligence-frontend/README.md](Frontend/news-intelligence-frontend/README.md)
- **Cloudflare Tunnel Quick Start:** [QUICK_START_CLOUDFLARE.md](QUICK_START_CLOUDFLARE.md)
- **Tunnel Setup Guide:** [CLOUDFLARE_TUNNEL_SETUP.md](CLOUDFLARE_TUNNEL_SETUP.md)
- **Configuration Reference:** [CONFIGURATION_SUMMARY.md](CONFIGURATION_SUMMARY.md)
- **Quick Reference:** [CHEATSHEET.md](CHEATSHEET.md)

## Support

For issues or questions:
1. Check the interactive API docs at http://localhost:8000/docs
2. Review browser console (F12) for frontend errors
3. Check backend logs for error details
4. Verify environment configuration in `.env` files
5. Consult troubleshooting section above

---

**Built with FastAPI, React, and Groq AI** 🚀
