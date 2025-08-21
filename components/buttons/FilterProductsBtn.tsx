"use client";
import React, { Suspense } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import FilterProducts from "../products/FilterProducts";
import { Filter } from "lucide-react";
import Loader from "../others/Loader";
import { FaSliders } from "react-icons/fa6";

const FilterProductsBtn = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="text-lg flex items-center gap-2 bg-[#154477] rounded-md dark:bg-slate-800 py-2 px-6 text-white">
          <FaSliders className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <Suspense fallback={<Loader />}>
          <FilterProducts />
        </Suspense>
      </SheetContent>
    </Sheet>
  );
};

export default FilterProductsBtn;
