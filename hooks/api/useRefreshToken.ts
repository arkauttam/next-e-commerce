"use client";

import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { axiosPublic } from "@/services/axiosService";
import useAuthStore from "../auth/useAuthStore";
import { getTokenRemainingSeconds } from "@/lib/jwt";

const ACCESS_COOKIE = "access";
const USER_COOKIE = "user";

export const useRefreshToken = () => {
  const { setAccessToken, setUserLoggedOut, user } = useAuthStore();

  const refreshToken = async () => {
    try {
      const { data } = await axiosPublic.post("/accounts/token/refresh/");

      if (data?.access) {
        setAccessToken(data.access);

        const remain = getTokenRemainingSeconds(data.access);

        setCookie(ACCESS_COOKIE, data.access, {
          maxAge: remain,
          sameSite: "lax",
        });

        if (user) {
          setCookie(USER_COOKIE, JSON.stringify(user), {
            maxAge: remain,
            sameSite: "lax",
          });
        }

        return data.access;
      }

      console.warn("Refresh token call returned no access token");
      setUserLoggedOut();
      return null;
    } catch (error) {
      console.error("Refresh token failed:", error);
      setUserLoggedOut();
      return null;
    }
  };

  return refreshToken;
};
