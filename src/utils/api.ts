
import axios from 'axios';

/**
 * Axios API instance pre-configured for SmartSkills backend
 * - Base URL: http://localhost:8090/smartskills/v1
 * - Default headers for JSON requests/responses
 * - Single instance to be imported across the app
 */

export const api = axios.create({
  baseURL: 'http://localhost:8090/smartskills/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

});

