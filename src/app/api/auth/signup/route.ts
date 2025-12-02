import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sanitizeObject, signupSchema } from "@/lib/validation";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);
    const { name, email, password } = sanitizedBody;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate with schema
    const validation = signupSchema.safeParse({ name, email, password });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with auto-verification (no email verification needed)
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        passwordHash,
        role: "user",
        emailVerified: new Date(), // Auto-verify on signup
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    logger.info("User account created successfully", { userId: user.id, email: user.email });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully. You can now sign in.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Failed to create user account", error as Error, {
      endpoint: "POST /api/auth/signup",
    });

    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}


