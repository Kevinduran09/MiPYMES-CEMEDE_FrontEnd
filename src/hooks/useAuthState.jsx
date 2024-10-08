import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      currentUser: "",
      isAuth: false,
      setAuth: (newAuth) => set({ isAuth: newAuth }),
      setToken: (token) => set({ token: token, isAuth: true }),
      setCurrentUser: (user, auth) => set({ currentUser: user, isAuth: auth }),
      clearAuth: () => set({ token: "", currentUser: "", isAuth: false }),
    }),
    {
      name: "authState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
