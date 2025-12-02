import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
    const status = searchParams.get("status");
    
    // Validate pagination parameters
    const { page, limit, skip } = validatePagination(searchParams);

    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          OrderItem: true,
          User: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      pagination: createPaginationMeta(page, limit, total),
    });
  } catch (error) {
    logger.error("Failed to fetch admin orders", error as Error, { endpoint: "GET /api/admin/orders" });
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
