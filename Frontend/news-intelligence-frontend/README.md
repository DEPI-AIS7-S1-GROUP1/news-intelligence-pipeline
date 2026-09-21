# News Intelligence Frontend

A modern React frontend for the News Intelligence API - AI-powered news article analysis with category classification, entity extraction, and intelligent summarization.

## Features

- 🎯 **Interactive Analysis Form** - Submit news articles for AI analysis
- 📊 **Visual Results Display** - Beautiful cards showing category, confidence, entities, and summary
- ⚡ **Real-time Processing** - Instant feedback with loading states
- 🎨 **Modern UI/UX** - Clean design with smooth animations
- 🔧 **Configurable API** - Easy environment-based configuration

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **GSAP** - Professional animations

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running (see `Backend/README.md`)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   
   The `.env` file contains the backend API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

   For local development, keep this as `http://localhost:8000`.
   
   For Cloudflare Tunnel or deployed backend, update with your URL.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## Using with Cloudflare Tunnel

To expose your local backend and access it remotely:

### Quick Setup

1. **Start your backend:**
   ```bash
   cd ../Backend
   python -m uvicorn app.main:app --reload --port 8000
   ```

2. **Start Cloudflare Tunnel** (new terminal):
   ```bash
   cloudflared tunnel --url http://localhost:8000
   ```

3. **Copy the tunnel URL** from output (e.g., `https://abc-def-123.trycloudflare.com`)

4. **Update frontend configuration:**
   ```bash
   # Option 1: Using the helper script
   npm run update-api https://abc-def-123.trycloudflare.com
   
   # Option 2: Manually edit .env
   # Change VITE_API_BASE_URL to your tunnel URL
   ```

5. **Update backend CORS** (in `Backend/.env`):
   ```env
   CORS_ORIGINS=http://localhost:5173,https://abc-def-123.trycloudflare.com
   ```

6. **Restart both servers** and refresh browser

📖 **Full guide:** See `/CLOUDFLARE_TUNNEL_SETUP.md` for detailed instructions

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run update-api <url>` - Update API base URL

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── CoreCapabilities.jsx
│   ├── AIPipeline.jsx
│   ├── ExampleAnalysis.jsx
│   └── FinalCTA.jsx
├── pages/           # Page components
│   ├── Home.jsx     # Landing page
│   └── Analyze.jsx  # Analysis interface
├── config/          # Configuration
│   └── api.js       # API endpoint configuration
├── App.jsx          # Main app component
├── App.css          # Global styles
└── main.jsx         # Entry point
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8000

# For Cloudflare Tunnel:
# VITE_API_BASE_URL=https://your-tunnel-id.trycloudflare.com

# For deployed backend:
# VITE_API_BASE_URL=https://api.yourdomain.com
```

**Important:** Changes to `.env` require restarting the dev server.

### API Configuration

The API configuration is managed in `src/config/api.js`:

```javascript
import { API_ENDPOINTS } from '../config/api';

// Use in components
fetch(API_ENDPOINTS.analyze, { ... })
```

Available endpoints:
- `API_ENDPOINTS.health` - Health check
- `API_ENDPOINTS.analyze` - Article analysis
- `API_ENDPOINTS.categories` - Get categories

## Usage Example

### Analyzing an Article

1. Navigate to the **Analyze** page
2. Enter article details:
   - **Headline** (required)
   - **Description** (required)
   - Author (optional)
   - Date (optional)
3. Click **Analyze Article**
4. View results:
   - Category classification with confidence
   - Extracted entities (people, organizations, locations)
   - AI-generated summary
   - Key dates (if found)

### Example Input

```
Headline: Apple Unveils New iPhone With AI Features
Description: Apple CEO Tim Cook announced the device at company headquarters.
Author: Jane Doe
Date: 2024-01-15
```

### Example Output

```
Category: TECH (95% confidence)
Summary: Apple announced a new iPhone with AI features at its headquarters.
Entities:
  - People: Tim Cook
  - Organizations: Apple
  - Locations: headquarters
Provider: GROQ
```

## Troubleshooting

### API Connection Issues

**Error:** "Failed to connect to API"

**Solutions:**
1. Verify backend is running: http://localhost:8000/docs
2. Check `.env` has correct `VITE_API_BASE_URL`
3. Restart dev server after changing `.env`
4. Hard refresh browser (Ctrl+Shift+R)

### CORS Errors

**Error:** "CORS policy: No 'Access-Control-Allow-Origin'"

**Solutions:**
1. Check backend `CORS_ORIGINS` includes your frontend URL
2. Restart backend server after changing backend `.env`
3. Clear browser cache

### Tunnel URL Not Working

**Solutions:**
1. Verify tunnel is running: `cloudflared tunnel --url http://localhost:8000`
2. Wait 10-30 seconds for tunnel to initialize
3. Test tunnel URL directly in browser
4. Check backend CORS includes tunnel URL

## Building for Production

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Preview the build:**
   ```bash
   npm run preview
   ```

3. **Deploy:**
   - Upload `dist/` folder to hosting service
   - Recommended: Vercel, Netlify, GitHub Pages
   - Update `VITE_API_BASE_URL` to production backend URL

### Deployment Options

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
```bash
npm run build
# Push dist/ to gh-pages branch
```

## API Documentation

The backend provides interactive API documentation:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Tech Details

### Vite Configuration

This project uses Vite with:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) for React support
- Fast HMR (Hot Module Replacement)
- Optimized production builds

### React Compiler

The React Compiler is not enabled due to dev performance impact. To add it, see [React Compiler documentation](https://react.dev/learn/react-compiler/installation).

### ESLint Configuration

For production apps with TypeScript:
- Check the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- Integrate [`typescript-eslint`](https://typescript-eslint.io)

## Related Documentation

- **Backend API:** `../Backend/README.md`
- **Cloudflare Tunnel:** `/CLOUDFLARE_TUNNEL_SETUP.md`
- **Design Document:** `design.md`

## Support

For issues or questions:
1. Check browser console (F12) for error messages
2. Verify backend is running and accessible
3. Check `.env` configuration
4. Review CORS settings in backend

## License

Based on the News Intelligence Pipeline project.
