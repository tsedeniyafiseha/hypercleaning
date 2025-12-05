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
    excerpt: "From all-purpose cleaners to specialized disinfectants, learn which cleaning chemicals are essential for maintaining a safe, hygienic workplace in New Zealand.",
    date: "December 1, 2024",
    category: "Guides",
    slug: "essential-cleaning-chemicals",
  },
  {
    id: 2,
    title: "Complete Guide to Floor Care: Products and Techniques",
    excerpt: "Different floor surfaces require different care. Discover the best products and methods for vinyl, tile, carpet, and hardwood floors to extend their lifespan.",
    date: "November 28, 2024",
    category: "Tips",
    slug: "floor-care-guide",
  },
  {
    id: 3,
    title: "Understanding Disinfectants: What Works Against Viruses and Bacteria",
    excerpt: "Not all disinfectants are created equal. Learn about contact times, active ingredients, and which products meet New Zealand health standards.",
    date: "November 25, 2024",
    category: "Safety",
    slug: "understanding-disinfectants",
  },
  {
    id: 4,
    title: "Green Cleaning: Eco-Friendly Products That Actually Work",
    excerpt: "Sustainable cleaning doesn't mean compromising on effectiveness. Explore environmentally friendly options that deliver professional results.",
    date: "November 20, 2024",
    category: "Sustainability",
    slug: "green-cleaning-guide",
  },
  {
    id: 5,
    title: "Kitchen Hygiene: Commercial Cleaning Standards and Best Practices",
    excerpt: "Food safety starts with proper cleaning. Learn about HACCP-compliant cleaning procedures and the right products for commercial kitchens.",
    date: "November 15, 2024",
    category: "Commercial",
    slug: "kitchen-hygiene-standards",
  },
  {
    id: 6,
    title: "The Complete Guide to Bathroom Cleaning and Sanitization",
    excerpt: "Bathrooms require specialized attention. Discover effective techniques for removing limescale, preventing mold, and maintaining hygiene in high-traffic facilities.",
    date: "November 10, 2024",
    category: "Guides",
    slug: "bathroom-cleaning-guide",
  },
  {
    id: 7,
    title: "Choosing the Right PPE for Cleaning Tasks",
    excerpt: "Protect your team with proper personal protective equipment. Learn which gloves, masks, and protective gear are needed for different cleaning chemicals.",
    date: "November 5, 2024",
    category: "Safety",
    slug: "ppe-selection-guide",
  },
  {
    id: 8,
    title: "Cost-Effective Cleaning: Dilution Ratios and Product Efficiency",
    excerpt: "Save money without sacrificing quality. Master proper dilution ratios and learn how to maximize the efficiency of your cleaning supplies.",
    date: "October 30, 2024",
    category: "Tips",
    slug: "cost-effective-cleaning",
  },
  {
    id: 9,
    title: "Preventing Cross-Contamination in Multi-Use Facilities",
    excerpt: "Color-coded systems, proper equipment storage, and cleaning protocols that prevent the spread of germs between different areas.",
    date: "October 25, 2024",
    category: "Safety",
    slug: "preventing-cross-contamination",
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
                    <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-sky-500 hover:text-sky-600">
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
