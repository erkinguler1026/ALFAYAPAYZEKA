/**
 * frontend/src/utils/api.js
 * Centralized API configuration for Alfa Yapay Zeka.
 * Handles automatic base URL detection for Local vs Production.
 */

const getBaseUrl = () => {
  // 1. Check if an environment variable is explicitly set (prioritized)
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  // 2. Production fallback: If running on a domain that isn't localhost,
  // assume the API is served from the same origin under /api or directly.
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Return relative path or the current origin
    return window.location.origin;
  }

  // 3. Local Development fallback
  return 'http://localhost:5000';
};

export const API_BASE_URL = getBaseUrl();
export const API_ENDPOINTS = {
  REPORT: (token) => `${API_BASE_URL}/api/report/${token}`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
};
