"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { TextAnimate } from "@/components/ui/text-animate";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosPublic } from "@/services/axiosService";

interface BannerData {
  title: string;
  description: string;
  images: string[];
  button_text: string;
  discount_text: string;
  category: string;
}

const BannerTwo = () => {
  const router = useRouter();
  const [data, setData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axiosPublic.get("/banners/second-banners/");
        const result = res.data;
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]);
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  return (
    <section className="bg-gradient-to-b bg-gray-600 to-gray-200 dark:bg-gray-900">
      <div className="relative max-w-screen-xl mx-auto p-4 md:p-8 overflow-hidden flex flex-col-reverse lg:block">
        <div className="max-w-7xl mx-auto text-center lg:text-left">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                {loading ? (
                  <>
                    <Skeleton className="h-10 w-96 mb-3" />
                    <Skeleton className="h-4 w-80 mb-3" />
                    <Skeleton className="h-4 w-72 mb-6" />
                    <Skeleton className="h-12 w-40 rounded-full" />
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                      <TextAnimate
                        text={data?.title || ""}
                        className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block"
                      />
                      <TextAnimate
                        text={data?.discount_text || ""}
                        className="block text-blue-500 dark:text-blue-600 text-xl sm:text-3xl md:text-4xl"
                      />
                    </h1>

                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      {data?.description}
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md">
                        <Button
                          className="w-full flex items-center justify-center px-12 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                          onClick={() => router.push(`/shop?category=${data?.category}`)}
                        >
                          {data?.button_text || "Shop Now"}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
        <div className="w-full h-[20rem] lg:h-full lg:absolute lg:inset-y-0 lg:right-0 lg:top-15 lg:w-1/2">
          <div className="relative w-full h-full">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="w-80 h-80 rounded-md" />
              </div>
            ) : (
              <Image
                className="h-56 w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full"
                src="/images/banner/gaming-laptop.png"
                fill
                alt={data?.title || "banner"}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerTwo;
