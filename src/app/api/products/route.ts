import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { validatePagination, createPaginationMeta } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    // Validate pagination parameters
    const { page, limit, skip } = validatePagination(searchParams);

    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { Category: { name: { contains: search, mode: "insensitive" } } }
      ];
    }

    // Category filter
    if (category) {
      where.category = { slug: category };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Only show products in stock
    where.stock = { gt: 0 };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { 
          Category: true,
          Review: {
            select: { rating: true }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({ 
      products, 
      pagination: createPaginationMeta(page, limit, total)
    });
  } catch (error) {
    logger.error("Failed to fetch products", error as Error, { endpoint: "GET /api/products" });
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


