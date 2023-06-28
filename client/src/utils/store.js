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
  getProfile: async () => {
    try {
      const res = await axios.post("/auth/verify");
      console.log({ res });

      set({ isAuth: true, isAdmin: res.authData.role === "admin" });
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
