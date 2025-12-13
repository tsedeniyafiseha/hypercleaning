"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type Category = {
  id: number;
  name: string;
  slug: string;
  _count: { Product: number };
};

type FilterSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

const FilterSection = ({ title, defaultOpen = true, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-semibold text-black">{title}</span>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-xl text-gray-400" />
        ) : (
          <MdKeyboardArrowDown className="text-xl text-gray-400" />
        )}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
};

const Filters = () => {
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

  return (
    <div className="space-y-0">
      <FilterSection title="Product Category" defaultOpen>
        <div className="space-y-1">
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/shop/category/${category.slug}`} 
                className="flex items-center justify-between py-1.5 text-sm text-gray-600 hover:text-black"
              >
                <span>{category.name}</span>
                <span className="text-xs text-gray-400">({category._count.Product})</span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-400">No categories available</p>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
            <span className="text-sm text-gray-600 group-hover:text-black">In Stock Only</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );
};

export default Filters;
