"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { clearCart } from "@/lib/features/carts/cartsSlice";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Footer from "@/components/layout/Footer";

interface ShippingFormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { cart, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Redirect if no cart items
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Valid phone number is required");
      return false;
    }
    if (!formData.addressLine1.trim()) {
      setError("Address is required");
      return false;
    }
    if (!formData.city.trim()) {
      setError("City is required");
      return false;
    }
    if (!formData.state.trim()) {
      setError("State/Province is required");
      return false;
    }
    if (!formData.postalCode.trim()) {
      setError("Postal code is required");
      return false;
    }
    if (!formData.country.trim()) {
      setError("Country is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    if (!cart || cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            id: item.id,
            name: item.name,
            srcUrl: item.srcUrl,
            price: item.price,
            quantity: item.quantity,
          })),
          adjustedTotalPrice,
          shippingAddress: formData,
          customerEmail: formData.email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || "Failed to submit order request");
        return;
      }

      // Clear cart after successful order submission
      dispatch(clearCart());

      // Redirect to success page
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="mb-8">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-black/60 hover:text-black mb-4"
          >
            <FaArrowLeft className="text-sm" />
            Back to Cart
          </Link>
          <h1
            className={cn([
              integralCF.className,
              "font-bold text-[32px] md:text-[40px] text-black uppercase",
            ])}
          >
            Shipping & Billing
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="border border-black/10 rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-transparent placeholder:text-black/40"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-transparent placeholder:text-black/40"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent placeholder:text-black/40"
                      required
                    />
                  </InputGroup>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border border-black/10 rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Input
                      type="text"
                      name="addressLine1"
                      placeholder="Street Address"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="bg-transparent placeholder:text-black/40"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Input
                      type="text"
                      name="addressLine2"
                      placeholder="Apartment, Suite, etc. (Optional)"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup className="bg-[#F0F0F0]">
                      <InputGroup.Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-transparent placeholder:text-black/40"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="bg-[#F0F0F0]">
                      <InputGroup.Input
                        type="text"
                        name="state"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="bg-transparent placeholder:text-black/40"
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup className="bg-[#F0F0F0]">
                      <InputGroup.Input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="bg-transparent placeholder:text-black/40"
                        required
                      />
                    </InputGroup>
                    <div className="bg-[#F0F0F0] rounded-lg">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-transparent placeholder:text-black/40 text-black outline-none"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="CH">Switzerland</option>
                        <option value="SE">Sweden</option>
                        <option value="NO">Norway</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="PL">Poland</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="AT">Austria</option>
                        <option value="GR">Greece</option>
                        <option value="PT">Portugal</option>
                        <option value="IE">Ireland</option>
                        <option value="JP">Japan</option>
                        <option value="CN">China</option>
                        <option value="IN">India</option>
                        <option value="BR">Brazil</option>
                        <option value="MX">Mexico</option>
                        <option value="ZA">South Africa</option>
                        <option value="SG">Singapore</option>
                        <option value="HK">Hong Kong</option>
                        <option value="NZ">New Zealand</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 rounded-full py-4 h-[54px] md:h-[60px] font-medium disabled:opacity-60"
              >
                {loading ? "Submitting Order..." : "Submit Order Request"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="border border-black/10 rounded-2xl p-6 h-fit">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-black/60">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <hr className="border-t-black/10 mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Subtotal</span>
                <span>${cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <hr className="border-t-black/10 my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${adjustedTotalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
