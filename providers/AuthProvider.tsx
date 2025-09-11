"use client";
import { useEffect } from "react";
import useAuthStore from "@/hooks/auth/useAuthStore";
import { useAxiosAuth } from "@/hooks/api/useAxiosAuth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { hydrate, isAuthenticated, setAuthModal } = useAuthStore();
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      setAuthModal({ openAuthModal: true, authModalType: "LOGIN" });
    } else {
      setAuthModal({ openAuthModal: false, authModalType: "LOGIN" });
    }
  }, [isAuthenticated, setAuthModal]);
  
  useAxiosAuth();
  return <>{children}</>;
}
