"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    if (status === "authenticated" && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      // Redirect admin to dashboard
      router.push("/admin");
    }
  }, [session, status, router]);

  return null; // This component doesn't render anything
}
