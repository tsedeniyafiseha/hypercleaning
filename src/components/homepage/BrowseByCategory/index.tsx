"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  _count: { Product: number };
};

const categoryImages: Record<string, string> = {
  "cleaning-chemicals": "/images/products/cleaner1.jpg",
  "bathroom-care": "/images/products/cleaner2.jpg",
  "kitchen-care": "/images/products/oxiclean.jpg",
  "floor-care": "/images/products/dete3.webp",
  "dispensers": "/images/products/powder.jpg",
  "gloves": "/images/products/gloves.jpg",
  "paper-products": "/images/products/detergent.jpg",
};

const getImage = (slug: string): string => {
  return categoryImages[slug] || "/images/products/cleaner1.jpg";
};

const BrowseByCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className={cn([integralCF.className, "text-2xl md:text-3xl text-black mb-2"])}>
                Shop By Category
              </h2>
              <p className="text-gray-500">Find exactly what you need</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
                <div className="w-20 h-20 mx-auto mb-3 bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded mx-auto w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

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
            className="hidden md:flex items-center gap-2 text-black hover:text-sky-600 font-medium transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`/shop/category/${category.slug}`}
              className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center transition-all duration-300"
            >
              {/* Image */}
              <div className="w-20 h-20 mx-auto mb-3 relative bg-white rounded-lg overflow-hidden">
                <Image
                  src={getImage(category.slug)}
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
