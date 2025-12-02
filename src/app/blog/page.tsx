import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog | Hyper Cleaning Supplies",
  description: "Tips, guides, and news about professional cleaning supplies and best practices.",
};

const blogPosts = [
  {
    id: 1,
    title: "Essential Cleaning Chemicals Every Business Needs",
    excerpt: "Discover the must-have cleaning chemicals that will keep your business spotless and hygienic.",
    date: "November 20, 2025",
    category: "Guides",
  },
  {
    id: 2,
    title: "How to Choose the Right Floor Care Products",
    excerpt: "Learn about different floor types and the best cleaning products for each surface.",
    date: "November 15, 2025",
    category: "Tips",
  },
  {
    id: 3,
    title: "The Importance of PPE in Professional Cleaning",
    excerpt: "Understanding why proper protective equipment is crucial for cleaning professionals.",
    date: "November 10, 2025",
    category: "Safety",
  },
];

export default function BlogPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600 mb-8">Tips, guides, and news about professional cleaning</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <span className="text-xs font-semibold text-sky-500 uppercase">{post.category}</span>
                  <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <Link href="#" className="text-sm font-medium text-sky-500 hover:text-sky-600">
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
