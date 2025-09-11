"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { generateOTP } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import customFetch from "@/services/customFetch";
import axios from "axios";
import { useSignupStore } from "@/providers/SignupProvider";
import { Button } from "@/components/ui/button";

const otpFormSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must have 4 digits")
    .max(4, "OTP must have 4 digits"),
});

const EmailOtpForm = () => {
  const { email, otp, setOtp, setVerified, setModalState } = useSignupStore(
    (state) => ({
      otp: state.otp,
      email: state.email,
      setOtp: state.setOtp,
      setVerified: state.setVerified,
      setModalState: state.setModalState,
    }),
  );
  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { mutateAsync: sendOtpMutation, isPending } = useMutation({
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
  const handleSubmit = (values: z.infer<typeof otpFormSchema>) => {
    if (otp === parseInt(values.otp)) {
      setVerified({ emailVerified: true });
      setModalState({ isModalVisible: true, visibleModal: "DETAILS_FORM" });
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleResend = async () => {
    const otp = generateOTP();
    sendOtpMutation(
      { otp, email },
      {
        onSuccess() {
          toast.success(`OTP send to ${email}`);
          setOtp(otp);
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="my-4 flex items-center justify-between gap-5">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={4}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={0}
                            className="h-12 w-12 rounded-lg border-b border-l border-r border-t border-input ring-[#2989F8] first:rounded-l-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-12 w-12 rounded-lg border-b border-l border-r border-t border-input ring-[#2989F8]"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-12 w-12 rounded-lg border-b border-l border-r border-t border-input ring-[#2989F8]"
                          />
                          <InputOTPSlot
                            index={3}
                            className="h-12 w-12 rounded-lg border-b border-l border-r border-t border-input ring-[#2989F8] last:rounded-r-lg"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            onClick={handleResend}
            disabled={isPending}
            type="button"
            className="text-sm text-[#164880] disabled:pointer-events-none disabled:opacity-50"
          >
            Resend
          </button>
        </div>
        <Button
          type="submit"
          className="w-full"
          variant="secondary"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EmailOtpForm;
