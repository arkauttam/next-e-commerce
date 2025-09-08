"use client";
import { useEffect } from "react";
import { axiosProtected } from "@/services/axiosService";
import { useRefreshToken } from "./useRefreshToken";
import useAuthStore from "../auth/useAuthStore";

let isRefreshing = false;
let pendingRequests: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  pendingRequests.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  pendingRequests = [];
};

export const useAxiosAuth = () => {
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosProtected.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosProtected.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        // if (prevRequest.url.includes("/accounts/token/refresh/")) {
        //   useAuthStore.getState().setUserLoggedOut();
        //   return Promise.reject(error);
        // }
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest._retry
        ) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              pendingRequests.push({ resolve, reject });
            }).then((token) => {
              prevRequest.headers["Authorization"] = `Bearer ${token}`;
              return axiosProtected(prevRequest);
            });
          }

          prevRequest._retry = true;
          isRefreshing = true;

          try {
            const newAccess = await refreshToken();
            if (!newAccess) {
              throw new Error("Refresh token failed");
            }
            processQueue(null, newAccess);
            prevRequest.headers["Authorization"] = `Bearer ${newAccess}`;
            return axiosProtected(prevRequest);
          } catch (err) {
            processQueue(err, null);
            useAuthStore.getState().setUserLoggedOut();
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosProtected.interceptors.request.eject(requestIntercept);
      axiosProtected.interceptors.response.eject(responseIntercept);
    };
  }, [refreshToken]);

  return axiosProtected;
};
