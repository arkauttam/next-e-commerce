"use client";
import React, { useEffect, useState } from "react";
import CartItemsDetails from "./CartItemsDetails";
import { Separator } from "../ui/separator";
import useCartStore from "@/store/cartStore";
import { Button } from "../ui/button";
import Loader from "../others/Loader";
import { formatPrice } from "@/lib/formatPrice";
import { Card } from "../ui/card";

const OrderSummaryForCheckout = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { getTotalPrice, getTax, getShippingFee, getTotalAmount } =
    useCartStore();

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <Card className="p-4 dark:bg-slate-700">
      {/* ordered items details */}
      <div>
        <h2 className="text-lg font-semibold text-slate-700 dark:text-white">Order Items</h2>
        <CartItemsDetails />
        <Separator className="dark:bg-white/50 mb-2" />
      </div>

      {/* order summary for order place */}
      <div className="lg:px-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
          <span className="text-gray-900 dark:text-white">
            ₹{formatPrice(getTotalPrice())}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Shipping:</span>
          <span className="text-gray-900 dark:text-white">
            ₹{formatPrice(getShippingFee())}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tax:</span>
          <span className="text-gray-900 dark:text-white">
            ₹{formatPrice(getTax())}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            ₹{formatPrice(getTotalAmount())}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummaryForCheckout;
