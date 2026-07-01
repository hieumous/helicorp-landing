"use client";

import { ProductActions } from "@/components/shop/product-actions";
import { defaultProduct, localizeProduct } from "@/lib/products";
import { useTranslations } from "@/hooks/use-translations";

export function HeroShopCta() {
  const { locale } = useTranslations();
  const product = localizeProduct(defaultProduct, locale);

  return (
    <div className="mt-6 flex justify-center lg:justify-start">
      <ProductActions product={product} layout="row" />
    </div>
  );
}
