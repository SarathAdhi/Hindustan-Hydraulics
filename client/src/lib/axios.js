import Axios from "axios";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";

const axios = Axios.create({
  baseURL: process.env.SERVER_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    if (error.response?.data?.data) {
      toast.error(error.response.data.data);
    }

    return Promise.reject(error.response?.data);
  }
);

axios.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export default axios;
