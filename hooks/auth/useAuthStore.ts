// useAuthStore.ts
import { create } from "zustand";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { User } from "@/types/user.types";

export type TAuthModal = {
  open: boolean;
  type: "LOGIN" | "SIGNUP" | "RESET";
};

interface State {
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  openAuthModal: boolean;
  authModalType: "LOGIN" | "SIGNUP" | "RESET";
}

interface AuthModalPayload {
  openAuthModal: boolean;
  authModalType: "LOGIN" | "SIGNUP" | "RESET";
}
interface LoggedInPayload {
  user: any;
  accessToken: string | null;
}

interface Actions {
  hydrate: () => void; // <-- NEW
  setAuthModal: (payload: AuthModalPayload) => void;
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  setUserLoggedIn: (payload: LoggedInPayload) => void;
  setUserLoggedOut: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  openAuthModal: false,
  authModalType: "LOGIN",
  isAuthenticated: false,

  hydrate: () => {
    const accessToken = getCookie("access") as string | undefined;
    const userCookie = getCookie("user") as string | undefined;

    if (accessToken && userCookie) {
      set({
        accessToken,
        user: JSON.parse(userCookie),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setAuthModal: (payload) => set({ ...payload }),
  setIsLoading: (isLoading) => set({ isLoading }),

  setUserLoggedIn: (payload) => {
    setCookie("access", payload.accessToken ?? "", {
      maxAge: 24 * 60 * 60,
      sameSite: "lax",
    });
    setCookie("refresh", getCookie("refresh") ?? "", {
      maxAge: 24 * 60 * 60,
      sameSite: "lax",
    });
    setCookie("user", JSON.stringify(payload.user), {
      maxAge: 24 * 60 * 60,
      sameSite: "lax",
    });

    set({
      accessToken: payload.accessToken,
      user: payload.user,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUserLoggedOut: () => {
    deleteCookie("access");
    deleteCookie("refresh");
    deleteCookie("user");
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => set({ user, isAuthenticated: true }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export default useAuthStore;
