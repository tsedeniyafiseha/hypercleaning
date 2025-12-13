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

    const categoryId = parseInt(params.id);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { _count: { select: { Product: true } } },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    logger.error("Failed to fetch admin category", error as Error, { endpoint: "GET /api/admin/categories/:id", categoryId: params.id });
    return NextResponse.json(
      { error: "Failed to fetch category" },
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

    const categoryId = parseInt(params.id);
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const updateData: any = { name, slug };
    if (description !== undefined) updateData.description = description || null;
    
    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    logger.error("Failed to update admin category", error as Error, { endpoint: "PUT /api/admin/categories/:id", categoryId: params.id });
    return NextResponse.json(
      { error: "Failed to update category" },
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

    const categoryId = parseInt(params.id);

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to delete admin category", error as Error, { endpoint: "DELETE /api/admin/categories/:id", categoryId: params.id });
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
