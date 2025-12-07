import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us | Hyper Cleaning Supplies",
  description: "Learn about Hyper Cleaning Supplies - your trusted partner for professional cleaning materials and supplies.",
};

export default function AboutPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hyper Cleaning Supplies is a leading provider of professional cleaning materials and supplies. 
                We specialize in delivering high-quality cleaning products to businesses and individuals across New Zealand.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With years of experience in the industry, we understand the importance of maintaining clean, 
                safe, and hygienic environments. Our extensive product range includes cleaning chemicals, 
                bathroom care, kitchen care, floor care products, dispensers, gloves, and paper products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide our customers with the best cleaning solutions at competitive prices, 
                backed by exceptional customer service and expert advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Wide range of professional cleaning products</li>
                <li>Competitive pricing and bulk discounts</li>
                <li>Fast and reliable delivery</li>
                <li>Expert customer support</li>
                <li>Quality guaranteed products</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                Have questions? Our team is here to help. Visit our contact page to get in touch.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
