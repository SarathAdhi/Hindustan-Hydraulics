import { create } from "zustand";
import { deleteCookie } from "cookies-next";
import axios from "../lib/axios";

export const useStore = create((set) => ({
	isSidebarOpen: true,
	toggleSidebar: () =>
		set((state) => ({
			isSidebarOpen: !state.isSidebarOpen,
		})),
	user: null,
	isAuth: false,
	isAdmin: false,
	isIpWhiteListed: false,
	roles: [],
	_permissions: [],
	permissions: [],
	getProfile: async () => {
		try {
			const res = await axios.post("/auth/verify");

			try {
				const isIpWhiteListed = await axios.get(
					"/whitelist/iswhitelisted"
				);

				set({ isIpWhiteListed: !isIpWhiteListed });
			} catch (error) {
				set({ isIpWhiteListed: true });
			}

			let permissions = [
				...res.authData.roles,
				...res.authData.permissions,
			];
			permissions = new Set(permissions);
			permissions = permissions ? [...permissions] : [];

			set({
				user: {
					name: res.authData?.user_name,
					email: res.authData?.email,
				},
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
