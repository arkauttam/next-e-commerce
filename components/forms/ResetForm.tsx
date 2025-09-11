"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { axiosPublic } from "@/services/axiosService";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Invalid email"),
});
type schemaType = z.infer<typeof schema>;
const ResetForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  const handleSubmit = async (values: schemaType) => {
    setIsLoading(true);
    try {
      const { data, status } = await axiosPublic.post(
        "/accounts/password-reset/",
        JSON.stringify({
          account_email: values.email,
        }),
      );

      if (status >= 200 && status <= 400) {
        console.log(data);
        toast.success(`Reset password link sent to ${values.email}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail ?? error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-xs text-gray-600">
                Email <span className="text-sm text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Email Address"
                  className="focus-visible:ring-sky-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          variant="secondary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <ImSpinner2 className="h-5 w-5 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
