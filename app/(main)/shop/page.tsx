import ShopPageOne from "@/components/pages/shop-pages/ShopPageOne";
import { SearchParams } from "@/types";
import React from "react";

function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div>
      <ShopPageOne searchParams={searchParams} />
    </div>
  );
}

export default ShopPage;
