import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Hyper Cleaning Supplies",
  description: "Learn about Hyper Cleaning Supplies - your trusted partner for professional cleaning materials and supplies in Christchurch.",
};

export default function AboutPage() {
  return (
    <main className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-16">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Hyper Cleaning</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Your trusted partner for professional cleaning supplies in Christchurch.
          </p>
        </div>
      </div>

      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { number: "500+", label: "Products", icon: "📦" },
            { number: "1000+", label: "Happy Customers", icon: "😊" },
            { number: "Christchurch", label: "Local Delivery", icon: "🚚" },
            { number: "24/7", label: "Support", icon: "💬" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Who We Are */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                Christchurch's Trusted Cleaning Supply Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hyper Cleaning Supplies is a leading provider of professional cleaning materials and supplies. 
                We specialize in delivering high-quality cleaning products to businesses and individuals across Christchurch.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With years of experience in the industry, we understand the importance of maintaining clean, 
                safe, and hygienic environments. Our extensive product range includes cleaning chemicals, 
                bathroom care, kitchen care, floor care products, dispensers, gloves, and paper products.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Professional Grade", "Eco-Friendly Options", "Bulk Discounts"].map((tag, idx) => (
                  <span key={idx} className="bg-sky-50 text-sky-700 px-4 py-2 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <span className="text-8xl mb-4 block">🧹</span>
                <p className="text-sky-700 font-semibold">Professional Cleaning Solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16 bg-sky-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
              Empowering Clean Spaces Across Christchurch
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide our customers with the best cleaning solutions at competitive prices, 
              backed by exceptional customer service and expert advice. We believe that everyone 
              deserves access to professional-grade cleaning supplies that make maintaining 
              hygiene simple and effective.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              The Hyper Cleaning Difference
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏆",
                title: "Quality Products",
                desc: "We source only the best professional-grade cleaning supplies from trusted manufacturers.",
              },
              {
                icon: "💰",
                title: "Competitive Pricing",
                desc: "Get the best value with our competitive prices and bulk discount options for businesses.",
              },
              {
                icon: "🚀",
                title: "Fast Local Delivery",
                desc: "Quick and reliable delivery across Christchurch. Free shipping on orders over $100.",
              },
              {
                icon: "👨‍💼",
                title: "Expert Support",
                desc: "Our knowledgeable team is here to help you find the right products for your needs.",
              },
              {
                icon: "🔄",
                title: "Easy Returns",
                desc: "Not satisfied? Our hassle-free 30-day return policy has you covered.",
              },
              {
                icon: "🌿",
                title: "Eco Options",
                desc: "We offer environmentally friendly cleaning solutions for sustainable businesses.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <span className="text-8xl mb-4 block">💼</span>
                <p className="text-sky-700 font-semibold">Trusted by Businesses</p>
              </div>
            </div>
            <div>
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                What Drives Us Every Day
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Customer First", desc: "Your satisfaction is our top priority in everything we do." },
                  { title: "Quality Assurance", desc: "We never compromise on the quality of our products." },
                  { title: "Integrity", desc: "Honest pricing, transparent policies, and ethical business practices." },
                  { title: "Innovation", desc: "Continuously improving our products and services to serve you better." },
                ].map((value, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto">
            Browse our extensive range of professional cleaning supplies and discover why businesses 
            across Christchurch trust Hyper Cleaning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 px-8 py-3 rounded-full font-semibold hover:bg-sky-50 transition-colors">
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-700 transition-colors border border-sky-400">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
      <Footer showNewsletter={true} />
    </main>
  );
}
