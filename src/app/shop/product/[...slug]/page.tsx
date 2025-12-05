import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import type { Metadata } from "next";
import Script from "next/script";

export const dynamic = 'force-dynamic';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const id = Number(params.slug[0]);

  if (Number.isNaN(id)) {
    notFound();
  }

  const productData = await getProductById(id);

  if (!productData?.title) {
    notFound();
  }

  const productUrl = `${siteUrl}/shop/product/${productData.id}/${productData.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const description =
    productData.gallery && productData.gallery.length > 0
      ? `Buy ${productData.title} at Hyper Cleaning Supplies. High-quality professional cleaning supplies at competitive prices.`
      : `Buy ${productData.title} online from Hyper Cleaning Supplies.`;

  return {
    title: productData.title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: "website",
      url: productUrl,
      title: productData.title,
      description,
      images: productData.srcUrl ? [
        {
          url: productData.srcUrl,
        },
      ] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const id = Number(params.slug[0]);

  if (Number.isNaN(id)) {
    notFound();
  }

  const productData = await getProductById(id);

  if (!productData?.title) {
    notFound();
  }

  const productUrl = `${siteUrl}/shop/product/${productData.id}/${productData.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productData.title,
    image: [productData.srcUrl, ...(productData.gallery ?? [])],
    description:
      "Professional cleaning product available at Hyper Cleaning Supplies.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: productData.price,
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: productData.rating,
      reviewCount: 1,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${siteUrl}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productData.title,
        item: productUrl,
      },
    ],
  };

  return (
    <main>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
      </div>
    </main>
  );
}
