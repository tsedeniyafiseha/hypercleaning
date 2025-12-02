"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const heroSlides = [
  {
    image: "/images/hero1.jpg",
    title: "Low Noise Acrylic Packaging Tape",
    subtitle: "Noise reduction design",
  },
  {
    image: "/images/hero2.jpg",
    title: "Professional Cleaning Solutions",
    subtitle: "Industrial grade quality",
  },
  {
    image: "/images/hero3.jpg",
    title: "Premium Dispensers",
    subtitle: "Efficient and reliable",
  },
];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white py-6">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Hero - Carousel */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden min-h-[450px] bg-gradient-to-r from-amber-50 via-orange-50 to-white border-2 border-gray-200 shadow-lg">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Image on right side - smaller and blended */}
                <div className="absolute right-0 top-0 w-1/2 h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-right"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-orange-50/60 to-transparent" />
                </div>

                {/* Content on left */}
                <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12 max-w-lg">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-gray-600 text-lg mb-2">{slide.subtitle}</p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Specialty brushes and mops
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Durable construction
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Durable materials
                    </li>
                  </ul>
                  
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center w-fit bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded transition-all"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - 2 Cards */}
          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="relative rounded-2xl overflow-hidden h-[217px] bg-gradient-to-r from-white to-sky-50 border-2 border-gray-200 shadow-lg">
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <Image src="/images/products/cleaner1.jpg" alt="Chemicals" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white/60" />
              </div>
              <div className="relative z-10 p-5 h-full flex flex-col justify-center">
                <p className="text-gray-500 text-xs mb-1">For Superior Results</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Chemicals</h3>
                <Link href="/shop/category/cleaning-chemicals" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded text-sm w-fit">
                  Shop now
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-2xl overflow-hidden h-[217px] bg-gradient-to-r from-white to-cyan-50 border-2 border-gray-200 shadow-lg">
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <Image src="/images/products/gloves.jpg" alt="Gloves" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white/60" />
              </div>
              <div className="relative z-10 p-5 h-full flex flex-col justify-center">
                <p className="text-gray-500 text-xs mb-1">Superior Protection and Durability</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">NITRILE GLOVES</h3>
                <Link href="/shop/category/gloves" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded text-sm w-fit">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;