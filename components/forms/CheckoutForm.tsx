'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";

// Defined Zod schema for form validation
const schema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(8, "Phone is required"),
  city: z.string().min(3, "City is required"),
  zip: z.string().min(5, "ZIP Code is required"),
  country: z.string().min(2, "Country is required"),
});

// Defined types for form data
type FormData = z.infer<typeof schema>;

const CheckoutForm: React.FC = () => {
  // Initialize React Hook Form with Form components
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 dark:text-white">
                    First Name <span className="text-sm text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <FormItem>
                  <FormLabel className="text-slate-600 dark:text-white">
                    Last Name <span className="text-sm text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      {...field}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 dark:text-white">
                  Address <span className="text-sm text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full address"
                    {...field}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 dark:text-white">
                    Phone <span className="text-sm text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 dark:text-white">
                    City <span className="text-sm text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city"
                      {...field}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 dark:text-white">
                    ZIP Code <span className="text-sm text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your ZIP code"
                      {...field}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 dark:text-white">
                    Country <span className="text-sm text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your country"
                      {...field}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Button type="submit" className="w-full flex items-center justify-center gap-3 my-2 text-xl bg-blue-500 dark:bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            >
              {" "}
              <ArrowRight /> Checkout Now
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;