"use client";

import { useEffect } from "react";
import useAuthStore from "@/hooks/auth/useAuthStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate(); // restore tokens/user from cookies
  }, [hydrate]);

  return <>{children}</>;
}
