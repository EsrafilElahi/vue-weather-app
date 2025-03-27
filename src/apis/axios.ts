import axios, { type AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
});