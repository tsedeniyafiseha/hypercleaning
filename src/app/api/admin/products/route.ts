import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitizeObject } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { validatePagination, createPaginationMeta } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Validate pagination parameters
    const { page, limit, skip } = validatePagination(searchParams);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        include: { Category: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({
      products,
      pagination: createPaginationMeta(page, limit, total),
    });
  } catch (error) {
    logger.error("Failed to fetch admin products", error as Error, { endpoint: "GET /api/admin/products" });
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);

    const {
      id,
      title,
      description,
      price,
      imageUrl,
      categoryId,
      discountAmount,
      discountPercentage,
      stock,
      rating,
    } = body;

    if (!title || !imageUrl || typeof price !== "number") {
      return NextResponse.json(
        { error: "Title, image URL and price are required" },
        { status: 400 }
      );
    }

    const data = {
      title,
      description: description ?? null,
      price,
      imageUrl,
      categoryId: categoryId ?? null,
      discountAmount: discountAmount ?? 0,
      discountPercentage: discountPercentage ?? 0,
      stock: stock ?? 0,
      rating: rating ?? 0,
    };

    if (id) {
      const updated = await prisma.product.update({
        where: { id: Number(id) },
        data,
      });
      return NextResponse.json({ product: updated });
    }

    const created = await prisma.product.create({
      data,
    });

    return NextResponse.json({ product: created }, { status: 201 });
  } catch (error) {
    logger.error("Failed to create admin product", error as Error, { endpoint: "POST /api/admin/products" });
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


