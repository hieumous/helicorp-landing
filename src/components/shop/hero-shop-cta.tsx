"use client";

import { ProductActions } from "@/components/shop/product-actions";
import { defaultProduct } from "@/lib/products";

export function HeroShopCta() {
  return (
    <div className="mt-6 flex justify-center lg:justify-start">
      <ProductActions product={defaultProduct} layout="row" />
    </div>
  );
}
