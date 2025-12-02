import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import Sidebar from "@/components/homepage/Sidebar";
import BrowseByCategory from "@/components/homepage/BrowseByCategory";
import Reviews from "@/components/homepage/Reviews";
import Footer from "@/components/layout/Footer";
import AdminRedirect from "@/components/homepage/AdminRedirect";
import { getAllProducts } from "@/lib/products";
import { reviewsData } from "@/data/reviews";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await getAllProducts();
  const newArrivalsData = allProducts.slice(0, 8);
  const topSellingData = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="bg-white min-h-screen">
      <AdminRedirect />
      <Header />
      <BrowseByCategory />
      <Brands />
      
      {/* Main Content with Sidebar */}
      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Products Section */}
          <main className="flex-1">
            <ProductListSec title="NEW ARRIVALS" data={newArrivalsData} viewAllLink="/shop#new-arrivals" />
            <div className="my-12">
              <hr className="h-[1px] border-t-gray-200" />
            </div>
            <ProductListSec title="TOP SELLING" data={topSellingData} viewAllLink="/shop#top-selling" />
          </main>
        </div>
      </div>

      <div className="py-12 bg-white">
        <Reviews data={reviewsData} />
      </div>
      <Footer showNewsletter={true} />
    </div>
  );
}