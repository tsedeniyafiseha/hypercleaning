"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useState } from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Settings, ShoppingBag } from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type TopNavbarProps = {
  categories: Category[];
};

const TopNavbarClient = ({ categories }: TopNavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    // Clear cart from localStorage before logout
    if (typeof window !== "undefined") {
      localStorage.removeItem("persist:root");
    }
    await signOut({ callbackUrl: "/" });
  };

  // Build navigation menu dynamically
  const data: NavMenu = [
    {
      id: 1,
      label: "Shop by Category",
      type: "MenuList",
      children: categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        url: `/shop/category/${cat.slug}`,
        description: "",
      })),
    },
    { id: 2, type: "MenuItem", label: "About Us", url: "/about", children: [] },
    { id: 3, type: "MenuItem", label: "Contact", url: "/contact", children: [] },
  ];

  return (
    <nav className="sticky top-0 bg-white z-20 shadow-sm">
      {/* Main Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-frame mx-auto px-4 xl:px-0 py-3 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">H</span>
            </div>
            <div className="hidden sm:block">
              <span className={cn([integralCF.className, "text-xl text-gray-800"])}>HYPER</span>
              <span className="text-green-500 font-bold text-xl">CLEANING</span>
              <p className="text-[10px] text-gray-400 -mt-1">SUPPLIES</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full border border-gray-200 rounded-md py-2.5 px-4 pr-12 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
              <button className="absolute right-0 top-0 h-full bg-sky-500 hover:bg-sky-600 text-white px-4 rounded-r-md transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            {session ? (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 block">ACCOUNT</span>
                    <span className="text-sm font-medium text-gray-800">{session.user?.name || session.user?.email}</span>
                  </div>
                </button>
                
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <Link
                        href="/account"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        My Orders
                      </Link>
                      {session.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                        <Link
                          href="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                        >
                          <Settings className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/signin" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 block">ACCOUNT</span>
                  <span className="text-sm font-medium text-gray-800">Log in / Sign in</span>
                </div>
              </Link>
            )}
            <Link href="/wishlist" className="hidden md:flex items-center text-gray-600 hover:text-gray-800 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
            <div className="flex items-center gap-2">
              <CartBtn />
              <div className="hidden lg:block text-left">
                <span className="text-[10px] text-gray-400 block">TOTAL</span>
                <span className="text-sm font-semibold text-gray-800">$0.00 NZD</span>
              </div>
            </div>
            <div className="block md:hidden">
              <ResTopNavbar data={data} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="hidden md:block bg-white border-b border-gray-100">
        <div className="max-w-frame mx-auto px-4 xl:px-0 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  {item.type === "MenuItem" && <MenuItem label={item.label} url={item.url} />}
                  {item.type === "MenuList" && <MenuList data={item.children} label={item.label} />}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2 py-3 text-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-400">NEED HELP?</span>
            <span className="font-bold text-gray-800">Contact Us</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbarClient;
