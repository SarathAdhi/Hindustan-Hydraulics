import { create } from "zustand";
import { deleteCookie } from "cookies-next";
import axios from "../lib/axios";

export const useStore = create((set) => ({
	isSidebarOpen: true,
	toggleSidebar: () =>
		set((state) => ({
			isSidebarOpen: !state.isSidebarOpen,
		})),

	isAuth: false,
	isAdmin: false,
	roles: [],
	permissions: [],
	getProfile: async () => {
		try {
			const res = await axios.post("/auth/verify");
			console.log(res.authData);

			set({
				isAuth: true,
				isAdmin: res.authData.roles?.includes("admin"),
				roles: res.authData.roles,
				permissions: res.authData.permissions,
			});
		} catch (error) {
			deleteCookie("token");
			set({ isAuth: false, isAdmin: false });
		}
	},
	logout: () => {
		deleteCookie("token");
		set({ isAuth: false });
	},
}));
