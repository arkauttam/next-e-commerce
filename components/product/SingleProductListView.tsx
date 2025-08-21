"use client";
import React from "react";
import RatingReview from "../others/RatingReview";
import Link from "next/link";
import Image from "next/image";
import AddToWishlistBtn from "../buttons/AddToWishlistBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import { Product } from "@/types";
import { calculateDiscount } from "@/lib/calculateDiscount";

const SingleProductListView = ({ product }: { product: Product }) => {
  const { category, discount, id, images, name, price, rating, reviews } =
    product;

  const discountPrice = calculateDiscount(price, discount);

  return (
    <Link
      href={`/shop/${id}`}
      className="group flex flex-col sm:flex-row items-stretch sm:items-start justify-between gap-4 sm:gap-6 relative p-4 md:p-6 rounded-xl border border-border shadow-[0px_3px_10px_rgba(0,0,0,0.1)] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.15)] transition-all duration-300"
    >
      {/* Product Image */}
      <div className="flex-shrink-0 w-full xs:w-64 sm:w-40 md:w-56 lg:w-64 h-48 xs:h-56 sm:h-40 md:h-48 lg:h-56 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-600 mx-auto sm:mx-0">
        <Image 
          src={images[0]} 
          alt={name} 
          fill 
          className="object-contain group-hover:scale-105 transition-transform duration-300" 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 256px"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 flex flex-col h-full">
        <p className="text-xs sm:text-sm text-[#1A8CFF] font-semibold mb-1">{category}</p>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold hover:text-gray-600 text-gray-700 dark:text-white line-clamp-2">
            {name}
          </h3>
        </div>
        
        <div className="mt-auto">
          <RatingReview rating={rating} review={reviews.length} />
          
          <div className="text-base sm:text-lg font-bold space-x-2 my-2 sm:my-3">
            {discount > 0 && (
              <span className="line-through text-muted-foreground">${price}</span>
            )}
            <span className="text-lg sm:text-xl font-bold text-green-500">
              ${discountPrice}
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 hidden xs:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis numquam
            consequatur, corporis magnam quibusdam quae minima quidem. Quis
            nostrum laboriosam libero culpa expedita a repellendus, officiis,
            saepe, deleniti quia reiciendis.
          </div>
          
          <div 
            className="flex flex-col md:flex-col lg:flex-row mt-4 items-stretch xs:items-center gap-2 w-full justify-end"
            onClick={(e) => e.preventDefault()}
          >
            <AddToWishlistBtn product={product} />
            <AddToCartBtn
              product={{ ...product, quantity: 1, selectedColor: "" }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProductListView;