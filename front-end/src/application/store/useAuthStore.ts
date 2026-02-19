import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: (token: string) => {
        localStorage.setItem("@MDS:token", token);
        set({ token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem("@MDS:token");
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: "@MDS:auth",
    },
  ),
);
