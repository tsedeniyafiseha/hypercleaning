"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
};

const productImages = [
  "/images/products/cleaner1.jpg",
  "/images/products/cleaner2.jpg",
  "/images/products/detergent.jpg",
  "/images/products/gloves.jpg",
  "/images/products/oxiclean.jpg",
  "/images/products/powder.jpg",
  "/images/products/dete3.webp",
  "/images/products/dete4.webp",
];

const brands = ["ECOLAB", "CLOROX", "LYSOL", "MR. CLEAN", "SWIFFER", "BIO-ZYME", "MATTHEWS", "LIVI"];

const getProductImage = (id: number): string => productImages[id % productImages.length];
const getBrand = (id: number): string => brands[id % brands.length];

const ProductCard = ({ data }: ProductCardProps) => {
  const productUrl = `/shop/product/${data.id}/${data.title.split(" ").join("-")}`;
  const productImage = data.srcUrl || getProductImage(data.id); // Use actual image URL from database
  const brand = getBrand(data.id);

  const discountedPrice = data.discount.percentage > 0
    ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
    : data.discount.amount > 0
    ? data.price - data.discount.amount
    : data.price;

  const hasDiscount = data.discount.percentage > 0 || data.discount.amount > 0;

  return (
    <Link href={productUrl} className="group block">
      {/* Image */}
      <div className="relative bg-white aspect-square mb-4 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage}
          alt={data.title}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to placeholder if external image fails
            (e.target as HTMLImageElement).src = getProductImage(data.id);
          }}
        />
        {/* Wishlist */}
        <button className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{data.discount.percentage > 0 ? `${data.discount.percentage}%` : `$${data.discount.amount}`}
          </span>
        )}
      </div>

      {/* Brand */}
      <p className="text-sky-500 text-xs font-semibold mb-1">{brand}</p>

      {/* Title */}
      <h3 className="text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-sky-600 transition-colors">
        {data.title}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2 flex-wrap">
        {hasDiscount && (
          <span className="text-gray-400 text-sm line-through">${data.price.toFixed(2)} NZD</span>
        )}
        <span className="text-green-600 font-bold">
          ${discountedPrice.toFixed(2)} NZD
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;