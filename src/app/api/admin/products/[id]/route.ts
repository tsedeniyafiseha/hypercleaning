import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitizeObject } from "@/lib/validation";
import { logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = parseInt(params.id);
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { Category: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Convert Decimal to number for JSON serialization
    const productData = {
      ...product,
      price: Number(product.price),
    };

    return NextResponse.json(productData);
  } catch (error) {
    logger.error("Failed to fetch admin product", error as Error, { endpoint: "GET /api/admin/products/:id", productId: params.id });
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = parseInt(params.id);
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);

    const {
      title,
      description,
      price,
      imageUrl,
      gallery,
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

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description: description ?? null,
        price,
        imageUrl,
        gallery: gallery ?? [],
        categoryId: categoryId ?? null,
        discountAmount: discountAmount ?? 0,
        discountPercentage: discountPercentage ?? 0,
        stock: stock ?? 0,
        rating: rating ?? 0,
      },
    });

    // Convert Decimal to number for JSON serialization
    const updatedData = {
      ...updated,
      price: Number(updated.price),
    };

    return NextResponse.json(updatedData);
  } catch (error) {
    logger.error("Failed to update admin product", error as Error, { endpoint: "PUT /api/admin/products/:id", productId: params.id });
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = parseInt(params.id);

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to delete admin product", error as Error, { endpoint: "DELETE /api/admin/products/:id", productId: params.id });
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
