"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productsData } from "@/data/products/productsData";

import React, { useEffect, useState } from "react";
import SingleProductCartView from "../product/SingleProductCartView";
import { TextAnimate } from "../magicui/text-animate";
import { ShineBorder } from "@/components/magicui/shine-border";

const ProductsCollectionOne = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = productsData;

  if (!isMounted) {
    return null;
  }

  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
      <Tabs defaultValue="top-rated" className="w-full space-y-8 mx-0">
        {/* Header */}
        <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap w-full">
          <h2 className="text-3xl md:text-5xl font-semibold border-l-4 border-l-rose-500 p-2 text-gray-600 dark:text-white">
            <TextAnimate animation="scaleUp" by="word">
              Featured Products
            </TextAnimate>
          </h2>
          <TabsList className="font-semibold bg-transparent text-center">
            <TabsTrigger value="top-rated" className="md:text-xl">
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="most-popular" className="md:text-xl">
              Most Popular
            </TabsTrigger>
            <TabsTrigger value="new-items" className="md:text-xl">
              New Items
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Top Rated */}
        <TabsContent value="top-rated" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {data?.slice(0, 8)?.map((product) => (
              <ShineBorder
                key={product.id}
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={2}
                duration={6}
                className="rounded-xl"
              >
                <SingleProductCartView product={product} />
              </ShineBorder>
            ))}
          </div>
        </TabsContent>

        {/* Most Popular */}
        <TabsContent value="most-popular">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.slice(0, 8)?.map((product) => (
              <ShineBorder
                key={product.id}
                shineColor={["#FE8FB5", "#FFBE7B", "#A07CFE"]}
                borderWidth={2}
                duration={6}
                className="rounded-xl"
              >
                <SingleProductCartView product={product} />
              </ShineBorder>
            ))}
          </div>
        </TabsContent>

        {/* New Items */}
        <TabsContent value="new-items">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.slice(0, 8)?.map((product) => (
              <ShineBorder
                key={product.id}
                shineColor={["#FFBE7B", "#A07CFE", "#FE8FB5"]}
                borderWidth={2}
                duration={6}
                className="rounded-xl"
              >
                <SingleProductCartView product={product} />
              </ShineBorder>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductsCollectionOne;
