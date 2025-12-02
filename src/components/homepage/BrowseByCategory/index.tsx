"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Cleaning Chemicals",
    slug: "cleaning-chemicals",
    image: "/images/products/cleaner1.jpg",
  },
  {
    name: "Bathroom Care",
    slug: "bathroom-care",
    image: "/images/products/cleaner2.jpg",
  },
  {
    name: "Kitchen Care",
    slug: "kitchen-care",
    image: "/images/products/oxiclean.jpg",
  },
  {
    name: "Floor Care",
    slug: "floor-care",
    image: "/images/products/dete3.webp",
  },
  {
    name: "Dispensers",
    slug: "dispensers",
    image: "/images/products/powder.jpg",
  },
  {
    name: "Gloves & PPE",
    slug: "gloves",
    image: "/images/products/gloves.jpg",
  },
];

const BrowseByCategory = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className={cn([integralCF.className, "text-2xl md:text-3xl text-black mb-2"])}>
              Shop By Category
            </h2>
            <p className="text-gray-500">Find exactly what you need</p>
          </div>
          <Link 
            href="/shop" 
            className="hidden md:flex items-center gap-2 text-black hover:text-yellow-600 font-medium transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/category/${category.slug}`}
              className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center transition-all duration-300"
            >
              {/* Image */}
              <div className="w-20 h-20 mx-auto mb-3 relative bg-white rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <h3 className="font-semibold text-gray-900 text-sm">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;