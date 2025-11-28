import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const { items, adjustedTotalPrice } = body as {
      items: {
        id: number;
        name: string;
        srcUrl: string;
        price: number;
        quantity: number;
      }[];
      adjustedTotalPrice: number;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.srcUrl],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create Stripe session first
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXTAUTH_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
      customer_email: session?.user?.email || undefined,
    });

    // Get user ID from database if logged in
    let userId: number | undefined;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = user?.id;
    }

    // Use transaction to create order with items atomically
    await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          userId: userId,
          totalAmount: adjustedTotalPrice,
          stripeSessionId: stripeSession.id,
          currency: "usd",
          customerEmail: session?.user?.email || undefined,
          items: {
            create: items.map((item) => ({
              productId: item.id,
              name: item.name,
              unitPrice: item.price,
              quantity: item.quantity,
              imageUrl: item.srcUrl,
            })),
          },
        },
      });
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    logger.error("Failed to create checkout session", error as Error, { endpoint: "POST /api/checkout" });
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}


