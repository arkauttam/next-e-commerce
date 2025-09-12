"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import zxcvbn, { ZXCVBNResult } from "zxcvbn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { axiosPublic } from "@/services/axiosService";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { LuLoader } from "react-icons/lu";
import useAuthStore from "@/hooks/auth/useAuthStore";

/* ------------------ Validation ------------------ */
const schema = z
  .object({
    step: z.enum(["forgot", "otp", "reset"]),
    email: z.string().email("Invalid email"),
    otp: z.string().optional(),
    new_password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.step === "otp" && !data.otp) {
      ctx.addIssue({ code: "custom", path: ["otp"], message: "OTP is required" });
    }
    if (data.step === "reset") {
      if (!data.new_password)
        ctx.addIssue({ code: "custom", path: ["new_password"], message: "New password required" });
      if (!data.confirm_password)
        ctx.addIssue({ code: "custom", path: ["confirm_password"], message: "Confirm password required" });
      if (
        data.new_password &&
        data.confirm_password &&
        data.new_password !== data.confirm_password
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["confirm_password"],
          message: "Passwords do not match",
        });
      }
    }
  });

type FormType = z.infer<typeof schema>;

const getErrorMessage = (e: any) =>
  e?.response?.data?.detail ||
  e?.response?.data?.message ||
  "Something went wrong";

export default function ResetPassword() {
  const [step, setStep] = useState<"forgot" | "otp" | "reset">("forgot");
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isConfirmPasswordShowing, setIsConfirmPasswordShowing] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<ZXCVBNResult>();
  const { setAuthModal } = useAuthStore();

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { step: "forgot", email: "" },
  });

  const forgotMutation = useMutation({
    mutationFn: (email: string) =>
      axiosPublic.post("/accounts/password/forgot/", { email }),
    onSuccess: (_, email) => {
      toast.success(`OTP sent to ${email}`);
      setStep("otp");
      form.setValue("step", "otp");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (body: { email: string; otp: string }) =>
      axiosPublic.post("/accounts/password/verify-otp/", body),
    onSuccess: () => {
      toast.success("OTP verified");
      setStep("reset");
      form.setValue("step", "reset");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });

  const resetMutation = useMutation({
    mutationFn: (body: {
      email: string;
      new_password: string;
      confirm_password: string;
    }) => axiosPublic.post("/accounts/password/reset/", body),
    onSuccess: () => {
      toast.success("Password updated successfully");
      setAuthModal({ openAuthModal: false, authModalType: "RESET" })

      setStep("forgot");
      form.reset({ step: "forgot", email: "" });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("new_password", e.target.value);
    const result = zxcvbn(e.target.value);
    setPasswordStrength(result);
  };

  const onSubmit = (values: FormType) => {
    if (step === "forgot") forgotMutation.mutate(values.email);
    else if (step === "otp") verifyOtpMutation.mutate({ email: values.email, otp: values.otp! });
    else
      resetMutation.mutate({
        email: values.email,
        new_password: values.new_password!,
        confirm_password: values.confirm_password!,
      });
  };

  const isLoading =
    forgotMutation.isPending ||
    verifyOtpMutation.isPending ||
    resetMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  disabled={step !== "forgot"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* OTP */}
        {step === "otp" && (
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter OTP *</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="gap-2">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <InputOTPSlot
                          key={idx}
                          index={idx}
                          className="h-12 w-12 rounded-lg border border-input ring-[#2989F8]"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Password + Confirm password */}
        {step === "reset" && (
          <>
            {(["new_password", "confirm_password"] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-xs">
                      {name === "new_password" ? "Password" : "Confirm Password"} *
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-gray-300 rounded-lg pr-2 focus-within:ring-2 focus-within:ring-[#164880]">
                        <Input
                          {...field}
                          type={
                            name === "new_password"
                              ? isPasswordShowing
                                ? "text"
                                : "password"
                              : isConfirmPasswordShowing
                                ? "text"
                                : "password"
                          }
                          placeholder={`Enter ${name === "new_password" ? "Password" : "Confirm Password"
                            }`}
                          onChange={(e) => {
                            field.onChange(e);
                            if (name === "new_password") handlePasswordChange(e);
                          }}
                          className="flex-1 border-0 placeholder:text-gray-400 focus-visible:ring-transparent"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            name === "new_password"
                              ? setIsPasswordShowing((p) => !p)
                              : setIsConfirmPasswordShowing((p) => !p)
                          }
                        >
                          {name === "new_password"
                            ? isPasswordShowing
                              ? <VscEyeClosed />
                              : <VscEye />
                            : isConfirmPasswordShowing
                              ? <VscEyeClosed />
                              : <VscEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Strength meter */}
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
          </>
        )}

        <Button type="submit" variant="secondary" className="w-full" disabled={isLoading}>
          {isLoading ? <LuLoader className="animate-spin w-6 h-6" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
