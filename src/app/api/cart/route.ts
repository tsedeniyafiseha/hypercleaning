import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from "@/lib/api-response";

// GET - Fetch user's cart
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return unauthorizedResponse();
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return notFoundResponse();
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        CartItem: {
          include: {
            Product: {
              select: {
                id: true,
                title: true,
                price: true,
                imageUrl: true,
                discountAmount: true,
                discountPercentage: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: {
          CartItem: {
            include: {
              Product: {
                select: {
                  id: true,
                  title: true,
                  price: true,
                  imageUrl: true,
                  discountAmount: true,
                  discountPercentage: true,
                  stock: true,
                },
              },
            },
          },
        },
      });
    }

    return successResponse(cart);
  } catch (error) {
    logger.error("Failed to fetch cart", error as Error, { endpoint: "GET /api/cart" });
    return errorResponse("Failed to fetch cart", 500);
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return unauthorizedResponse();
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return notFoundResponse();
    }

    const rawBody = await request.json();
    const { productId, quantity, attributes } = rawBody;

    // Validate required fields
    if (!productId || !quantity || quantity <= 0) {
      return errorResponse("Product ID and valid quantity are required", 400);
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    // Check if item already exists
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
        attributes: attributes || null,
      },
    });

    let cartItem;
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          Product: {
            select: {
              id: true,
              title: true,
              price: true,
              imageUrl: true,
              discountAmount: true,
              discountPercentage: true,
              stock: true,
            },
          },
        },
      });
    } else {
      // Create new item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: Number(productId),
          quantity,
          attributes: attributes || null,
        },
        include: {
          Product: {
            select: {
              id: true,
              title: true,
              price: true,
              imageUrl: true,
              discountAmount: true,
              discountPercentage: true,
              stock: true,
            },
          },
        },
      });
    }

    return successResponse(cartItem);
  } catch (error) {
    logger.error("Failed to add item to cart", error as Error, { endpoint: "POST /api/cart" });
    return errorResponse("Failed to add to cart", 500);
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return unauthorizedResponse();
    }

    const rawBody = await request.json();
    const { cartItemId, quantity } = rawBody;

    if (!cartItemId) {
      return errorResponse("Cart item ID is required", 400);
    }

    if (quantity <= 0) {
      // Delete if quantity is 0 or less
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return NextResponse.json({ success: true, deleted: true });
    }

    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: {
        Product: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            discountAmount: true,
            discountPercentage: true,
            stock: true,
          },
        },
      },
    });

    return successResponse(cartItem);
  } catch (error) {
    logger.error("Failed to update cart item", error as Error, { endpoint: "PUT /api/cart" });
    return errorResponse("Failed to update cart", 500);
  }
}

// DELETE - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get("itemId");

    if (!cartItemId) {
      return errorResponse("Cart item ID is required", 400);
    }

    await prisma.cartItem.delete({
      where: { id: Number(cartItemId) },
    });

    return successResponse({ success: true, deleted: true });
  } catch (error) {
    logger.error("Failed to delete cart item", error as Error, { endpoint: "DELETE /api/cart" });
    return errorResponse("Failed to remove from cart", 500);
  }
}
