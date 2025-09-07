"use client";

import { useEffect } from "react";
import useAuthStore from "@/hooks/auth/useAuthStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { hydrate, setAuthModal, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthModal({ openAuthModal: true, authModalType: "LOGIN" });
    } else {
      setAuthModal({ openAuthModal: false, authModalType: "LOGIN" });
    }

    hydrate();
  }, [hydrate, setAuthModal, isAuthenticated]);

  return <>{children}</>;
}