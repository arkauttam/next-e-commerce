'use client'
import React, { useEffect, useState } from "react";
import CheckoutBtn from "../buttons/CheckoutBtn";
import useCartStore from "@/store/cartStore";
import Loader from "../others/Loader";
import { formatPrice } from "@/lib/formatPrice";
import { Card } from "../ui/card";

const OrderSummaryForCart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { getTotalPrice, getTax, getShippingFee, getTotalAmount } = useCartStore()

  if (!isMounted) {
    return <Loader />
  }

  return (
    <Card className="p-4 dark:bg-slate-700 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
          <span className="text-gray-900 dark:text-white">₹{formatPrice(getTotalPrice())}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Shipping:</span>
          <span className="text-gray-900 dark:text-white">₹{formatPrice(getShippingFee())}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tax:</span>
          <span className="text-gray-900 dark:text-white">₹{formatPrice(getTax())}</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            ₹{formatPrice(getTotalAmount())}
          </span>
        </div>
      </div>
      
      <div className="flex justify-center mt-auto">
        <CheckoutBtn />
      </div>
    </Card>
  );
};

export default OrderSummaryForCart;
