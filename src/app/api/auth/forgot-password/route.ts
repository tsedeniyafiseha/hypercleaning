import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";
import { z } from "zod";
import { sanitizeObject } from "@/lib/validation";
import { logger } from "@/lib/logger";

const emailSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);
    const { email } = emailSchema.parse(sanitizedBody);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ 
        message: "If an account exists, a password reset link has been sent" 
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.verificationToken.create({
      data: {
        id: crypto.randomUUID(),
        identifier: email,
        token,
        expires,
        userId: user.id,
      },
    });

    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ 
      message: "If an account exists, a password reset link has been sent" 
    });
  } catch (error) {
    logger.error("Failed to process forgot password request", error as Error, { endpoint: "POST /api/auth/forgot-password" });
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
