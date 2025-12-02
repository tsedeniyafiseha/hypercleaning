"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
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
  customerEmail: string | null;
  user: { name: string | null; email: string } | null;
  items: OrderItem[];
  shippingAddress: any;
}

export default function AdminOrderDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchOrder();
    }
  }, [status, router, orderId]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else if (res.status === 401) {
        router.push("/");
      } else {
        setError("Order not found");
      }
    } catch (err) {
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrder({ ...order!, status: updated.status });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update status");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <button
            onClick={() => router.push("/admin/orders")}
            className="px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600"
          >
            Back to Orders
          </button>
        </div>
      </main>
    );
  }

  const statusOptions = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/orders")}
          className="text-sm text-black/60 hover:text-black mb-4"
        >
          ← Back to Orders
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Order #{order.id}</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="border border-black/10 rounded-2xl p-6">
            <h2 className="font-semibold text-lg mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-black/10 last:border-0">
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
                      ${Number(item.unitPrice).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-black/10 flex justify-between items-center">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl">${Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="border border-black/10 rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
              <div className="text-sm space-y-1">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="border border-black/10 rounded-2xl p-6">
            <h2 className="font-semibold text-lg mb-4">Order Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Update Status</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  disabled={updating}
                  className="w-full px-4 py-2 border border-black/10 rounded-lg disabled:opacity-50"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border border-black/10 rounded-2xl p-6">
            <h2 className="font-semibold text-lg mb-4">Customer</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-black/60">Name:</span>
                <p className="font-medium">{(order as any).User?.name || "Guest"}</p>
              </div>
              <div>
                <span className="text-black/60">Email:</span>
                <p className="font-medium">{(order as any).User?.email || order.customerEmail || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="border border-black/10 rounded-2xl p-6">
            <h2 className="font-semibold text-lg mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-black/60">Order ID:</span>
                <p className="font-medium">#{order.id}</p>
              </div>
              <div>
                <span className="text-black/60">Date:</span>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
