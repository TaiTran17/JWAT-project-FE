import { create } from "zustand";
import Cookie from "js-cookie";
import api from "../lib/axiosClient";

interface User {
  id: string;
  username: string;
  role: string;
  avatar: string;
}

interface UserStore {
  user: User | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const response = await api.get("/user/get-user-jwt");

      const userData = response.data.metadata;
      set({ user: userData });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ user: null }); // Optionally handle error state
    }
  },
  clearUser: () => set({ user: null }), // Method to clear user state
}));
