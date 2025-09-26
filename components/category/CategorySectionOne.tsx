"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "../ui/card";
import { Tilt } from "../motion-primitives/tilt";
import { TextEffect } from "../motion-primitives/text-effect";
import { TextShimmer } from "../motion-primitives/text-shimmer";
import { axiosPublic } from "@/services/axiosService";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Skeleton Loader
const CategorySkeleton = () => {
  return (
    <Card className="p-4 rounded-lg shadow-md w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="relative w-[8rem] h-[8rem] bg-gray-300 dark:bg-gray-700 rounded-md" />
      <div className="text-center mt-2 space-y-2 w-full">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto" />
      </div>
    </Card>
  );
};

const CategorySectionOne = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`shop?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosPublic.get("/category/");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-slate-300 dark:bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4 md:px-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CategorySkeleton key={i} />)
          : categories.map((category) => (
            <Tilt
              key={category.id}
              rotationFactor={18}
              isRevese
              springOptions={{ stiffness: 250, damping: 15 }}
            >
              <Card
                onClick={() => handleCategoryClick(category.name)}
                className="p-4 rounded-lg shadow-md w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <div className="relative w-[8rem] h-[8rem]">
                  <Image
                    className="object-cover rounded-md"
                    src={`${category.image || "/dummy.jpg"}`}
                    fill
                    alt={category.name}
                  />
                </div>

                <div className="text-center mt-2 space-y-1">
                  <TextShimmer className="text-xl font-bold" duration={1.5}>
                    {category.name}
                  </TextShimmer>

                  {/* Tooltip with truncated text */}
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TextEffect
                          per="char"
                          preset="fade"
                          className="text-gray-500 dark:text-white text-sm line-clamp-2"
                        >
                          {category.description}
                        </TextEffect>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-sm leading-relaxed">
                        {category.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Card>
            </Tilt>
          ))}
      </div>
    </section>
  );
};

export default CategorySectionOne;
