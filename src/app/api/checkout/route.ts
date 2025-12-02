import { NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe"; // DISABLED: For future payment integration
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const { items, adjustedTotalPrice, customerEmail, shippingAddress } = body as {
      items: {
        id: number;
        name: string;
        srcUrl: string;
        price: number;
        quantity: number;
      }[];
      adjustedTotalPrice: number;
      customerEmail?: string;
      shippingAddress?: {
        fullName: string;
        email: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address is required" },
        { status: 400 }
      );
    }

    // Use logged-in user email or guest email
    const email = session?.user?.email || customerEmail || shippingAddress.email;

    // Get user ID if logged in
    let userId: number | undefined;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = user?.id;
    }

    // Create order directly without payment (for quote/request system)
    const order = await prisma.$transaction(async (tx) => {
      // Build order data conditionally
      const orderData: any = {
        totalAmount: adjustedTotalPrice,
        stripeSessionId: null, // No payment session
        currency: "usd",
        customerEmail: email,
        status: "pending", // Admin will contact customer
        shippingAddress: shippingAddress,
      };

      // Only add userId if user is logged in
      if (userId) {
        orderData.userId = userId;
      }

      // Create order with "pending" status (awaiting admin contact)
      const newOrder = await tx.order.create({
        data: orderData,
      });

      // Create order items
      await tx.orderItem.createMany({
        data: items.map((item) => ({
          orderId: newOrder.id,
          productId: item.id,
          name: item.name,
          unitPrice: item.price,
          quantity: item.quantity,
          imageUrl: item.srcUrl,
        })),
      });

      return newOrder;
    });

    console.log(`Order request created: #${order.id} for ${email}`);

    // Return success URL (skip Stripe payment)
    return NextResponse.json({ 
      url: `${process.env.NEXTAUTH_URL}/order-success?order_id=${order.id}`,
      orderId: order.id 
    });

    /* ============================================
     * STRIPE PAYMENT INTEGRATION (DISABLED)
     * Uncomment this section to enable payments
     * ============================================
    
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

    // Create Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXTAUTH_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
      customer_email: email,
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: stripeSession.id }
    });

    return NextResponse.json({ url: stripeSession.url });
    
    ============================================ */

  } catch (error) {
    console.error("Failed to create order request:", error);
    return NextResponse.json(
      { error: "Failed to create order request", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


