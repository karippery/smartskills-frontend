// src/utils/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8090/smartskills/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

});

