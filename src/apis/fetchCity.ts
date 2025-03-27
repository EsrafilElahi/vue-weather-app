import { axiosInstance } from "./axios";

const fetchCityBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

export const fetchCity = async (query: string) => {
  try {
    const res = await axiosInstance.get(`/${encodeURIComponent(query)}.json`, {
      params: {
        access_token: import.meta.env.VITE_WEATHER_ACCESS_TOKEN,
        types: 'place',
      },
      baseURL: fetchCityBaseUrl,
    });
    return res.data.features
  } catch (error) {
    console.log("err :", error);
  }
};