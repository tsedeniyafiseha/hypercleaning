"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TabType = "profile" | "orders" | "addresses" | "security";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt: string;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{ name: string; quantity: number }>;
  shippingAddress?: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Profile form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Security form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      fetchProfile();
      fetchOrders();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setName(data.name || "");
        setEmail(data.email || "");
      }
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || data);
      }
    } catch (err) {
      console.error("Failed to load orders");
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setMessage("Profile updated successfully");
        fetchProfile();
        setTimeout(() => setMessage(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (res.ok) {
        setMessage("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to change password");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-frame mx-auto px-4 xl:px-0 py-10">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-frame mx-auto px-4 xl:px-0 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile and orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg font-medium transition-colors",
                    activeTab === "profile"
                      ? "bg-sky-50 text-sky-600 border-l-4 border-sky-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  👤 Profile Information
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg font-medium transition-colors",
                    activeTab === "orders"
                      ? "bg-sky-50 text-sky-600 border-l-4 border-sky-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  📦 My Orders
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg font-medium transition-colors",
                    activeTab === "addresses"
                      ? "bg-sky-50 text-sky-600 border-l-4 border-sky-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  📍 Addresses
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg font-medium transition-colors",
                    activeTab === "security"
                      ? "bg-sky-50 text-sky-600 border-l-4 border-sky-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  🔒 Security
                </button>
              </nav>

              <div className="border-t mt-4 pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {message && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800">✓ {message}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800">✕ {error}</p>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Member Since:</strong> {profile && new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Account Status:</strong> <span className="text-green-600">Active</span>
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <Link
                        href="/shop"
                        className="inline-block px-6 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold text-gray-900">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium",
                                order.status === "completed" || order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "paid" || order.status === "processing" || order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              )}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                          </p>
                          {order.shippingAddress && (
                            <div className="bg-gray-50 rounded p-3 mb-3 text-sm">
                              <p className="font-medium text-gray-900 mb-1">Shipping To:</p>
                              <p className="text-gray-600">{order.shippingAddress.fullName}</p>
                              <p className="text-gray-600">{order.shippingAddress.addressLine1}</p>
                              <p className="text-gray-600">
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                              </p>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-gray-900">
                              ${Number(order.totalAmount).toFixed(2)}
                            </p>
                            <Link
                              href={`/orders/${order.id}`}
                              className="text-sky-600 hover:text-sky-700 font-medium"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No addresses saved yet</p>
                    <p className="text-sm text-gray-500 mb-6">
                      Addresses will be saved from your orders
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600"
                    >
                      Place an Order
                    </Link>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        💡 Password must be at least 6 characters long
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 disabled:opacity-50"
                    >
                      {saving ? "Updating..." : "Change Password"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
