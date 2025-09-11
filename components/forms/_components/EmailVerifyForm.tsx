"use client";
import { type FC } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { generateOTP } from "@/lib/utils";
import { LuLoader } from "react-icons/lu";
import { toast } from "sonner";
import customFetch from "@/services/customFetch";
import axios from "axios";
import { useSignupStore } from "@/providers/SignupProvider";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props { }

const EmailVerifyForm: FC<Props> = ({ }) => {
  const { userType, setOtp, setModalState, updateDetails } = useSignupStore(
    (state) => ({
      userType: state.userType,
      setOtp: state.setOtp,
      setModalState: state.setModalState,
      updateDetails: state.updateDetails,
    }),
  );
  const EmailDTOSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"),
    mobile: z
      .string()
      .min(10, "Mobile number too short")
      .max(10, "Mobile number too long")
      .regex(/^(\[\-\s]?)?[6789]\d{9}$/, "Invalid Mobile number"),
  });
  const EmailVerifyDTOSchema = EmailDTOSchema
  type EmailVerifyDTO = z.infer<typeof EmailVerifyDTOSchema>;

  const form = useForm<EmailVerifyDTO>({
    resolver: zodResolver(EmailVerifyDTOSchema),
    defaultValues: {
      email: "",
      mobile: "",

    },
  });
  const { mutate: sendOtpMutation, isPending } = useMutation({
    mutationFn: async (body: any) => {
      const { data, error } = await customFetch<any, any>({
        axiosInstance: axios,
        url: "/api/send-email-otp",
        method: "POST",
        body,
      });
      if (error) throw new Error(error);
      return data;
    },
  });

  const handleSubmit = async (values: EmailVerifyDTO) => {
    const otp = generateOTP();
    sendOtpMutation(
      { otp, email: values.email },
      {
        onSuccess(data) {
          toast.success(`OTP send to ${values.email}`);
          setOtp(otp);
          updateDetails({ email: values.email });
          updateDetails({ phone: values.mobile });
          setModalState({ isModalVisible: true, visibleModal: "EMAIL_OTP" });
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Mobile Number<span className="text-sm text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-[#164880] focus-within:ring-offset-2">
                  <span>
                    <Image
                      src="/india-flag.svg"
                      alt="indian flag"
                      height={1080}
                      width={1920}
                      className="h-4 w-auto"
                    />
                  </span>
                  <span className="text-lg">+91</span>
                  <span className="flex-1">
                    <Input
                      type="tel"
                      {...field}
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                      className="rounded-lg text-sm uppercase placeholder:text-gray-400 focus-visible:ring-[#164880]"
                    />
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel className="text-xs">
                Email Address<span className="text-sm text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter Email Address"
                  className="rounded-lg text-sm uppercase placeholder:text-gray-400 focus-visible:ring-[#164880]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          variant="secondary"
          className="w-full"
        >
          {isPending ? (
            <span>
              <LuLoader className="h-6 w-6 animate-spin" />
            </span>
          ) : null}{" "}
          Send OTP
        </Button>
      </form>
    </Form>
  );
};

export default EmailVerifyForm;
