import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
  searchParams: { sort?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - Shop by Category`,
    description: `Browse ${category.name} products at Hyper Cleaning Supplies. Professional cleaning supplies at competitive prices.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      Product: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    notFound();
  }

  let products = category.Product.map((product) => ({
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
    stock: product.stock,
  }));

  // Apply sorting
  if (searchParams.sort === 'low-price') {
    products.sort((a, b) => a.price - b.price);
  } else if (searchParams.sort === 'high-price') {
    products.sort((a, b) => b.price - a.price);
  }

  const productsToShow = products.slice(0, 12);
  const totalProducts = products.length;

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop categoryName={category.name} />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h1 className="font-bold text-2xl md:text-[32px]">{category.name}</h1>
                </div>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {productsToShow.length} of {totalProducts} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {productsToShow.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {productsToShow.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            )}
            {(category as any).description && (
              <div className="mt-8 pt-8 border-t border-black/10">
                <p className="text-gray-600 max-w-2xl break-words whitespace-pre-wrap overflow-wrap-anywhere" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{(category as any).description}</p>
              </div>
            )}
            {/* Only show pagination if there are more products than shown */}
            {totalProducts > 12 && (
              <>
                <hr className="border-t-black/10" />
                <Pagination className="justify-between">
                  <PaginationPrevious href="#" className="border border-black/10" />
                  <PaginationContent>
                    {Array.from({ length: Math.min(Math.ceil(totalProducts / 12), 5) }, (_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          href="#"
                          className="text-black/50 font-medium text-sm"
                          isActive={i === 0}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {Math.ceil(totalProducts / 12) > 5 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            className="text-black/50 font-medium text-sm"
                          >
                            {Math.ceil(totalProducts / 12)}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                  </PaginationContent>
                  <PaginationNext href="#" className="border border-black/10" />
                </Pagination>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
