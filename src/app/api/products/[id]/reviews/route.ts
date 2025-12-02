import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sanitizeObject } from "@/lib/validation";
import { logger } from "@/lib/logger";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        User: {
          select: { name: true, image: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(reviews);
  } catch (error) {
    logger.error("Failed to fetch reviews", error as Error, { endpoint: "GET /api/products/:id/reviews", productId: params.id });
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const productId = parseInt(params.id);
    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);
    const { rating, comment } = reviewSchema.parse(sanitizedBody);

    // Use transaction to ensure data consistency
    const review = await prisma.$transaction(async (tx) => {
      // Create review
      const newReview = await tx.review.create({
        data: {
          rating,
          comment,
          userId: user.id,
          productId,
        },
        include: {
          User: {
            select: { name: true, image: true }
          }
        }
      });

      // Calculate new average rating
      const avgRating = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true }
      });

      // Update product rating
      await tx.product.update({
        where: { id: productId },
        data: { rating: avgRating._avg.rating || 0 }
      });

      return newReview;
    });

    return NextResponse.json(review);
  } catch (error) {
    logger.error("Failed to create review", error as Error, { endpoint: "POST /api/products/:id/reviews", productId: params.id });
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}