"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-20">
      <div className="max-w-md mx-auto text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Verifying Email...</h1>
            <p className="text-black/60">Please wait while we verify your email address.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Email Verified!</h1>
            <p className="text-black/60 mb-8">{message}</p>
            <Link
              href="/signin"
              className="inline-block px-6 py-3 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600"
            >
              Sign In
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
            <p className="text-black/60 mb-8">{message}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600"
            >
              Go Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
