"use client";

import { useEffect, useRef } from "react";
import useAuthStore from "@/hooks/auth/useAuthStore";
import { useAxiosAuth } from "@/hooks/api/useAxiosAuth";
import { useRefreshToken } from "@/hooks/api/useRefreshToken";
import { getTokenRemainingSeconds, isJwtExpired } from "@/lib/jwt";
import { getCookie } from "cookies-next";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuthModal = useAuthStore((s) => s.setAuthModal);

  const refreshToken = useRefreshToken();
  useAxiosAuth();

  const refreshTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isLoading) return;

    const ensure = async () => {
      const refreshExists = getCookie("refresh");
      if (!refreshExists) return; 

      if (!accessToken) return;
      const skew = calculateSkew(accessToken);
      if (isJwtExpired(accessToken, skew)) {
        await refreshToken();
      }
    };

    ensure();
  }, [isLoading, accessToken, refreshToken]);

  useEffect(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }

    if (!accessToken) return;

    const remaining = getTokenRemainingSeconds(accessToken);
    const skew = calculateSkew(accessToken);

    if (remaining <= 0) {
      refreshToken();
      return;
    }

    const msUntilRefresh = Math.max((remaining - skew) * 1000, 0);

    if (msUntilRefresh === 0) {
      refreshToken();
      return;
    }

    refreshTimeoutRef.current = window.setTimeout(() => {
      refreshToken();
    }, msUntilRefresh);

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      setAuthModal({ openAuthModal: true, authModalType: "LOGIN" });
    } else {
      setAuthModal({ openAuthModal: false, authModalType: "LOGIN" });
    }
  }, [isAuthenticated, isLoading, setAuthModal]);

  return <>{children}</>;
}


function calculateSkew(token: string | null): number {
  if (!token) return 60;
  const remaining = getTokenRemainingSeconds(token);
  return Math.max(Math.floor(remaining * 0.1), 5);
}
