import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    logger.error("Webhook signature verification failed", err as Error, { endpoint: "POST /api/checkout/webhook" });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const stripeSessionId = session.id as string;
      const paymentIntentId = session.payment_intent as string | null;

      // Update order status
      await prisma.order.updateMany({
        where: { stripeSessionId },
        data: {
          status: "paid",
          stripePaymentIntentId: paymentIntentId ?? undefined,
        },
      });

      // Fetch order with items for email
      const order = await prisma.order.findFirst({
        where: { stripeSessionId },
        include: {
          OrderItem: {
            include: {
              Product: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });

      // Send order confirmation email
      if (order && order.customerEmail) {
        try {
          const shippingAddress = order.shippingAddress as {
            fullName?: string;
            email?: string;
            phone?: string;
            addressLine1?: string;
            addressLine2?: string;
            city?: string;
            state?: string;
            postalCode?: string;
            country?: string;
          } | null;

          await sendOrderConfirmation({
            orderId: order.id.toString(),
            customerEmail: order.customerEmail,
            customerName: shippingAddress?.fullName || "Customer",
            items: order.OrderItem.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: Number(item.unitPrice),
            })),
            totalAmount: Number(order.totalAmount),
            orderDate: order.createdAt.toISOString(),
          });

          logger.info("Order confirmation email sent", {
            orderId: order.id,
            email: order.customerEmail,
          });
        } catch (emailError) {
          // Log email error but don't fail the webhook
          logger.error(
            "Failed to send order confirmation email",
            emailError as Error,
            {
              orderId: order.id,
              email: order.customerEmail,
            }
          );
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error("Error handling Stripe webhook", error as Error, { endpoint: "POST /api/checkout/webhook" });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}


