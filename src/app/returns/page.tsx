import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Hyper Cleaning Supplies",
  description: "Return and Refund Policy for Hyper Cleaning Supplies e-commerce platform.",
};

export default function ReturnsPage() {
  return (
    <main className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-16">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Returns & Refunds</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Your satisfaction is our priority. Easy returns within 30 days.
          </p>
        </div>
      </div>

      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        {/* Key Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "📦", title: "30 Days", desc: "Return window" },
            { icon: "💰", title: "Full Refund", desc: "Original payment" },
            { icon: "🔄", title: "Easy Exchange", desc: "Hassle-free" },
            { icon: "📞", title: "Support", desc: "We're here to help" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Return Policy */}
            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Return Policy</h2>
              </div>
              <p className="text-gray-600 mb-6">
                We want you to be completely satisfied with your purchase. If you're not happy, 
                you may return eligible items within 30 days of delivery for a full refund or exchange.
              </p>
              <div className="bg-sky-50 rounded-xl p-6 border border-sky-100">
                <h3 className="font-semibold text-gray-900 mb-3">To be eligible for a return:</h3>
                <ul className="space-y-2">
                  {[
                    "Item must be unused, unopened, and in original packaging",
                    "Item must be in the same condition as received",
                    "Original receipt or proof of purchase required",
                    "Return must be initiated within 30 days of delivery",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Non-Returnable Items */}
            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Non-Returnable Items</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Opened or used cleaning products",
                  "Items damaged by misuse",
                  "Items without original packaging",
                  "Custom or personalized items",
                  "Items purchased 30+ days ago",
                  "Gift cards",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Return */}
            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How to Initiate a Return</h2>
              </div>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Contact Us", desc: "Email info@hyperclean.co.nz with your order number" },
                  { step: 2, title: "Get RA Number", desc: "Receive your Return Authorization number" },
                  { step: 3, title: "Pack Securely", desc: "Package item in original packaging with RA number" },
                  { step: 4, title: "Ship It Back", desc: "Send to the address provided by our team" },
                  { step: 5, title: "Get Refund", desc: "Refund processed within 5-10 business days" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Refund Information */}
            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💵</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Refund Process</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
                  <p className="text-sm text-gray-600">5-10 business days after we receive your return</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                  <p className="text-sm text-gray-600">Refunded to original payment method</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Confirmation</h3>
                  <p className="text-sm text-gray-600">Email notification when refund is processed</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Bank Processing</h3>
                  <p className="text-sm text-gray-600">Additional 3-5 days for bank processing</p>
                </div>
              </div>
            </section>

            {/* Damaged Items */}
            <section className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📸</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Received a Damaged Item?</h2>
                  <p className="text-sky-100 mb-4">
                    Contact us within 48 hours with photos of the damage. We'll arrange a replacement 
                    or full refund and cover all shipping costs.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-sky-50 transition-colors">
                    Report Damage
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-3">Need Help with a Return?</h3>
                <p className="text-sky-100 text-sm mb-4">
                  Our customer service team is ready to assist you with any return questions.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-50 transition-colors w-full justify-center">
                  Contact Support
                </Link>
                <p className="text-sky-200 text-xs mt-4 text-center">
                  Mon-Fri 9:00 AM - 5:00 PM
                </p>
              </div>

              {/* Return Shipping Info */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Return Shipping</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sky-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">We cover shipping for our errors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sky-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Customer pays for preference returns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sky-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Use trackable shipping service</span>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link href="/faq" className="flex items-center gap-2 text-gray-600 hover:text-sky-600 py-2 transition-colors">
                    <span>❓</span> FAQ
                  </Link>
                  <Link href="/delivery" className="flex items-center gap-2 text-gray-600 hover:text-sky-600 py-2 transition-colors">
                    <span>🚚</span> Delivery Info
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 text-gray-600 hover:text-sky-600 py-2 transition-colors">
                    <span>📧</span> Contact Us
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
