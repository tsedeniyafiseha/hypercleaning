"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type Category = {
  id: number;
  name: string;
  slug: string;
  _count: { Product: number };
};

type SectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

const Section = ({ title, defaultOpen = false, children }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left">
        <span className="font-bold text-gray-900 text-base">{title}</span>
        {isOpen ? <MdKeyboardArrowUp className="text-xl text-gray-500" /> : <MdKeyboardArrowDown className="text-xl text-gray-500" />}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
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
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 sticky top-24">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </h3>

        <Section title="Product Category" defaultOpen>
          <div className="space-y-1.5">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop/category/${category.slug}`}
                  className="block py-2 text-sm text-gray-700 hover:text-sky-600 font-medium transition-colors hover:pl-2"
                >
                  {category.name}
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-400">No categories available</p>
            )}
          </div>
        </Section>

        <Section title="Availability">
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500 cursor-pointer" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500 cursor-pointer" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">Ships in 24hrs</span>
            </label>
          </div>
        </Section>
      </div>
    </aside>
  );
};

export default Sidebar;
