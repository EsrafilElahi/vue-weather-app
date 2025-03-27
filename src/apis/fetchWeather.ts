import type { AxiosError } from "axios";
import { axiosInstance } from "./axios";
import { useToast } from 'vue-toast-notification';


const fetchWeatherCityBaseUrl = import.meta.env.VITE_FETCH_WEATHER_CITY_BASE_URL

export const fetchWeatherCity = async (query: string) => {
  const toast = useToast();


  try {
    const res = await axiosInstance.get(`/weather`, {
      baseURL: fetchWeatherCityBaseUrl,
      params: {
        q: query,
        units: 'metric',
        APPID: import.meta.env.VITE_WEATHER_APPID,
      },
    });

    return res.data
  } catch (error) {
    const axiosError = error as AxiosError;
    toast.open({
      type: 'error',
      message: axiosError?.response?.statusText || 'Something went wrong!',
      duration: 1000,
      position: 'top'
    });
    return Promise.reject(axiosError);
  }
};