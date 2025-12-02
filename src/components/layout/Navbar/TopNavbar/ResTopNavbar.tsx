"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Settings, ShoppingBag } from "lucide-react";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    // Clear cart from localStorage before logout
    if (typeof window !== "undefined") {
      localStorage.removeItem("persist:root");
    }
    await signOut({ callbackUrl: "/" });
  };
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          priority
          src="/icons/menu.svg"
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className={cn([integralCF.className, "text-2xl"])}>
                HYPER CLEANING
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "MenuItem" && (
                <SheetClose asChild>
                  <Link href={item.url ?? "/"} className="mb-4">
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === "MenuList" && (
                <div className="mb-4 w-full">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pb-0 border-l flex flex-col">
                        {item.children.map((itemChild, idx) => (
                          <SheetClose
                            key={itemChild.id}
                            asChild
                            className="w-fit py-2 text-base"
                          >
                            <Link href={itemChild.url ?? "/"}>
                              {itemChild.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </React.Fragment>
          ))}
          
          {/* User Menu */}
          <div className="mt-6 pt-6 border-t border-gray-200 w-full">
            {session ? (
              <div className="space-y-2">
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">LOGGED IN AS</p>
                  <p className="text-sm font-medium text-gray-800">{session.user?.name || session.user?.email}</p>
                </div>
                <SheetClose asChild>
                  <Link href="/account" className="flex items-center gap-3 py-2 text-gray-700">
                    <User className="w-4 h-4" />
                    My Account
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/account/orders" className="flex items-center gap-3 py-2 text-gray-700">
                    <ShoppingBag className="w-4 h-4" />
                    My Orders
                  </Link>
                </SheetClose>
                {session.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                  <SheetClose asChild>
                    <Link href="/admin" className="flex items-center gap-3 py-2 text-gray-700 border-t border-gray-100 pt-4">
                      <Settings className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  </SheetClose>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 py-2 text-red-600 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <SheetClose asChild>
                  <Link href="/signin" className="flex items-center gap-3 py-2 text-gray-700">
                    <User className="w-4 h-4" />
                    Sign In
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/signup" className="flex items-center gap-3 py-2 text-gray-700">
                    <User className="w-4 h-4" />
                    Sign Up
                  </Link>
                </SheetClose>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
