/**
 * API Configuration
 * Manages the base URL for backend API requests
 */

// Get the API base URL from environment variables
// Falls back to localhost if not configured
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// API endpoints
export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  analyze: `${API_BASE_URL}/api/news/analyze`,
  categories: `${API_BASE_URL}/api/news/categories`,
};

// Helper function to check if API is configured with Cloudflare Tunnel
export const isUsingTunnel = () => {
  return API_BASE_URL.includes('trycloudflare.com') || 
         API_BASE_URL.includes('cloudflare.com');
};

// Log the current configuration (only in development)
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_BASE_URL,
    usingTunnel: isUsingTunnel(),
  });
}

export default { API_BASE_URL, API_ENDPOINTS, isUsingTunnel };
