"use client";
import { dummyCategories } from "@/data/category/categoryData";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Card } from "../ui/card";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto overflow-auto px-4 md:px-8">
        {dummyCategories.map((category) => (
          
            <Card
              onClick={() => handleCategoryClick(category.name)}
              className="p-4 rounded-lg shadow-md w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-pointer"
            >
              <div className="relative w-[8rem] h-[8rem]">
                <Image
                  className="object-cover"
                  src={category.image}
                  fill
                  alt={category.name}
                />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold hover:underline text-gray-600 dark:text-white">
                  {category.name}
                </p>
                <p className="text-gray-500 dark:text-white">
                  {category.description}
                </p>
              </div>
            </Card>
          
        ))}
      </div>
    </section>
  );
};

export default CategorySectionOne;
