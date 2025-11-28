import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/common/ProductCard";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    notFound();
  }

  const url = `${siteUrl}/shop/category/${category.slug}`;
  const title = `${category.name} | Shop Cleaning Products`;
  const description = `Browse ${category.name.toLowerCase()} products from Hyper Cleaning Supplies. Professional cleaning materials and supplies.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <h1 className="font-bold text-2xl md:text-[32px] mb-4">
          {category.name}
        </h1>
        {products.length === 0 ? (
          <p className="text-black/60">
            No products found in this category yet.
          </p>
        ) : (
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                data={{
                  id: product.id,
                  title: product.title,
                  srcUrl: product.imageUrl,
                  gallery: product.gallery ?? [],
                  price: Number(product.price),
                  discount: {
                    amount: product.discountAmount,
                    percentage: product.discountPercentage,
                  },
                  rating: product.rating,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


