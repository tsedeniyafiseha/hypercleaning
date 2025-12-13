"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  _count: { Product: number };
};

const categoryIcons: Record<string, string> = {
  "cleaning-chemicals": "🧪",
  "bathroom-care": "🧴",
  "kitchen-care": "🍽️",
  "floor-care": "🧹",
  "dispensers": "🧻",
  "gloves": "🧤",
  "paper-products": "📄",
};

const getIcon = (slug: string): string => {
  return categoryIcons[slug] || "📦";
};

const CategorySidebar = () => {
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
      <section className="bg-white py-8">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-sky-500 text-white px-6 py-4">
              <h3 className="font-bold text-lg flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Browse All Categories
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-8">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-sky-500 text-white px-6 py-4">
            <h3 className="font-bold text-lg flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Browse All Categories
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            {categories.slice(0, 8).map((category, index) => (
              <Link
                key={category.id}
                href={`/shop/category/${category.slug}`}
                className={`flex flex-col items-center gap-2 p-5 text-center hover:bg-sky-50 transition-colors border-b border-r border-gray-100 last:border-r-0`}
              >
                <span className="text-3xl">{getIcon(category.slug)}</span>
                <span className="text-gray-800 text-sm font-medium">{category.name}</span>
                <span className="text-gray-400 text-xs">{category._count.Product} products</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySidebar;
