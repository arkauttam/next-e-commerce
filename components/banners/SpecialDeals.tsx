"use client";
import React from "react";
import Image from "next/image";
import Countdown from "react-countdown";
import { productsData } from "@/data/products/productsData";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { TextAnimate } from "../magicui/text-animate";
//import { ShinyButton } from "../magicui/shiny-button";
import { ShimmerButton } from "../magicui/shimmer-button";

const SpecialDeals = () => {
  const router = useRouter();
  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <h2 className="text-center text-3xl lg:text-5xl w-fit mx-auto  mb-12 p-2 font-bold border-l-4 border-rose-500 text-gray-700 dark:text-white">
          <TextAnimate animation="slideUp" by="word">
            Special Deals
          </TextAnimate>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productsData.slice(0, 4).map((deal) => (
            <Card
              key={deal.id}
              className="bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row items-center p-6 lg:p-4 gap-6"
            >
              <div className="relative w-full h-48 lg:w-40 lg:h-40  bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={deal.images[0]}
                  alt={deal.name}
                  fill
                  className="rounded-lg object-contain lg:object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow">
                {/* special deal countdown timer */}
                <Countdown
                  renderer={({ days, hours, minutes, seconds }) => {
                    return (
                      <div className="py-2 flex items-center gap-3">
                        <div>
                          <p className="text-2xl font-medium">
                            {days < 10 && "0"}
                            {days} :
                          </p>
                          <small>Days</small>
                        </div>
                        <div>
                          <p className="text-2xl font-medium">
                            {hours < 10 && "0"}
                            {hours} :
                          </p>
                          <small>Hours</small>
                        </div>
                        <div>
                          <p className="text-2xl font-medium">
                            {minutes < 10 && "0"}
                            {minutes} :
                          </p>
                          <small>Minutes</small>
                        </div>
                        <div>
                          <p className="text-2xl font-medium">
                            {seconds < 10 && "0"}
                            {seconds}
                          </p>
                          <small>Seconds</small>
                        </div>
                      </div>
                    );
                  }}
                  date={Date.now() + 7 * 24 * 60 * 60 * 200}
                />

                <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-white">
                  {deal.name.slice(0, 50)}...
                </h3>
                <div className="flex items-center justify-between gap-4 lg:gap-2">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <span className="text-muted-foreground text-sm line-through mr-2">
                      ₹{deal.price}
                    </span>
                    <span className="text-green-500 text-xl mx-1 font-semibold">
                      ₹{deal.price - deal.discount}
                    </span>
                    <span className="text-xs ml-1 text-rose-500 italic">
                      (₹{deal.discount} off)
                    </span>
                  </div>

                  <Button
                    onClick={() => router.push(`/shop/${deal.id}`)}
                    variant="secondary"
                  >
                    View Deal
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;
