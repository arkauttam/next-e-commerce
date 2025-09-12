"use client";

import { FC, useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuLoader } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import customFetch from "@/services/customFetch";
import { axiosPublic } from "@/services/axiosService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import zxcvbn, { ZXCVBNResult } from "zxcvbn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import useAuthStore from "@/hooks/auth/useAuthStore";

interface Props { }

const EmailVerifyForm: FC<Props> = () => {
  const router = useRouter();

  const schema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    mobile: z
      .string()
      .min(10, "Mobile number too short")
      .max(10, "Mobile number too long")
      .regex(/^[6789]\d{9}$/, "Invalid Mobile number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm Password is required"),
    otp: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    pin_code: z.string().min(6, "Pin code is required"),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

  type FormDTO = z.infer<typeof schema>;

  const form = useForm<FormDTO>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
      otp: "",
      address: "",
      pin_code: "",
    },
  });

  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isConfirmPasswordShowing, setIsConfirmPasswordShowing] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<ZXCVBNResult | null>(null);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otpTimer, setOtpTimer] = useState(300);
  const { setAuthModal } = useAuthStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordStrength(zxcvbn(e.target.value));
  };

  // --- Mutations ---
  const registerMutation = useMutation({
    mutationFn: async (body: any) => {
      const { data, error } = await customFetch<any, any>({
        axiosInstance: axiosPublic,
        url: "/accounts/register/",
        method: "POST",
        body,
      });
      if (error) throw new Error(error);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Please verify OTP sent to your email.");
      setStep("otp");
      setOtpTimer(300);
    },
    onError: (err: any) => toast.error(err.message || "Registration failed"),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (signupBody: any) => {
      const { data, error } = await customFetch<any, any>({
        axiosInstance: axiosPublic,
        url: "/accounts/otp/verify/",
        method: "POST",
        body: signupBody,
      });
      if (error) throw new Error(error);
      return data;
    },
    onSuccess: () => {
      toast.success("OTP verified! Registration completed.");
      form.reset();
      router.push("/");
      setAuthModal({ openAuthModal: false, authModalType: "SIGNUP" })

    },
    onError: (err: any) => toast.error(err.message || "OTP verification failed"),
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (signupBody: any) => {
      const { data, error } = await customFetch<any, any>({
        axiosInstance: axiosPublic,
        url: "/accounts/otp/resend/",
        method: "POST",
        body: signupBody,
      });
      if (error) throw new Error(error);
      return data;
    },
    onSuccess: () => {
      toast.success("OTP resent successfully!");
      setOtpTimer(300);
    },
    onError: (err: any) => toast.error(err.message || "Failed to resend OTP"),
  });

  // --- Handlers ---
  const handleSubmitForm = (values: FormDTO) => {
    const signupBody = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      mobile_no: values.mobile,
      address: values.address,
      pin_code: values.pin_code,
      password: values.password,
      password2: values.confirm_password,
    };
    registerMutation.mutate(signupBody);
  };

  const handleVerifyOtp = async (values: FormDTO) => {
    if (otpTimer <= 0) {
      toast.error("OTP expired. Please resend.");
      return;
    }

    const signupBody = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      mobile_no: values.mobile,
      address: values.address,
      pin_code: values.pin_code,
      password: values.password,
      password2: values.confirm_password,
      otp: values.otp,
    };

    verifyOtpMutation.mutate(signupBody);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(step === "form" ? handleSubmitForm : handleVerifyOtp)}
      >
        {step === "form" && (
          <>
            {/* First & Last Name */}
            <div className="flex items-center gap-2">
              {["firstName", "lastName"].map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as "firstName" | "lastName"}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">
                        {name === "firstName" ? "First Name" : "Last Name"} *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter ${name === "firstName" ? "First" : "Last"} Name`}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Mobile Number *</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-[#164880]">
                      <Image src="/india-flag.svg" alt="indian flag" width={20} height={12} />
                      <span className="text-lg">+91</span>
                      <Input {...field} type="tel" placeholder="Enter Mobile Number" maxLength={10} className="flex-1 border-0 focus-visible:ring-transparent" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Email Address *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Email" className="rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Address *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Address" className="rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Pin code */}
            <FormField
              control={form.control}
              name="pin_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Pin Code *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Pin Code" maxLength={6} className="rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password & Confirm */}
            <div className="flex items-center gap-2">
              {["password", "confirm_password"].map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as "password" | "confirm_password"}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">{name === "password" ? "Password" : "Confirm Password"} *</FormLabel>
                      <FormControl>
                        <div className="flex items-center border border-gray-300 rounded-lg pr-2 focus-within:ring-2 focus-within:ring-[#164880]">
                          <Input
                            {...field}
                            type={name === "password" ? (isPasswordShowing ? "text" : "password") : (isConfirmPasswordShowing ? "text" : "password")}
                            placeholder={`Enter ${name === "password" ? "Password" : "Confirm Password"}`}
                            onChange={(e) => {
                              field.onChange(e);
                              if (name === "password") handlePasswordChange(e);
                            }}
                            className="flex-1 border-0 placeholder:text-gray-400 focus-visible:ring-transparent"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              name === "password"
                                ? setIsPasswordShowing((prev) => !prev)
                                : setIsConfirmPasswordShowing((prev) => !prev)
                            }
                          >
                            {name === "password"
                              ? isPasswordShowing ? <VscEyeClosed /> : <VscEye />
                              : isConfirmPasswordShowing ? <VscEyeClosed /> : <VscEye />}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {passwordStrength && (
              <div className="text-sm text-gray-600">
                Password strength: {passwordStrength.score}/4
                {passwordStrength.feedback.suggestions.length > 0 && (
                  <ul className="list-disc list-inside">
                    {passwordStrength.feedback.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <Button
              variant="secondary"
              type="submit"
              className="w-full flex justify-center"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? <LuLoader className="animate-spin w-6 h-6" /> : "Register"}
            </Button>
          </>
        )}

        {/* --- Step 2: OTP --- */}
        {step === "otp" && (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">OTP expires in {formatTimer(otpTimer)}</span>
              <button
                onClick={() => resendOtpMutation.mutate({
                  first_name: form.getValues("firstName"),
                  last_name: form.getValues("lastName"),
                  email: form.getValues("email"),
                  mobile_no: form.getValues("mobile"),
                  address: form.getValues("address"),
                  pin_code: form.getValues("pin_code"),
                  password: form.getValues("password"),
                  password2: form.getValues("confirm_password"),
                })}
                disabled={resendOtpMutation.isPending}
                className="text-secondary"
              >
                {resendOtpMutation.isPending ? <LuLoader className="animate-spin w-5 h-5" /> : "Resend OTP"}
              </button>
            </div>

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Enter OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup className="gap-2">
                        {Array.from({ length: 6 }).map((_, idx) => (
                          <InputOTPSlot key={idx} index={idx} className="h-12 w-12 rounded-lg border border-input ring-[#2989F8]" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="secondary"
              type="submit"
              className="w-full flex justify-center"
              disabled={verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending ? <LuLoader className="animate-spin w-6 h-6" /> : "Verify OTP"}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default EmailVerifyForm;
