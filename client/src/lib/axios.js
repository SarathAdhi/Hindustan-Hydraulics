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
	(response) => {
		if (response.data.message) {
			toast.success(response.data.message);
		}

		return response.data.data;
	},
	(error) => {
		if (
			error.response?.data?.data &&
			typeof error.response?.data?.data === "string"
		) {
			toast.error(error.response.data.data);
		} else if (
			error.response?.data?.message &&
			typeof error.response?.data?.message === "string"
		) {
			toast.error(error.response.data.message);
		} else if (
			error.response?.data?.error &&
			typeof error.response?.data?.error === "string"
		) {
			toast.error(error.response.data.error);
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
