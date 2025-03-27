import { axiosInstance } from "./axios";

const fetchWeatherCityBaseUrl = import.meta.env.VITE_FETCH_WEATHER_CITY_BASE_URL

// https://api.openweathermap.org/data/2.5/weather?q=tehran&units=metric&APPID=2af0224f3425ab835e0d63cf9afdccc2

export const fetchCity = async (query: string) => {
  try {
    const res = await axiosInstance.get(`/weather`, {
      baseURL: fetchWeatherCityBaseUrl,
      params: {
        q: query,
        units: 'metric',
        APPID: import.meta.env.VITE_WEATHER_APPID,
      },
    });
    console.log('res weather :', res)
    return res.data
  } catch (error) {
    console.log("err :", error);
  }
};