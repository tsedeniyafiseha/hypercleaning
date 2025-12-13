import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Hyper Cleaning",
  description: "Read our terms and conditions for using Hyper Cleaning services and purchasing products.",
};

export default function TermsPage() {
  return (
    <main className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-16">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Please read these terms carefully before using our services or making a purchase.
          </p>
        </div>
      </div>

      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                {["Introduction", "Orders & Payment", "Pricing", "Delivery", "Returns", "Liability", "Contact"].map((item, idx) => (
                  <a key={idx} href={`#section-${idx + 1}`} className="block text-sm text-gray-600 hover:text-sky-600 py-1 transition-colors">
                    {idx + 1}. {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <p className="text-sm text-gray-500 bg-sky-50 border border-sky-200 rounded-lg p-4">
              <span className="font-semibold">Last updated:</span> December 2024
            </p>

            <section id="section-1" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-xl">1</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Welcome to Hyper Cleaning Supplies. By accessing our website and purchasing our products, 
                    you agree to be bound by these Terms and Conditions. We are committed to providing 
                    high-quality cleaning supplies and materials for both commercial and residential use 
                    in Christchurch.
                  </p>
                </div>
              </div>
            </section>

            <section id="section-2" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-xl">2</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Orders & Payment</h2>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>All orders are subject to availability and confirmation of the order price</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>We accept Visa, Mastercard, PayPal, Apple Pay, and Google Pay</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Payment must be received in full before orders are dispatched</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Order confirmation will be sent to your registered email address</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="section-3" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-xl">3</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pricing</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    All prices displayed on our website are in New Zealand Dollars (NZD) and include GST 
                    where applicable. We reserve the right to modify prices at any time without prior notice.
                  </p>
                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <p className="text-sky-800 text-sm">
                      <strong>Note:</strong> Prices at checkout are final. Any promotional discounts will be 
                      applied automatically if applicable.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="section-4" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-xl">4</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delivery</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We deliver exclusively within the Christchurch area. Delivery times are estimates and may vary 
                    based on location and product availability. We are not responsible for delays caused by 
                    circumstances beyond our control.
                  </p>
                  <Link href="/delivery" className="inline-flex items-center gap-2 mt-4 text-sky-600 hover:text-sky-700 font-medium">
                    View full delivery details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

            <section id="section-5" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-xl">5</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns & Refunds</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We want you to be completely satisfied with your purchase. If you're not happy, 
                    please review our returns policy for information on how to return products.
                  </p>
                  <Link href="/returns" className="inline-flex items-center gap-2 mt-4 text-sky-600 hover:text-sky-700 font-medium">
                    View returns policy
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

            <section id="section-6" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-xl">6</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To the fullest extent permitted by New Zealand law, Hyper Cleaning Supplies shall not 
                    be liable for any indirect, incidental, special, consequential, or punitive damages 
                    arising from your use of our products or services.
                  </p>
                </div>
              </div>
            </section>

            <section id="section-7" className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-4">Have Questions?</h2>
              <p className="text-sky-100 mb-6">
                If you have any questions about these Terms & Conditions, our team is here to help.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-full font-medium hover:bg-sky-50 transition-colors">
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </section>
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
