import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | Hyper Cleaning",
  description: "Frequently asked questions about Hyper Cleaning products, orders, deliveries, and payments.",
};

const faqCategories = [
  {
    id: "account",
    title: "Account",
    icon: "👤",
    questions: [
      {
        q: "How do I create an account?",
        a: "Creating an account is easy! Click on the 'Sign In' button in the top navigation, then select 'Create Account'. Fill in your details including name, email, and password, and you're ready to start shopping with us.",
      },
      {
        q: "How do I reset my password?",
        a: "Click on 'Sign In', then 'Forgot Password'. Enter your registered email address and we'll send you a secure link to reset your password. The link expires after 24 hours for security.",
      },
      {
        q: "Can I update my account information?",
        a: "Yes! Log into your account and navigate to 'My Account' to update your personal information, shipping addresses, and communication preferences at any time.",
      },
      {
        q: "How do I delete my account?",
        a: "To delete your account, please contact our customer support team. We'll process your request and remove all personal data in accordance with our privacy policy.",
      },
    ],
  },
  {
    id: "deliveries",
    title: "Deliveries",
    icon: "🚚",
    questions: [
      {
        q: "Where do you deliver?",
        a: "We currently deliver exclusively within the Christchurch area. This allows us to provide fast, reliable service and maintain the quality our customers expect.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is dispatched, you'll receive an email with tracking information. You can also track orders from your account dashboard under 'My Orders'. Real-time updates are available for all shipments.",
      },
      {
        q: "Can I change my delivery address after ordering?",
        a: "Please contact us immediately if you need to change your delivery address. We can only make changes before the order is dispatched. Once shipped, the delivery address cannot be modified.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders",
    icon: "📦",
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse our products, add items to your cart, and proceed to checkout. You can checkout as a guest or create an account for faster future orders. We accept all major credit cards and PayPal.",
      },
      {
        q: "Can I cancel or modify my order?",
        a: "Please contact us immediately if you need to cancel or modify your order. We can only make changes before the order is processed, which typically happens within 1-2 hours of placing the order.",
      },
      {
        q: "What if an item is out of stock?",
        a: "If an item becomes unavailable after you've ordered, we'll contact you to offer alternatives or a full refund. You can also sign up for stock notifications on product pages.",
      },
      {
        q: "Do you offer bulk or wholesale orders?",
        a: "Yes! We offer competitive pricing for bulk orders. Contact our sales team for wholesale inquiries and we'll provide a custom quote based on your requirements.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    icon: "💳",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and Google Pay. All transactions are processed securely through our encrypted payment gateway.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely! All payments are processed through secure, PCI-DSS compliant systems with 256-bit SSL encryption. We never store your full card details on our servers.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-16">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Find quick answers to common questions about orders, delivery, payments, and more.
          </p>
        </div>
      </div>

      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {faqCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg hover:border-sky-200 transition-all group"
            >
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-semibold text-gray-900">{cat.title}</h3>
              <p className="text-sm text-gray-500">{cat.questions.length} questions</p>
            </a>
          ))}
        </div>

        {/* Search Suggestion */}
        <div className="bg-sky-50 rounded-2xl p-6 mb-12 border border-sky-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Can't find what you're looking for?</h3>
              <p className="text-gray-600 text-sm">
                Our customer support team is here to help.{" "}
                <Link href="/contact" className="text-sky-600 hover:underline font-medium">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="grid gap-4">
                {category.questions.map((item, idx) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="font-semibold text-gray-900 pr-4">{item.q}</h3>
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 group-open:bg-sky-100 transition-colors">
                        <svg
                          className="w-4 h-4 text-gray-600 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still Need Help */}
        <section className="mt-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <span className="text-5xl mb-4 block">💬</span>
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-sky-100 mb-8">
              Our friendly customer support team is available to help you with any questions or concerns. 
              We typically respond within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 px-8 py-3 rounded-full font-semibold hover:bg-sky-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </Link>
          </div>
        </section>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
