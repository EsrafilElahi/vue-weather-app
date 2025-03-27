import { axiosInstance } from "./axios";

const fetchWeatherCityBaseUrl = import.meta.env.VITE_FETCH_WEATHER_CITY_BASE_URL

export const fetchWeatherCity = async (query: string) => {
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
    console.log("err :", error);
  }
};