"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";

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

const getProductImage = (id: number): string => productImages[id % productImages.length];

const PhotoSection = ({ data }: { data: Product }) => {
  // Use actual product image from database, fallback to placeholder
  const productImage = data.srcUrl || getProductImage(data.id);
  const [selected, setSelected] = useState<string>(productImage);
  
  // Use gallery from database if available, otherwise use main image
  const gallery = data.gallery && data.gallery.length > 0 
    ? data.gallery 
    : [productImage, productImage, productImage];

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
      <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center">
        {gallery.map((photo, index) => (
          <button
            key={index}
            type="button"
            className="bg-[#F0EEED] rounded-[13px] xl:rounded-[20px] w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden"
            onClick={() => setSelected(photo)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              className="rounded-md w-full h-full object-contain p-2 hover:scale-110 transition-all duration-500"
              alt={data.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = getProductImage(data.id);
              }}
            />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={selected}
          className="rounded-md w-full h-full object-contain p-8 hover:scale-110 transition-all duration-500"
          alt={data.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = getProductImage(data.id);
          }}
        />
      </div>
    </div>
  );
};

export default PhotoSection;
