import React from "react";
import { Truck, RefreshCcw, DollarSign, Users } from "lucide-react";
import { Card } from "../ui/card";
import { TextAnimate } from "../magicui/text-animate";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "Enjoy free shipping on all orders with little minimum purchase required.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description:
      "Return any item within 30 days for a full refund, no questions asked.",
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    description:
      "Shop with confidence knowing you're getting the best prices guaranteed.",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description:
      "Our customer support team is available round the clock to assist you.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
          <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold text-gray-600 dark:text-white border-l-4 p-2 border-l-rose-500">
           <TextAnimate animation="slideUp" by="word">
             Discover Our Advantages
           </TextAnimate>
           
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow duration-300 dark:bg-gray-600 cursor-pointer"
              >
                <Icon size={48} className="text-[#1A8CFF]" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

