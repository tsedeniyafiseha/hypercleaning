"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string | null;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress?: any;
}

export default function UserOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin?callbackUrl=/account/orders");
    } else if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        console.log("Orders API response:", data);
        setOrders(data.orders || []);
      } else if (res.status === 401) {
        router.push("/signin?callbackUrl=/account/orders");
      } else {
        const errorData = await res.json();
        console.error("Orders API error:", errorData);
        setError("Failed to load orders");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusMessage = (status: string) => {
    const messages: Record<string, string> = {
      pending: "Your order request is pending. We'll contact you soon to confirm details.",
      paid: "Payment received. We're preparing your order.",
      processing: "Your order is being processed.",
      shipped: "Your order has been shipped!",
      delivered: "Your order has been delivered.",
      cancelled: "This order has been cancelled.",
    };
    return messages[status] || "Order status unknown";
  };

  if (loading) {
    return (
      <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
        <p className="text-black/60">View and track your order requests</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="border border-black/10 rounded-2xl p-12 text-center">
          <svg className="w-20 h-20 text-black/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-black/60 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button
            onClick={() => router.push("/shop")}
            className="px-6 py-3 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-black/10 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-black/60">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-2xl font-bold text-sky-600">
                    ${Number(order.totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Status Message */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-sky-900">{getStatusMessage(order.status)}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-sm text-black/60 uppercase">Order Items</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.imageUrl && (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-black/60">
                        Quantity: {item.quantity} × ${Number(item.unitPrice).toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div className="border-t border-black/10 pt-4">
                  <h4 className="font-semibold text-sm text-black/60 uppercase mb-2">Shipping Address</h4>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <p className="text-black/60">{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p className="text-black/60">{order.shippingAddress.addressLine2}</p>
                    )}
                    <p className="text-black/60">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p className="text-black/60">{order.shippingAddress.country}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
