"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/features/carts/cartsSlice";

export default function CartSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear cart when user logs out
    if (status === "unauthenticated") {
      dispatch(clearCart());
    }
  }, [status, dispatch]);

  return null;
}
