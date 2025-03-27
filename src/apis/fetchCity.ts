import { axiosInstance } from "./axios";

export const fetchCity = async (query: string) => {
  try {
    const res = await axiosInstance.get(`/${encodeURIComponent(query)}.json`, {
      params: {
        access_token: import.meta.env.VITE_WEATHER_ACCESS_TOKEN,
        types: 'place',
      },
    });
    return res.data.features
  } catch (error) {
    console.log("err :", error);
  }
};