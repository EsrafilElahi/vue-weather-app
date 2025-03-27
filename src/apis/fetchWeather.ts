import type { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { useToast } from 'vue-toast-notification';


const fetchWeatherCityBaseUrl = import.meta.env.VITE_FETCH_WEATHER_CITY_BASE_URL

export const fetchWeatherCity = async (query: string, config?: AxiosRequestConfig) => {
  const toast = useToast();

  try {
    const res = await axiosInstance.get(`/weather`, {
      baseURL: fetchWeatherCityBaseUrl,
      params: {
        q: query,
        units: 'metric',
        APPID: import.meta.env.VITE_WEATHER_APPID,
      },
      ...config,
    });

    return res.data
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log({ axiosError })
    if (axiosError.message === 'canceled') {
      toast.open({
        type: 'info',
        message: "api call canceled",
        duration: 1000,
        position: 'top'
      });
    } else {
      toast.open({
        type: 'error',
        message: axiosError?.response?.statusText || 'Something went wrong!',
        duration: 1000,
        position: 'top'
      });
    }
    return Promise.reject(axiosError);
  }
};