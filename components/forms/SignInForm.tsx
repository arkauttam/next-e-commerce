'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";

// Define Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data); // Handle form submission
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
      {/* Centered Sign In Heading */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Sign In
      </h2>

      {/* Sign In Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        >
          Sign In
        </Button>
      </form>

      {/* Forgot Password Centered */}
      <div className="text-center font-medium mt-4">
        Forgot Password{" "}
        <Link className="underline" href={"/forgot-password"}>
          here
        </Link>
      </div>

      {/* Sign Up Link */}
      <p className="text-center m-3">
        Don&apos;t have an account{" "}
        <Link className="underline" href={"/sign-up"}>
          Sign Up
        </Link>
      </p>

      {/* Google Sign In at Bottom */}
      <div className="mt-6">
        <p className="text-lg font-bold my-2 text-center">OR</p>
        <Button className="w-full p-6 flex items-center justify-center gap-2 text-lg">
          <FaGoogle size={25} /> Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
