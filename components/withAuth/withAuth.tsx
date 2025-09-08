"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/hooks/auth/useAuthStore";
import Loading from "@/app/loading";

const withAuth = <P extends object>(WrappedComponent: FC<P>): FC<P> => {
  const WithAuth: FC<P> = (props) => {
    const { isLoading, isAuthenticated, user } = useAuthStore();
    const router = useRouter();
    
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/");
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading || !isAuthenticated) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  // Add display name for debugging
  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;