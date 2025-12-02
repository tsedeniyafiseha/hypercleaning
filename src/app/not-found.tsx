import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-frame mx-auto px-4 xl:px-0 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-black/60 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full bg-sky-500 text-white font-medium hover:bg-sky-600"
      >
        Go Home
      </Link>
    </div>
  );
}
