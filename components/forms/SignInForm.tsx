// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import useAuthStore from "@/hooks/auth/useAuthStore";
// import { useMutation } from "@tanstack/react-query";
// import customFetch from "@/services/customFetch";
// import { isAxiosError } from "axios";
// import { toast } from "sonner";
// import { setCookie } from "cookies-next";

// const signInSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// const SignInForm = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const form = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const { setAuthModal, setUserLoggedIn } = useAuthStore();

//   const { mutateAsync: loginMutation } = useMutation({
//     mutationFn: async (body: any) => {
//       const { data, error } = await customFetch({
//         url: "/accounts/login/",
//         body,
//         method: "POST",
//       });
//       if (error) throw new Error(error);
//       return data;
//     },
//   });

//   async function onSubmit(values: SignInFormData) {
//     setIsLoading(true);
//     try {
//       const loginResults = (await loginMutation({
//         login: values.email.toLowerCase(),
//         password: values.password,
//       })) as any;

//       setCookie("access", loginResults?.access, {
//         maxAge: 24 * 60 * 60,
//         sameSite: "lax",
//       });
//       setCookie("refresh", loginResults?.refresh, {
//         maxAge: 24 * 60 * 60,
//         sameSite: "lax",
//       });

//       setAuthModal({ openAuthModal: false, authModalType: "LOGIN" });
//       setUserLoggedIn({
//         accessToken: loginResults?.access,
//         user: loginResults?.user,
//       });

//       toast.success("Login Successful");
//     } catch (error) {
//       if (isAxiosError(error)) {
//         toast.error(error?.response?.data?.message || "Login failed");
//       } else if (error instanceof Error) {
//         toast.error(error?.message);
//       } else {
//         toast.error("Login failed");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="p-8 rounded-lg shadow-md w-full">
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
//         Sign In
//       </h2>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* Email */}
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email Address *</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="you@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Password */}
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password *</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="******" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? "Signing In..." : "Sign In"}
//           </Button>
//         </form>
//       </Form>

//       {/* Forgot Password */}
//       <div className="text-center mt-4">
//         <button
//           className="underline text-sm"
//           onClick={() =>
//             setAuthModal({ openAuthModal: true, authModalType: "RESET" })
//           }
//         >
//           Forgot Password?
//         </button>
//       </div>

//       {/* Switch to Sign Up */}
//       <p className="text-center mt-4">
//         Don&apos;t have an account?{" "}
//         <button
//           className="underline"
//           onClick={() =>
//             setAuthModal({ openAuthModal: true, authModalType: "SIGNUP" })
//           }
//         >
//           Sign Up
//         </button>
//       </p>
//     </div>
//   );
// };

// export default SignInForm;

/* "use client" */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "@/hooks/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import customFetch from "@/services/customFetch";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setAuthModal, setUserLoggedIn } = useAuthStore();

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: async (body: any) => {
      const { data, error } = await customFetch({
        url: "/accounts/login/",
        body,
        method: "POST",
      });
      if (error) throw new Error(error);
      return data;
    },
  });

  async function onSubmit(values: SignInFormData) {
    setIsLoading(true);
    try {
      const loginResults = (await loginMutation({
        login: values.email.toLowerCase(),
        password: values.password,
      })) as any;

      setCookie("access", loginResults?.access, {
        maxAge: 24 * 60 * 60,
        sameSite: "lax",
      });
      setCookie("refresh", loginResults?.refresh, {
        maxAge: 24 * 60 * 60,
        sameSite: "lax",
      });

      setAuthModal({ openAuthModal: false, authModalType: "LOGIN" });
      setUserLoggedIn({
        accessToken: loginResults?.access,
        user: loginResults?.user,
      });

      toast.success("Login Successful");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Login failed");
      } else if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
   
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md  bg-[#0f172a] text-gray-200 rounded-lg shadow-lg p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email Address *</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...form.register("email")}
            className="w-full border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password *</label>
          <input
            type="password"
            placeholder="******"
            {...form.register("password")}
            className="w-full border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition disabled:opacity-60"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-sm underline"
            onClick={() =>
              setAuthModal({ openAuthModal: true, authModalType: "RESET" })
            }
          >
            Forgot Password?
          </button>
        </div>

        {/* Switch to Sign Up */}
        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="underline text-blue-400 font-medium"
            onClick={() =>
              setAuthModal({ openAuthModal: true, authModalType: "SIGNUP" })
            }
          >
            Sign Up
          </button>
        </p>
      </form>
  );
};

export default SignInForm;
