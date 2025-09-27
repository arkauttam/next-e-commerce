"use client";
import { FC } from "react";
import useAuthStore from "@/hooks/auth/useAuthStore";
import EmailVerifyForm from "./_components/EmailVerifyForm";
import ResetPassword from "./_components/ResetPassword";

const SignUpForm: FC = () => {
  const { setAuthModal } = useAuthStore();

  return (
    <div className="p-4 rounded-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Reset Password
      </h2>

      <ResetPassword />

      <p className="text-center mt-4">
        Already have an account?{" "}
        <button
          className="underline"
          onClick={() =>
            setAuthModal({ openAuthModal: true, authModalType: "LOGIN" })
          }
        >
          Sign In
        </button>
      </p>
      <p className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <button
          className="underline"
          onClick={() =>
            setAuthModal({ openAuthModal: true, authModalType: "SIGNUP" })
          }
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
