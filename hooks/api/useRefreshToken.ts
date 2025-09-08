"use client";

import { setCookie, getCookie } from "cookies-next";
import { axiosPublic } from "@/services/axiosService";
import useAuthStore from "../auth/useAuthStore";

export const useRefreshToken = () => {
  const { setAccessToken } = useAuthStore();

  const refreshToken = async () => {
    try {
      const refresh = getCookie("refresh");

      if (!refresh) {
        throw new Error("No refresh token found");
      }

      const { data } = await axiosPublic.post("/accounts/token/refresh/", {
        refresh,
      });

      if (data?.access) {
        setAccessToken(data.access);
        setCookie("access", data.access, {
          maxAge: 24 * 60 * 60,
          sameSite: "lax",
        });
      }

      if (data?.refresh) {
        setCookie("refresh", data.refresh, {
          maxAge: 24 * 60 * 60,
          sameSite: "lax",
        });
      }

      return data?.access;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
    }
  };

  return refreshToken;
};
