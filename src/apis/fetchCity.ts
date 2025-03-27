import { axiosInstance } from "./axios";

export const fetchCity = async (query: string) => {
  try {
    const res = await axiosInstance.get(`/${encodeURIComponent(query)}.json`);
    return res.data.features
  } catch (error) {
    console.log("err :", error);
  }
};