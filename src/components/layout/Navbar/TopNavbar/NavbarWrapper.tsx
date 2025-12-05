import { prisma } from "@/lib/prisma";
import TopNavbar from "./TopNavbarClient";

export default async function NavbarWrapper() {
  let categories: Array<{ id: number; name: string; slug: string }> = [];
  
  try {
    categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch categories for navbar:", error);
  }

  return <TopNavbar categories={categories} />;
}
