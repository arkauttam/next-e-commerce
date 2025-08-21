
'use client'
import CartItemsDetails from "@/components/carts/CartItemsDetails";
import OrderSummaryForCart from "@/components/carts/OrderSummaryForCart";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const CartPage = () => {

  return (
    <section className="p-4 md:p-8  bg-white dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
          <BreadcrumbComponent links={["/cart"]} pageText="Shopping Cart" />
          <Separator className="dark:bg-white" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-4">
          {/* Cart Items - Takes full width on mobile, 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <Card className="p-4 md:p-6 dark:bg-slate-700 h-full">
              <CartItemsDetails />
            </Card>
          </div>

          {/* Order Summary - Takes full width on mobile, 1 column on xl screens */}
          <div className="xl:col-span-1">
            <OrderSummaryForCart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;