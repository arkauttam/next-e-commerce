"use client";

import { create } from "zustand";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import type { User } from "@/types/user.types";
import { getTokenRemainingSeconds } from "@/lib/jwt";

const ACCESS_COOKIE = "access";
const USER_COOKIE = "user";

interface State {
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  openAuthModal: boolean;
  authModalType: "LOGIN" | "SIGNUP" | "RESET";
}

interface AuthModalPayload {
  openAuthModal: boolean;
  authModalType: "LOGIN" | "SIGNUP" | "RESET";
}
interface LoggedInPayload {
  user: User | null;
  accessToken: string | null;
}

interface Actions {
  hydrate: () => void;
  setAuthModal: (payload: AuthModalPayload) => void;
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string | null) => void;
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
    const accessToken = getCookie(ACCESS_COOKIE) as string | undefined;
    const userCookie = getCookie(USER_COOKIE) as string | undefined;

    if (accessToken && userCookie) {
      try {
        set({
          accessToken,
          user: JSON.parse(userCookie),
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        deleteCookie(USER_COOKIE);
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
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
    const newAccess = payload.accessToken ?? null;

    if (newAccess) {
      const remain = getTokenRemainingSeconds(newAccess);
      if (remain > 0) {
        setCookie(ACCESS_COOKIE, newAccess, {
          maxAge: remain,
          sameSite: "lax",
        });
      }
    } else {
      deleteCookie(ACCESS_COOKIE);
    }

    try {
      const remain = newAccess ? getTokenRemainingSeconds(newAccess) : undefined;
      if (remain && remain > 0) {
        setCookie(USER_COOKIE, JSON.stringify(payload.user ?? null), {
          maxAge: remain,
          sameSite: "lax",
        });
      } else {
        setCookie(USER_COOKIE, JSON.stringify(payload.user ?? null), {
          maxAge: 60 * 60,
          sameSite: "lax",
        });
      }
    } catch {
      // ignore
    }

    set({
      accessToken: newAccess,
      user: payload.user ?? null,
      isAuthenticated: !!newAccess,
      isLoading: false,
    });
  },

  setUserLoggedOut: () => {
    deleteCookie(ACCESS_COOKIE);
    deleteCookie(USER_COOKIE);
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => set({ user, isAuthenticated: true }),

  setAccessToken: (accessToken) => {
    if (accessToken) {
      const remain = getTokenRemainingSeconds(accessToken);
      if (remain > 0) {
        setCookie(ACCESS_COOKIE, accessToken, {
          maxAge: remain,
          sameSite: "lax",
        });
      }
    } else {
      deleteCookie(ACCESS_COOKIE);
    }
    set({ accessToken, isAuthenticated: !!accessToken });
  },
}));

export default useAuthStore;
