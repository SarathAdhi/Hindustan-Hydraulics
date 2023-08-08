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
	_permissions: [],
	permissions: [],
	getProfile: async () => {
		try {
			const res = await axios.post("/auth/verify");
			console.log(res.authData);

			let permissions = [
				...res.authData.roles,
				...res.authData.permissions,
			];
			permissions = new Set(permissions);
			permissions = permissions ? [...permissions] : [];

			console.log({ permissions });

			set({
				isAuth: true,
				isAdmin: res.authData.roles?.includes("admin"),
				roles: res.authData.roles,
				_permissions: res.authData.permissions,
				permissions,
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
