"use client";

import React, { useEffect } from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import AddToCardSection from "./AddToCardSection";
import { trackViewItem } from "@/lib/analytics";

const brands = ["ECOLAB", "CLOROX", "LYSOL", "MR. CLEAN", "SWIFFER", "BIO-ZYME", "MATTHEWS", "LIVI"];
const getBrand = (id: number): string => brands[id % brands.length];

const Header = ({ data }: { data: Product }) => {
  const brand = getBrand(data.id);
  
  useEffect(() => {
    trackViewItem({
      item_id: data.id,
      item_name: data.title,
      price: data.price,
    });
  }, [data.id, data.title, data.price]);

  const discountedPrice = data.discount.percentage > 0
    ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
    : data.discount.amount > 0
    ? data.price - data.discount.amount
    : data.price;

  const hasDiscount = data.discount.percentage > 0 || data.discount.amount > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <PhotoSection data={data} />
      </div>
      <div>
        {/* Brand */}
        <p className="text-sky-500 text-sm font-bold mb-2">{brand}</p>
        
        {/* Title */}
        <h1 className={cn([integralCF.className, "text-2xl md:text-3xl mb-3 text-gray-900"])}>
          {data.title}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-200"
            size={20}
            readonly
          />
          <span className="text-gray-600 text-sm ml-2">
            {data.rating.toFixed(1)}/5
          </span>
        </div>
        
        {/* Stock Status */}
        <p className="text-sm text-gray-600 mb-4">
          {data.stock !== undefined && data.stock <= 0
            ? "Out of stock"
            : data.stock !== undefined && data.stock <= 5
            ? `Only ${data.stock} left in stock`
            : "In stock"}
        </p>
        
        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          {hasDiscount && (
            <span className="text-gray-400 text-lg line-through">${data.price.toFixed(2)} NZD</span>
          )}
          <span className="text-green-600 font-bold text-2xl">
            ${discountedPrice.toFixed(2)} NZD
          </span>
          {hasDiscount && (
            <span className="bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{data.discount.percentage > 0 ? `${data.discount.percentage}%` : `$${data.discount.amount}`}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-6">
          Professional-grade cleaning solution designed for maximum effectiveness.
          Formulated with high-quality ingredients to deliver superior cleaning power
          while being safe for use in commercial and residential environments.
        </p>
        
        <hr className="border-t-gray-200 mb-6" />
        
        {/* Add to Cart */}
        <AddToCardSection data={data} />
      </div>
    </div>
  );
};

export default Header;