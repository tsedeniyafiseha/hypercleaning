"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InputGroup from "@/components/ui/input-group";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";

const categoriesData = [
  { title: "Cleaning Chemicals", slug: "cleaning-chemicals" },
  { title: "Bathroom Care", slug: "bathroom-care" },
  { title: "Kitchen Care", slug: "kitchen-care" },
  { title: "Floor Care", slug: "floor-care" },
  { title: "Window Care", slug: "window-care" },
  { title: "Dispensers", slug: "dispensers" },
  { title: "Gloves", slug: "gloves" },
  { title: "Paper Products", slug: "paper-products" },
];

const productTypesData = [
  { title: "Eco-Friendly", slug: "eco-friendly" },
  { title: "Industrial Strength", slug: "industrial" },
  { title: "Concentrated", slug: "concentrated" },
  { title: "Disinfectant", slug: "disinfectant" },
];

const AdvancedSearch = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    if (selectedType) {
      params.set("type", selectedType);
    }

    const queryString = params.toString();
    router.push(`/shop${queryString ? `?${queryString}` : ""}`);
    setIsOpen(false);
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);
  };

  const handleTypeClick = (slug: string) => {
    setSelectedType(selectedType === slug ? null : slug);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="hidden md:flex bg-[#F0F0F0] cursor-pointer">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
            readOnly
            onClick={() => setIsOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <form onSubmit={handleSearch} className="p-4">
          <div className="mb-4">
            <InputGroup className="bg-[#F0F0F0]">
              <InputGroup.Text>
                <Image
                  priority
                  src="/icons/search.svg"
                  height={20}
                  width={20}
                  alt="search"
                  className="min-w-5 min-h-5"
                />
              </InputGroup.Text>
              <InputGroup.Input
                type="search"
                name="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent placeholder:text-black/40"
                autoFocus
              />
            </InputGroup>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            <div>
              <h3 className="font-bold text-black text-base mb-2">Categories</h3>
              <div className="flex flex-col space-y-1">
                {categoriesData.map((category, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`flex items-center justify-between py-2 px-2 rounded text-sm transition-colors ${
                      selectedCategory === category.slug
                        ? "bg-sky-500 text-white"
                        : "text-black/60 hover:bg-gray-100"
                    }`}
                  >
                    {category.title}
                    <MdKeyboardArrowRight />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-black text-base mb-2">Product Type</h3>
              <div className="flex flex-col space-y-1">
                {productTypesData.map((type, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTypeClick(type.slug)}
                    className={`flex items-center justify-between py-2 px-2 rounded text-sm transition-colors ${
                      selectedType === type.slug
                        ? "bg-sky-500 text-white"
                        : "text-black/60 hover:bg-gray-100"
                    }`}
                  >
                    {type.title}
                    <MdKeyboardArrowRight />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-2.5 px-4 text-sm font-medium transition-all"
            >
              Search
            </button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AdvancedSearch;

