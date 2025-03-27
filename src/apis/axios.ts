import axios, { type AxiosInstance } from 'axios';

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});