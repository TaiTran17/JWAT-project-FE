import { create } from "zustand";
import Cookie from "js-cookie";

interface User {
  id: string;
  username: string;
  role: string;
  avatar: string;
}

interface UserStore {
  user: User | null;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const response = await fetch("http://localhost:3000/user/get-user-jwt", {
        headers: {
          Authorization: "Bearer " + Cookie.get("Authorization"),
        },
      });
      const userData = await response.json();
      set({ user: userData });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ user: null }); // Optionally handle error state
    }
  },
}));
