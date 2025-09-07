"use client";
import { dummyCategories } from "@/data/category/categoryData";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Card } from "../ui/card";
import { Tilt } from "../motion-primitives/tilt";
import { TextEffect } from "../motion-primitives/text-effect";
import { TextShimmer } from "../motion-primitives/text-shimmer";

const CategorySectionOne = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`shop?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 bg-slate-300 dark:bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4 md:px-8">
        {dummyCategories.map((category, inx) => (
          <Tilt
            key={inx}
            rotationFactor={18} // max tilt angle
            isRevese
            springOptions={{ stiffness: 250, damping: 15 }} // fast spring
          >
            <Card
              onClick={() => handleCategoryClick(category.name)}
              className="p-4 rounded-lg shadow-md w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div className="relative w-[8rem] h-[8rem]">
                <Image
                  className="object-cover"
                  src={category.image}
                  fill
                  alt={category.name}
                />
              </div>

              <div className="text-center mt-2 space-y-1">
                {/* Category Name with Shimmer */}
                <TextShimmer
                 className="text-xl font-bold" duration={1.5}
                >
                  {category.name}
                </TextShimmer>

                {/* Category Description with per-character effect */}
                <TextEffect
                  per="char"
                  preset="fade"
                  className="text-gray-500 dark:text-white text-sm"
                >
                  {category.description}
                </TextEffect>
              </div>
            </Card>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default CategorySectionOne;
