// src/utils/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8090/smartskills/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Important for CSRF token handling
});

// Add CSRF token interceptor
api.interceptors.request.use(async (config) => {
  // You may need to first fetch the CSRF token if not already available
  // This depends on your Django backend setup
  const csrfToken = await getCSRFToken(); // Implement this function if needed
  if (csrfToken) {
    config.headers['X-CSRFTOKEN'] = csrfToken;
  }
  return config;
});