"use client";
import { FC } from "react";
import useAuthStore from "@/hooks/auth/useAuthStore";
import EmailVerifyForm from "./_components/EmailVerifyForm";

const SignUpForm: FC = () => {
  const { setAuthModal } = useAuthStore();

  return (
      <div className="p-4 rounded-lg shadow-md w-full">
        <EmailVerifyForm />
      </div>
  );
};

export default SignUpForm;