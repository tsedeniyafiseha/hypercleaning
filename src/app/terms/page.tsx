import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Hyper Cleaning Supplies",
  description: "Terms of Service for Hyper Cleaning Supplies e-commerce platform.",
};

export default function TermsPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using Hyper Cleaning Supplies website and services, you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on Hyper Cleaning Supplies website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Products and Pricing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to provide accurate product descriptions and pricing. However, we reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Correct any errors in pricing or product information</li>
                <li>Refuse or cancel orders for products listed at incorrect prices</li>
                <li>Limit quantities purchased per person or per order</li>
                <li>Discontinue any product at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Orders and Payment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you place an order, you are making an offer to purchase products. We reserve the right to accept or reject your order. 
                Payment must be received before we ship your order. We accept payment via credit card through our secure payment processor.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Shipping and Delivery</h2>
              <p className="text-gray-600 leading-relaxed">
                Shipping costs and delivery times are provided at checkout. We are not responsible for delays caused by shipping carriers 
                or customs. Risk of loss and title for products pass to you upon delivery to the carrier.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Returns and Refunds</h2>
              <p className="text-gray-600 leading-relaxed">
                Please see our Return Policy for detailed information about returns and refunds. We reserve the right to refuse returns 
                that do not meet our return policy requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur 
                under your account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Keep your account information updated</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may not use our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                In no event shall Hyper Cleaning Supplies, its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting 
                the new Terms of Service on this page. Your continued use of our services after such changes constitutes acceptance 
                of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Email: info@hyperclean.co.nz<br />
                Phone: 08002 420 15
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}

