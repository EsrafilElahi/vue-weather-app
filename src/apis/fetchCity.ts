import { axiosInstance } from "./axios";

const fetchCityBaseUrl = import.meta.env.VITE_FETCH_CITY_BASE_URL

export const fetchCity = async (query: string) => {
  try {
    const res = await axiosInstance.get(`/${encodeURIComponent(query)}.json`, {
      baseURL: fetchCityBaseUrl,
      params: {
        access_token: import.meta.env.VITE_CITY_ACCESS_TOKEN,
        types: 'place',
      },
    });
    return res.data.features
  } catch (error) {
    console.log("err :", error);
  }
};