"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const categories = [
  { title: "Cleaning Chemicals", slug: "cleaning-chemicals", count: 24 },
  { title: "Bathroom Care", slug: "bathroom-care", count: 18 },
  { title: "Kitchen Care", slug: "kitchen-care", count: 15 },
  { title: "Floor Care", slug: "floor-care", count: 12 },
  { title: "Dispensers", slug: "dispensers", count: 10 },
  { title: "Gloves & PPE", slug: "gloves", count: 22 },
  { title: "Paper Products", slug: "paper-products", count: 14 },
];

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
  return (
    <div className="space-y-0">
      <FilterSection title="Product Category" defaultOpen>
        <div className="space-y-1">
          {categories.map((category, idx) => (
            <Link key={idx} href={`/shop/category/${category.slug}`} className="flex items-center justify-between py-1.5 text-sm text-gray-600 hover:text-black">
              <span>{category.title}</span>
              <span className="text-xs text-gray-400">({category.count})</span>
            </Link>
          ))}
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