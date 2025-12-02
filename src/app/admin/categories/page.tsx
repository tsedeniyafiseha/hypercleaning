"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Category {
  id: number;
  name: string;
  slug: string;
  _count: { products: number };
}

export default function AdminCategoriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [error, setError] = useState("");

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
        setCategories(data);
      } else if (res.status === 401) {
        router.push("/");
      }
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const url = editingId
        ? `/api/admin/categories/${editingId}`
        : "/api/admin/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: "", slug: "" });
        fetchCategories();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save category");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, slug: category.slug });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete category");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (loading) {
    return (
      <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ name: "", slug: "" });
          }}
          className="px-4 py-2 bg-sky-500 text-white rounded-full text-sm font-medium hover:bg-sky-600"
        >
          Add Category
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {showForm && (
        <div className="bg-white border border-black/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Category" : "New Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                required
                className="w-full px-4 py-2 border border-black/10 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black/10 rounded-lg"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-sky-500 text-white rounded-full text-sm hover:bg-sky-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: "", slug: "" });
                }}
                className="px-4 py-2 border border-black/10 rounded-full text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border border-black/10 rounded-2xl p-5 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-black/60">
                {category.slug} • {category._count.products} products
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="px-4 py-2 border border-black/10 rounded-full text-sm hover:border-black/30"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="px-4 py-2 border border-red-200 text-red-600 rounded-full text-sm hover:border-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center py-12 text-black/60">
            No categories yet. Create your first category!
          </div>
        )}
      </div>
    </main>
  );
}
