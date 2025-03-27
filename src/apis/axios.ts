import axios, { type AxiosInstance } from 'axios';

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendBaseUrl,
  params: {
    access_token: import.meta.env.VITE_WEATHER_ACCESS_TOKEN,
    types: 'place',
  },
  headers: { 'Content-Type': 'application/json' },
});