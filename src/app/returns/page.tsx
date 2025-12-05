import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Hyper Cleaning Supplies",
  description: "Return and Refund Policy for Hyper Cleaning Supplies e-commerce platform.",
};

export default function ReturnsPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Return & Refund Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Return Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We want you to be completely satisfied with your purchase. If you are not satisfied, you may return eligible items 
                within 30 days of delivery for a refund or exchange.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>To be eligible for a return:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>The item must be unused, unopened, and in its original packaging</li>
                <li>The item must be in the same condition as when you received it</li>
                <li>You must have the original receipt or proof of purchase</li>
                <li>The return must be initiated within 30 days of delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Non-Returnable Items</h2>
              <p className="text-gray-600 leading-relaxed mb-4">The following items cannot be returned:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Opened or used cleaning products</li>
                <li>Items damaged by misuse or normal wear and tear</li>
                <li>Items without original packaging</li>
                <li>Custom or personalized items</li>
                <li>Items purchased more than 30 days ago</li>
                <li>Gift cards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How to Initiate a Return</h2>
              <p className="text-gray-600 leading-relaxed mb-4">To initiate a return, please follow these steps:</p>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Contact our customer service team at info@hyperclean.co.nz or call +64 22 069 2139</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive a Return Authorization (RA) number</li>
                <li>Package the item securely in its original packaging</li>
                <li>Include the RA number and original receipt in the package</li>
                <li>Ship the item to the address provided by our customer service team</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Return Shipping</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Return shipping costs:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>If the return is due to our error (wrong item, defective product), we will cover return shipping costs</li>
                <li>If the return is for any other reason, you are responsible for return shipping costs</li>
                <li>We recommend using a trackable shipping service and purchasing shipping insurance</li>
                <li>We are not responsible for items lost or damaged during return shipping</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Refund Process</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Once we receive and inspect your returned item, we will process your refund:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Refunds will be issued to the original payment method</li>
                <li>Processing time: 5-10 business days after we receive the item</li>
                <li>You will receive an email confirmation when the refund is processed</li>
                <li>It may take additional time for the refund to appear in your account (depending on your bank or credit card company)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Refund Amount</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The refund amount will include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>The purchase price of the returned item(s)</li>
                <li>Original shipping costs (if the return is due to our error)</li>
                <li>Original shipping costs will NOT be refunded for returns due to customer preference</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Exchanges</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you need to exchange an item for a different size, color, or product:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Contact our customer service team to initiate an exchange</li>
                <li>Return the original item following the return process</li>
                <li>Place a new order for the desired item</li>
                <li>We will process a refund for the returned item once received</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Damaged or Defective Items</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you receive a damaged or defective item:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Contact us immediately (within 48 hours of delivery)</li>
                <li>Provide photos of the damage or defect</li>
                <li>We will arrange for a replacement or full refund</li>
                <li>We will cover all shipping costs for damaged/defective items</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Late or Missing Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you haven't received your refund yet:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Check your bank account or credit card statement</li>
                <li>Contact your bank or credit card company (processing may take time)</li>
                <li>Contact us at info@hyperclean.co.nz if you still haven't received your refund</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Sale Items</h2>
              <p className="text-gray-600 leading-relaxed">
                Sale items and clearance products are eligible for return within 30 days, subject to the same return policy conditions. 
                Refunds for sale items will be for the sale price paid.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about our Return & Refund Policy, please contact us at:
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Email: info@hyperclean.co.nz<br />
                Phone: +64 22 069 2139<br />
                Business Hours: Monday-Friday 9:00 AM - 5:00 PM
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}

