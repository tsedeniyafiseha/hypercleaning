"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderData {
  id: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionId) {
      fetchOrderBySession();
    } else if (orderId) {
      fetchOrderById();
    } else {
      setLoading(false);
    }
  }, [sessionId, orderId]);

  const fetchOrderBySession = async () => {
    try {
      const res = await fetch(`/api/orders?sessionId=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        setError("Could not load order details");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async () => {
    try {
      const res = await fetch(`/api/orders?orderId=${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        setError("Could not load order details");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-frame mx-auto px-4 xl:px-0 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-black/60">Loading order details...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold mb-4">Request Pending!</h1>
          <p className="text-lg text-black/60 mb-2">
            Thank you for your order request. Your request is currently <span className="font-semibold text-yellow-600">pending</span>.
          </p>
          <p className="text-black/60">
            Our team will review your order and contact you shortly to confirm details and arrange payment.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {order && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Order Details */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-4">Order Details</h2>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-black/60">Order ID:</span>
                  <span className="font-medium">#{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Status:</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium uppercase">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Total Amount:</span>
                  <span className="font-medium">${Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
              <hr className="border-t-black/10 mb-4" />
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-black/60">{item.name} × {item.quantity}</span>
                    <span className="font-medium">${(Number(item.unitPrice) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="border border-black/10 rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p className="text-black/60">{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p className="text-black/60">{order.shippingAddress.addressLine2}</p>
                  )}
                  <p className="text-black/60">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-black/60">{order.shippingAddress.country}</p>
                  <p className="text-black/60 mt-2">Phone: {order.shippingAddress.phone}</p>
                  <p className="text-black/60">Email: {order.shippingAddress.email}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-lg mb-4">What&apos;s Next?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Our team will review your order request within 24 hours</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">We&apos;ll contact you via email or phone to confirm details and arrange payment</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">You can view your order request status in your account</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/account/orders"
            className="px-6 py-3 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600"
          >
            View Orders
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 border border-black/10 rounded-full font-medium hover:border-black/30"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
