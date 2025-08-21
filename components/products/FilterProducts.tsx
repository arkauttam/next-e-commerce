"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { brandsData } from "@/data/brands/brandsdata";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { colors } from "@/data/products/productColor";
import { dummyCategories } from "@/data/category/categoryData";
import { LucideRefreshCcw, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FilterProducts = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [localPriceRange, setLocalPriceRange] = useState({ min: 10, max: 5000 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    colors: true,
    brands: true
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get initial values from URL
  const initialMin = searchParams.get("min") ? Number(searchParams.get("min")) : 10;
  const initialMax = searchParams.get("max") ? Number(searchParams.get("max")) : 5000;
  const initialCategory = searchParams.get("category");
  const initialColor = searchParams.get("color");
  const initialBrand = searchParams.get("brand");

  useEffect(() => {
    setLocalPriceRange({ min: initialMin, max: initialMax });
    setSelectedCategory(initialCategory as string);
    setSelectedColor(initialColor as string);
    setSelectedBrand(initialBrand as string);
  }, [initialMin, initialMax, initialCategory, initialColor, initialBrand]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateSearchParams = useCallback((newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${pathname}?${params}`);
  }, [searchParams, router, pathname]);

  const handlePriceRangeChange = (type: "min" | "max", value: number) => {
    if (type === "min") {
      const newMin = Math.min(value, localPriceRange.max - 1);
      setLocalPriceRange(prev => ({ ...prev, min: newMin }));
      updateSearchParams({ min: newMin.toString(), max: localPriceRange.max.toString() });
    } else {
      const newMax = Math.max(value, localPriceRange.min + 1);
      setLocalPriceRange(prev => ({ ...prev, max: newMax }));
      updateSearchParams({ min: localPriceRange.min.toString(), max: newMax.toString() });
    }
  };

  const handlePriceInputChange = (type: "min" | "max", value: number) => {
    handlePriceRangeChange(type, value);
  };

  const handleCategorySelection = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === selectedCategory) {
      newSearchParams.delete("category");
      setSelectedCategory("");
    } else {
      newSearchParams.set("category", category);
      setSelectedCategory(category);
    }
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleColorSelection = (color: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (color === selectedColor) {
      newSearchParams.delete("color");
      setSelectedColor("");
    } else {
      newSearchParams.set("color", color.split("-")[0]);
      setSelectedColor(color);
    }
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleBrandSelection = (brand: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (brand === selectedBrand) {
      newSearchParams.delete("brand");
      setSelectedBrand("");
    } else {
      newSearchParams.set("brand", brand);
      setSelectedBrand(brand);
    }
    router.push(`${pathname}?${newSearchParams}`);
  };

  const clearFilter = () => {
    setLocalPriceRange({ min: 10, max: 5000 });
    setSelectedCategory("");
    setSelectedColor("");
    setSelectedBrand("");
    router.push(`${pathname}?page=1`);
  };

  return (
    <aside className="w-80 space-y-1 py-5 shadow-[0px_5px_10px_rgba(0,0,0,0.2)] rounded-xl border border-border bg-white dark:bg-slate-700 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Filters</h1>
        <button
          onClick={clearFilter}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <LucideRefreshCcw className="h-4 w-4" />
          <span>Reset all</span>
        </button>
      </div>
      <Separator className="bg-gray-300" />

      {/* Price Filter */}
      <div className="space-y-1">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex justify-between items-center py-3 px-1 -mx-1 rounded-lg transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Price range</h3>
          {expandedSections.price ? (
            <ChevronUp className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4 space-y-4 px-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">Min</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-200">₹</span>
                      <Input
                        className="pl-8 h-10 dark:bg-slate-600"
                        value={localPriceRange.min}
                        min={0}
                        max={localPriceRange.max - 1}
                        type="number"
                        onChange={(e) => handlePriceInputChange("min", Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">Max</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-200">₹</span>
                      <Input
                        className="pl-8 h-10 dark:bg-slate-600"
                        min={localPriceRange.min + 1}
                        max={5000}
                        value={localPriceRange.max}
                        type="number"
                        onChange={(e) => handlePriceInputChange("max", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 px-2">
                  <div className="relative pt-1">
                    <div className="absolute w-full h-1 bg-gray-200 dark:bg-gray-400 rounded-full top-1/2 -translate-y-1/2"></div>
                    <div
                      className="absolute h-1 bg-blue-500 rounded-full top-1/2 -translate-y-1/2"
                      style={{
                        left: `${((localPriceRange.min - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        width: `${((localPriceRange.max - localPriceRange.min) / (maxPrice - minPrice)) * 100}%`,
                      }}
                    ></div>
                    <label htmlFor="price-min" className="sr-only">Price Minimum</label>
                    <input
                      type="range"
                      name="price-min"
                      id="price-min"
                      min={minPrice}
                      max={maxPrice}
                      value={localPriceRange.min}
                      onChange={(e) => handlePriceRangeChange("min", Number(e.target.value))}
                      className="thumb absolute left-0 z-[3] h-0 w-full outline-none cursor-pointer"
                    />
                    <label htmlFor="price-max" className="sr-only">Price Maximum</label>
                    <input
                      type="range"
                      name="price-max"
                      id="price-max"
                      min={minPrice}
                      max={maxPrice}
                      value={localPriceRange.max}
                      onChange={(e) => handlePriceRangeChange("max", Number(e.target.value))}
                      className="thumb absolute left-0 z-[3] h-0 w-full outline-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      ₹{localPriceRange.min.toLocaleString()}
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      ₹{localPriceRange.max.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Separator className="dark:bg-gray-600 bg-gray-200" />
      </div>

      {/* Categories Filter */}
      <div className="space-y-1">
        <button
          onClick={() => toggleSection("categories")}
          className="w-full flex justify-between items-center py-3 px-1 -mx-1 rounded-lg transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Categories</h3>
          {expandedSections.categories ? (
            <ChevronUp className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.categories && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4 grid grid-cols-2 gap-2 px-2 py-2">
                {dummyCategories.map((category) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelection(category.name)}
                    className={cn(
                      "px-3 py-2 text-sm rounded-lg border transition-all",
                      "hover:border-blue-400 dark:hover:border-blue-500",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900",
                      category.name === selectedCategory
                        ? "bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-400"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    )}
                    key={category.id}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Separator className="dark:bg-gray-600 bg-gray-200" />
      </div>

      {/* Colors Filter */}
      <div className="space-y-1">
        <button
          onClick={() => toggleSection("colors")}
          className="w-full flex justify-between items-center py-3 px-1 -mx-1 rounded-lg transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Colors</h3>
          {expandedSections.colors ? (
            <ChevronUp className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.colors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4 grid grid-cols-3 gap-2 px-2 py-2">
                {colors.map((color) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleColorSelection(color)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all",
                      "hover:border-blue-400 dark:hover:border-blue-500",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900",
                      color === selectedColor
                        ? "bg-blue-500/10 border-blue-500"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    )}
                    key={color}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border border-gray-200 dark:border-gray-600`}
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{color.split("-")[0]}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Separator className="bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Brands Filter */}
      <div className="space-y-1">
        <button
          onClick={() => toggleSection("brands")}
          className="w-full flex justify-between items-center py-3 px-1 -mx-1 rounded-lg transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Brands</h3>
          {expandedSections.brands ? (
            <ChevronUp className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 dark:text-gray-200 text-gray-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.brands && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4 grid grid-cols-2 gap-2 px-2 py-2">
                {brandsData.map((brand) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBrandSelection(brand)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm rounded-lg border transition-all",
                      "hover:border-blue-400 dark:hover:border-blue-500",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900",
                      brand === selectedBrand
                        ? "bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-400"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    )}
                    key={brand}
                  >
                    {brand}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default FilterProducts;