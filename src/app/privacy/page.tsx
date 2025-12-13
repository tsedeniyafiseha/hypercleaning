import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Hyper Cleaning",
  description: "Learn how Hyper Cleaning collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-16">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Your privacy matters to us. Learn how we protect and handle your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "🔒", title: "Secure Data", desc: "256-bit encryption" },
            { icon: "🛡️", title: "Protected", desc: "GDPR compliant" },
            { icon: "🚫", title: "No Spam", desc: "We never sell data" },
            { icon: "✅", title: "Transparent", desc: "Clear policies" },
          ].map((badge, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <span className="text-3xl mb-2 block">{badge.icon}</span>
              <h3 className="font-semibold text-gray-900">{badge.title}</h3>
              <p className="text-sm text-gray-500">{badge.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
              <p className="text-sm text-sky-800">
                <span className="font-semibold">Last updated:</span> December 2024
              </p>
            </div>

            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
              </div>
              <p className="text-gray-600 mb-4">We collect information you provide directly to us when you:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Create an account",
                  "Make a purchase",
                  "Subscribe to newsletter",
                  "Contact customer support",
                  "Leave a product review",
                  "Participate in promotions",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                    <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Process Orders", desc: "To fulfill and deliver your purchases" },
                  { title: "Communication", desc: "Send order updates and respond to inquiries" },
                  { title: "Personalization", desc: "Customize your shopping experience" },
                  { title: "Improvement", desc: "Enhance our products and services" },
                  { title: "Security", desc: "Protect against fraud and unauthorized access" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Data Security</h2>
              </div>
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">🔐 Encryption</h3>
                  <p className="text-sm text-gray-600">All data transmitted using SSL/TLS encryption</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">🛡️ Secure Payments</h3>
                  <p className="text-sm text-gray-600">PCI-DSS compliant payment processing</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">🔍 Monitoring</h3>
                  <p className="text-sm text-gray-600">24/7 security monitoring and threat detection</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                  <h3 className="font-semibold text-gray-900 mb-2">📋 Access Control</h3>
                  <p className="text-sm text-gray-600">Strict employee access policies</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
              </div>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="space-y-3">
                {[
                  "Access your personal information",
                  "Correct inaccurate data",
                  "Request deletion of your data",
                  "Opt-out of marketing communications",
                  "Export your data in a portable format",
                ].map((right, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {right}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-3">Questions About Privacy?</h3>
                <p className="text-sky-100 text-sm mb-4">
                  Our team is here to help with any privacy-related concerns.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-50 transition-colors">
                  Contact Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link href="/terms" className="flex items-center gap-2 text-gray-600 hover:text-sky-600 py-2 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Terms & Conditions
                  </Link>
                  <Link href="/returns" className="flex items-center gap-2 text-gray-600 hover:text-sky-600 py-2 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                    </svg>
                    Returns Policy
                  </Link>
                  <Link href="/faq" className="flex items-center gap-2 text-gray-600 hover:text-sky-600 py-2 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FAQ
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
