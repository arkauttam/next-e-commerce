"use client";
import { FC } from "react";
import useAuthStore from "@/hooks/auth/useAuthStore";
import EmailVerifyForm from "./_components/EmailVerifyForm";

const SignUpForm: FC = () => {
  const { setAuthModal } = useAuthStore();

  return (
      <div className="p-4 rounded-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          Create an Account
        </h2>

        <EmailVerifyForm />

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
      </div>
  );
};

export default SignUpForm;
