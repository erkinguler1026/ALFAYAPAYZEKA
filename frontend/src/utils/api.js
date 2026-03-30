/**
 * frontend/src/utils/api.js
 * Centralized API configuration and client for Alfa Yapay Zeka.
 * 
 * Features:
 * - Environment detection (Local vs Prod)
 * - Automatic Fallback (Port 8080) if reverse proxy fails (returns HTML)
 * - Centralized endpoint definitions
 */

import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return window.location.origin;
  }

  return 'http://localhost:5000';
};

export const API_BASE_URL = getBaseUrl();

// Production Fallback: Direct Port 8080 (Cloudflare compat) if /api route is not proxied
export const getDirectApiUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:5000';
  const { protocol, hostname } = window.location;
  
  // If we are on localhost, backend is at 5000
  if (hostname === 'localhost') return 'http://localhost:5000';
  
  // If we are on live (Cloudflare), we must use the compatible port 8080
  return `${protocol}//${hostname}:8080`;
};

/**
 * Smart API Client
 * Automatically retries with direct port fallback if the main route returns HTML
 */
export const apiClient = {
  get: async (endpoint) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      let response = await axios.get(url);

      // Check if we hit a proxy that returned HTML (the homepage)
      if (typeof response.data === 'string' && response.data.includes('<!doctype html')) {
        console.warn(`API Redirect detected at ${endpoint}. Retrying with direct port fallback...`);
        const fallbackUrl = `${getDirectApiUrl()}${endpoint}`;
        response = await axios.get(fallbackUrl);
      }
      return response;
    } catch (error) {
      // If error, try fallback one last time
      try {
        console.warn(`API Error at ${endpoint}. Retrying with direct port fallback...`);
        const fallbackUrl = `${getDirectApiUrl()}${endpoint}`;
        return await axios.get(fallbackUrl);
      } catch {
        throw error; // Throw the original error if both fail
      }
    }
  },

  post: async (endpoint, data) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      let response = await axios.post(url, data);

      if (typeof response.data === 'string' && response.data.includes('<!doctype html')) {
        const fallbackUrl = `${getDirectApiUrl()}${endpoint}`;
        response = await axios.post(fallbackUrl, data);
      }
      return response;
    } catch (error) {
      try {
        const fallbackUrl = `${getDirectApiUrl()}${endpoint}`;
        return await axios.post(fallbackUrl, data);
      } catch {
        throw error;
      }
    }
  }
};

export const API_ENDPOINTS = {
  REPORT: (token) => `/api/report/${token}`,
  CONTACT: `/api/contact`,
  HEALTH: `/api/health`,
};
