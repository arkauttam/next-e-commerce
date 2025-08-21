
import ProductGallery from "@/components/product/ProductGallery";
import { productsData } from "@/data/products/productsData";
import React from "react";
import RelatedProducts from "@/components/products/RelatedProducts";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";

interface ProductIdPageProps {
  params: { productId: string };
}

const ProductIdPage = ({ params }: ProductIdPageProps) => {

  const product = productsData.find(
    (product) => product.id === Number(params.productId)
  );

  const relatedProducts = productsData.filter(
    (prod) => prod.category === product?.category
  );

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
      <div className="my-2">
        <BreadcrumbComponent links={["/shop"]} pageText={product?.name!} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <ProductGallery isInModal={false} images={product?.images!} />
        <ProductDetails product={product!} />
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductIdPage;
