"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/hooks/auth/useAuthStore";
import EmailVerifyForm from "./_components/EmailVerifyForm";
import SignupProvider from "@/providers/SignupProvider";

// Zod validation schema
const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { setAuthModal } = useAuthStore();

  const onSubmit = (data: SignUpFormData) => {
    console.log("SignUp data:", data);
  };

  return (
    <div className="p-8 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Create an Account
      </h2>
    <SignupProvider>


      <EmailVerifyForm/>
    </SignupProvider>

      {/* Switch to Login */}
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
