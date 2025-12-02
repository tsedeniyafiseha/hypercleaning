import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductsList from "@/components/admin/ProductsList";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session || !session.user?.email || !adminEmail) {
    redirect("/");
  }

  if (session.user.email !== adminEmail) {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    include: { Category: true },
    orderBy: { createdAt: "desc" },
  });

  // Convert Decimal to number and rename Category to category for client component
  const productsData = products.map(p => ({
    ...p,
    price: Number(p.price),
    category: p.Category, // Map Category to category for compatibility
  }));

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-sm text-black/60 mt-1">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-6 py-3 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          + New Product
        </Link>
      </div>

      <ProductsList products={productsData} />
    </main>
  );
}
