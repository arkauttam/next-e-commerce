"use client"
import OrderSummaryForCheckout from "@/components/carts/OrderSummaryForCheckout";
import CheckoutForm from "@/components/forms/CheckoutForm";
import CouponCodeForm from "@/components/forms/CouponCodeForm";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import withAuth from "@/components/withAuth/withAuth";
import React from "react";

const CheckoutPage = () => {
  return (
    <section className="px-4 py-4 lg:px-16  bg-white dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-700 dark:text-white ">
            Checkout
          </h1>
          <p>Please fill out the address form if you haven&apos;t save it</p>
          <Separator className="dark:bg-white/50 mt-2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Shipping Address - Takes 8 columns on large screens, full width on smaller */}
          <div className="col-span-12 space-y-8 md:col-span-8 order-2 lg:order-1">
            <Card className="dark:bg-slate-700 p-4 md:p-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4 md:mb-6">
                Shipping Address
              </h2>
              <CheckoutForm />
            </Card>
          </div>

          {/* Order Summary - Takes 4 columns on large screens, full width on smaller */}
          <div className="col-span-12  space-y-8 md:col-span-4 order-1 lg:order-2">
            <OrderSummaryForCheckout />
            <CouponCodeForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default withAuth(CheckoutPage);