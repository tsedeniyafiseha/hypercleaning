import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        Product: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            discountPercentage: true,
            rating: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { productId } = await request.json();

    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: user.id,
        productId: Number(productId),
      },
      include: {
        Product: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            discountPercentage: true,
            rating: true
          }
        }
      }
    });

    return NextResponse.json(wishlistItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { productId } = await request.json();

    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId: Number(productId),
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
}