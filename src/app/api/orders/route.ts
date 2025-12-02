import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { validatePagination, createPaginationMeta } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const orderId = searchParams.get("orderId");

    // If orderId is provided, fetch order by ID (for order success page)
    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) },
        include: {
          OrderItem: {
            select: {
              id: true,
              name: true,
              quantity: true,
              unitPrice: true,
              imageUrl: true,
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Transform OrderItem to items for frontend compatibility
      const transformedOrder = {
        ...order,
        items: order.OrderItem,
      };

      return NextResponse.json(transformedOrder);
    }

    // If sessionId is provided, fetch order by session ID (for Stripe payment flow)
    if (sessionId) {
      const order = await prisma.order.findUnique({
        where: { stripeSessionId: sessionId },
        include: {
          OrderItem: {
            select: {
              id: true,
              name: true,
              quantity: true,
              unitPrice: true,
              imageUrl: true,
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Transform OrderItem to items for frontend compatibility
      const transformedOrder = {
        ...order,
        items: order.OrderItem,
      };

      return NextResponse.json(transformedOrder);
    }

    // Otherwise, fetch user's orders (requires authentication)
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from database using email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate pagination parameters
    const { page, limit, skip } = validatePagination(searchParams);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: user.id },
        include: {
          OrderItem: {
            select: {
              id: true,
              name: true,
              quantity: true,
              unitPrice: true,
              imageUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId: user.id } }),
    ]);

    // Transform OrderItem to items for frontend compatibility
    const transformedOrders = orders.map(order => ({
      ...order,
      items: order.OrderItem,
    }));

    return NextResponse.json({
      orders: transformedOrders,
      pagination: createPaginationMeta(page, limit, total),
    });
  } catch (error) {
    logger.error("Failed to fetch orders", error as Error, { endpoint: "GET /api/orders" });
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
