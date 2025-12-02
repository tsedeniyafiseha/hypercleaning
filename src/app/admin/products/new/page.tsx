"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function NewProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
    discountAmount: "0",
    discountPercentage: "0",
    stock: "0",
    rating: "0",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchCategories();
    }
  }, [status, router]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        console.log("Categories loaded:", data);
        setCategories(data);
      } else {
        console.error("Failed to load categories:", res.status, await res.text());
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.imageUrl || !formData.price) {
      setError("Title, image URL and price are required.");
      return;
    }

    const body = {
      title: formData.title,
      description: formData.description || null,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      discountAmount: parseInt(formData.discountAmount) || 0,
      discountPercentage: parseInt(formData.discountPercentage) || 0,
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 0,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create product");
        return;
      }

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Create New Product</h1>
        <Link
          href="/admin/products"
          className="text-sm text-black/60 hover:text-black"
        >
          ← Back to Products
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Basic Information */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Basic Information</h2>
              <p className="text-sm text-gray-500">Essential product details</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Multi-Surface Cleaner 5L"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Clear, descriptive name including size/volume</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the product features, benefits, usage instructions, and safety information..."
                rows={5}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">Include key features, ingredients, and usage instructions</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all bg-white"
                required
              >
                <option value="">-- Select a category --</option>
                {categories.length === 0 ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
              <p className="text-xs text-gray-500 mt-1">Choose the most appropriate category for this product</p>
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Pricing & Inventory</h2>
              <p className="text-sm text-gray-500">Set pricing and stock levels</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Price (NZD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Regular selling price in NZD</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Available units in inventory</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="4.5"
                className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Product rating (optional)</p>
            </div>

            <div className="md:col-span-2 border-t border-gray-200 pt-5 mt-2">
              <h3 className="text-sm font-semibold mb-4 text-gray-700">Discount Options (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Discount Amount (NZD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.discountAmount}
                      onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Fixed discount amount</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Discount Percentage (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discountPercentage}
                      onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Percentage off regular price</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Product Image</h2>
              <p className="text-sm text-gray-500">Upload or provide image URL</p>
            </div>
          </div>
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          />
          <p className="text-xs text-gray-500 mt-3">Recommended: High-quality image, 800x800px or larger, white background</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Product...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Product
              </>
            )}
          </button>
          <Link
            href="/admin/products"
            className="px-10 py-4 border-2 border-black/10 rounded-full font-semibold hover:border-black/30 hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}


