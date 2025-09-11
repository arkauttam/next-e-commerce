"use client";
import zxcvbn, { ZXCVBNResult } from 'zxcvbn';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ChangeEvent, FC, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";
import customFetch from "@/services/customFetch";
import { axiosPublic } from "@/services/axiosService";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/hooks/auth/useAuthStore";
import { useSignupStore } from '@/providers/SignupProvider';

const PasswordDTOSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

type PasswordDTO = z.infer<typeof PasswordDTOSchema>;

type Props = {};

const FinalSubmissionForm: FC<Props> = () => {
  const router = useRouter();
  const { setAuthModal, setUserLoggedIn } = useAuthStore();

  const { setOtp, setModalState, updateDetails } = useSignupStore((state) => ({
    setOtp: state.setOtp,
    setModalState: state.setModalState,
    updateDetails: state.updateDetails,
  }));
  const { phoneNumber, email } = useSignupStore((state) => ({
    phoneNumber: state.phone,
    email: state.email,
  }));
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isConfirmPasswordShowing, setIsConfirmPasswordShowing] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<ZXCVBNResult | null>(null);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result);
  };
  const form = useForm<PasswordDTO>({
    resolver: zodResolver(PasswordDTOSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate: agentRegisterMutation, isPending } = useMutation({
    mutationFn: async (body: any) => {
      const { data, error } = await customFetch<any, any>({
        axiosInstance: axiosPublic,
        url: "/accounts/customer-register/",
        method: "POST",
        body,
      });
      if (error) throw new Error(error);
      return data;
    },
  });

  const handleSubmit = (values: PasswordDTO) => {
    const signupBody = {
      account: {
        account_first_name: values.firstName,
        account_last_name: values.lastName,
        account_email: email,
        account_phone: phoneNumber,
        password: values.password,
        confirm_password: values.confirm_password,
      }, address: {
        address: "Maharashtra",
      },
    };
    agentRegisterMutation(signupBody, {
      onSuccess: () => {
        form.reset();
        setAuthModal({ openAuthModal: false, authModalType: "LOGIN" });
        toast.success("Thank you for registering with us");
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="flex items-center gap-1">
          <h4 className="text-sm font-medium text-gray-700 italic">Personal Details</h4>
          <span className="h-[1px] flex-1 bg-gray-300" />
        </div>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs text-gray-600">
                  First Name <span className="text-sm text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter First Name"
                    className="focus-visible:ring-sky-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs text-gray-600">
                  Last Name <span className="text-sm text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Last Name"
                    className="focus-visible:ring-sky-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-600">
                  Password<span className="text-sm text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center rounded-lg border border-gray-300 pr-2 focus-within:ring-2 focus-within:ring-[#164880] focus-within:ring-offset-2">
                    <Input
                      {...field}
                      type={isPasswordShowing ? "text" : "password"}
                      placeholder="Enter password"
                      className="flex-1 border-0 placeholder:uppercase placeholder:text-gray-400 focus-visible:ring-transparent"
                      onChange={(e) => {
                        field.onChange(e);
                        handlePasswordChange(e);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordShowing((prev) => !prev)}
                    >
                      <span className="text-[#164880] text-lg font-bold">
                        {isPasswordShowing ? (
                          <VscEyeClosed className="h-6 w-6" />
                        ) : (
                          <VscEye className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-600">
                  Confirm Password<span className="text-sm text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center rounded-lg border border-gray-300 pr-2 focus-within:ring-2 focus-within:ring-[#164880] focus-within:ring-offset-2">
                    <Input
                      {...field}
                      type={isConfirmPasswordShowing ? "text" : "password"}
                      placeholder="Enter confirm password"
                      className="flex-1 border-0 placeholder:uppercase placeholder:text-gray-400 focus-visible:ring-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setIsConfirmPasswordShowing((prev) => !prev)}
                    >
                      <span className="text-lg text-[#164880] font-bold">
                        {isConfirmPasswordShowing ? (
                          <VscEyeClosed className="h-6 w-6" />
                        ) : (
                          <VscEye className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {passwordStrength && (
          <div className="text-sm text-gray-600">
            Password strength: {passwordStrength.score}/4
            {passwordStrength.feedback.suggestions.length > 0 && (
              <ul className="list-disc list-inside">
                {passwordStrength.feedback.suggestions.map((suggestion: any, index: any) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        <Button variant="secondary" className="inline-flex w-full" type="submit" disabled={isPending}>
          {isPending ? <LuLoader className="h-5 w-5 animate-spin" /> : <span>Sign up</span>}
        </Button>
      </form>
    </Form>
  );
};

export default FinalSubmissionForm;