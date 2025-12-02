"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Bathroom Care",
    url: "/shop/category/bathroom-care",
    description: "Toilet cleaners & sanitizers",
    image: "/images/products/cleaner2.jpg",
    bgColor: "bg-cyan-500",
  },
  {
    title: "Kitchen Care",
    url: "/shop/category/kitchen-care",
    description: "Degreasers & dish soap",
    image: "/images/products/oxiclean.jpg",
    bgColor: "bg-orange-500",
  },
  {
    title: "Floor Care",
    url: "/shop/category/floor-care",
    description: "Mops & floor cleaners",
    image: "/images/products/dete4.webp",
    bgColor: "bg-green-500",
  },
  {
    title: "Dispensers",
    url: "/shop/category/dispensers",
    description: "Soap & paper dispensers",
    image: "/images/products/powder.jpg",
    bgColor: "bg-purple-500",
  },
];

const DressStyle = () => {
  return (
    <div className="px-4 xl:px-0 bg-white py-12">
      <section className="max-w-frame mx-auto bg-gray-50 px-6 pb-8 pt-10 md:p-10 rounded-2xl border border-gray-100">
        <motion.h2
          initial={{ y: "30px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn([
            integralCF.className,
            "text-2xl md:text-3xl mb-8 text-center text-black",
          ])}
        >
          Featured Categories
        </motion.h2>
        <motion.div
          initial={{ y: "30px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.url}
              className={cn(
                "group rounded-xl p-5 text-left h-[160px] flex items-center justify-between overflow-hidden transition-transform hover:scale-[1.02]",
                category.bgColor
              )}
            >
              <div className="flex-1 z-10">
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-1 bg-yellow-500 text-black text-sm font-semibold px-4 py-1.5 rounded">
                  Shop Now
                </span>
              </div>
              <div className="w-24 h-24 relative flex-shrink-0">
                <div className="absolute inset-0 bg-white/20 rounded-lg" />
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="96px"
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;