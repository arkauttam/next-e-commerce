'use client'

import React from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";
import { showToast } from "@/lib/showToast";
import { CartItem } from "@/types";

interface AddToCartBtnProps {
  product: CartItem;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Item Added To The Cart', product.images[0] as string, product.name);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="
        w-full
        px-4
        py-3
        sm:px-6 sm:py-4
        md:px-8 md:py-6
        rounded-full
        text-base
        sm:text-lg
        md:text-xl
        flex
        items-center
        justify-center
        gap-2
        sm:gap-3
        md:gap-4
        hover:ring-2
        ring-slate-500
        dark:bg-slate-300
        transition-all
        duration-300
      "
    >
      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      Add To Cart
    </Button>
  );
};

export default AddToCartBtn;
