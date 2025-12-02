import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalProducts,
      totalOrders,
      totalRevenue,
      totalUsers,
      pendingOrders,
      recentOrders,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: "paid" },
        _sum: { totalAmount: true },
      }),
      prisma.user.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          User: { select: { name: true, email: true } },
          OrderItem: { select: { name: true, quantity: true } },
        },
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalRevenue: Number(totalRevenue._sum.totalAmount || 0),
      totalUsers,
      pendingOrders,
      recentOrders,
    });
  } catch (error) {
    logger.error("Failed to fetch admin stats", error as Error, { endpoint: "GET /api/admin/stats" });
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
