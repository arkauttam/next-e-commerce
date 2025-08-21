import React, { Suspense } from "react";
import HeroBannerOne from "@/components/hero/HeroBannerOne";
import ProductsCollectionOne from "@/components/products/ProductsCollectionOne";
import NewsLetterTwo from "@/components/newsLetter/NewsLetterTwo";
import LatestBlogPosts from "@/components/blog/LatestBlogPosts";
import CategoriesCollection from "@/components/category/CategoriesCollection";
import TestimonialsSection from "@/components/others/Testimonials";
import BannerOne from "@/components/banners/BannerOne";
import BenefitsSection from "@/components/others/BenefitSection";
import Loader from "@/components/others/Loader";
import SpecialDeals from "@/components/banners/SpecialDeals";
import CategorySectionOne from "@/components/category/CategorySectionOne";
import BannerTwo from "@/components/banners/BannerTwo";

const HomePageOne = () => {
  return (
    <section className="overflow-hidden">
      <HeroBannerOne />
      <SpecialDeals />
      <Suspense fallback={<Loader />}>
        <CategorySectionOne />
      </Suspense>
      <ProductsCollectionOne />
      <BenefitsSection/>
      <BannerTwo />
      <TestimonialsSection/>
      <LatestBlogPosts />
    </section>
  );
};

export default HomePageOne;
