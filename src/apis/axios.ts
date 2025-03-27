// axios.js
import axios from 'axios';

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

export const axiosInstance = axios.create({
  baseURL: backendBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});