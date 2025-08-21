"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";
import { Card } from "../ui/card";

const CouponCodeForm = () => {
  const [coupon, setCoupon] = useState("");
  const { applyCoupon } = useCartStore();

  const handleForSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyCoupon(coupon);
    toast("Coupon Applied Succesfully");
  };

  return (
    <Card className="p-4 dark:bg-slate-700">
      <form onSubmit={handleForSubmission} action="" className="space-y-2">
        <Label
          className="text-lg font-semibold text-gray-700 dark:text-white mb-4"
          htmlFor="coupon"
        >
          Enter Your Coupon Code
        </Label>
        <div className="flex items-center justify-end gap-4">

          <Input
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="YOUR COUPON CODE"
            className="w-full p-4 rounded-md"
          />
          <Button className="border border-input border-green-700 hover:bg-slate-100 bg-transparent dark:bg-slate-800 hover:dark:bg-slate-700 text-green-600">Submit</Button>
        </div>
      </form>
    </Card>
  );
};

export default CouponCodeForm;
