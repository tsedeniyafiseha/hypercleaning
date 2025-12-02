"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  stock: number;
  rating: number;
  discountAmount: number;
  discountPercentage: number;
  category: {
    id: number;
    name: string;
  } | null;
}

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

export default function ProductsList({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (e: React.MouseEvent, productId: number, productTitle: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Are you sure you want to delete "${productTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(productId);

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      // Refresh the page to show updated list
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 border border-black/10 rounded-2xl">
        <p className="text-black/60 mb-4">No products found yet.</p>
        <Link
          href="/admin/products/new"
          className="inline-block px-6 py-3 bg-sky-500 text-white rounded-full text-sm font-medium hover:bg-sky-600"
        >
          Create Your First Product
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {products.map((product) => {
        const hasDiscount = product.discountPercentage > 0 || product.discountAmount > 0;
        const discountedPrice = product.discountPercentage > 0
          ? Number(product.price) - (Number(product.price) * product.discountPercentage / 100)
          : Number(product.price) - product.discountAmount;

        return (
          <div
            key={product.id}
            className="border border-black/10 rounded-2xl p-5 hover:border-black/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <Link href={`/admin/products/${product.id}`} className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl || getProductImage(product.id)}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getProductImage(product.id);
                    }}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <Link href={`/admin/products/${product.id}`} className="flex-1 min-w-0">
                <h3 className="font-semibold text-black truncate">{product.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-black/60">
                  <span>ID: {product.id}</span>
                  <span>•</span>
                  <span>{product.category?.name ?? "No Category"}</span>
                  <span>•</span>
                  <span>Stock: {product.stock}</span>
                  <span>•</span>
                  <span>Rating: {product.rating.toFixed(1)}⭐</span>
                </div>
              </Link>

              {/* Pricing */}
              <div className="text-right flex-shrink-0">
                {hasDiscount ? (
                  <div>
                    <p className="text-sm text-black/50 line-through">
                      ${Number(product.price).toFixed(2)} NZD
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ${discountedPrice.toFixed(2)} NZD
                    </p>
                    <p className="text-xs text-sky-500 font-medium">
                      {product.discountPercentage > 0 
                        ? `-${product.discountPercentage}%` 
                        : `-${product.discountAmount}`}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold">
                    ${Number(product.price).toFixed(2)} NZD
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="p-2 hover:bg-sky-50 rounded-lg transition-colors"
                  title="Edit product"
                >
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button
                  onClick={(e) => handleDelete(e, product.id, product.title)}
                  disabled={deleting === product.id}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete product"
                >
                  {deleting === product.id ? (
                    <svg className="w-5 h-5 text-red-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
