import { NextRequest, NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/validation";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/api-response";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP configuration incomplete");
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port),
    secure: parseInt(port) === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const sanitizedBody = sanitizeObject(rawBody);

    // Validate input
    const validation = contactSchema.safeParse(sanitizedBody);
    if (!validation.success) {
      const errors: Record<string, string[]> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      return validationErrorResponse(errors);
    }

    const { name, email, phone, message } = validation.data;

    // Send email notification
    try {
      const transporter = getTransporter();
      const adminEmail = process.env.ADMIN_EMAIL || "admin@localhost.com";
      const fromEmail = process.env.FROM_EMAIL || "noreply@localhost.com";

      // Email to admin
      await transporter.sendMail({
        from: fromEmail,
        to: adminEmail,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      // Confirmation email to user
      await transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: "Thank you for contacting us - Hyper Clean Supplies",
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p>Best regards,<br>Hyper Clean Supplies Team</p>
        `,
      });

      logger.info("Contact form submission received", { email, name });
    } catch (emailError) {
      // Log email error but don't fail the request
      logger.error(
        "Failed to send contact form email",
        emailError as Error,
        { email, name }
      );
      // Continue - we still want to acknowledge the submission
    }

    return successResponse(
      { message: "Thank you for your message. We'll get back to you soon!" },
      "Message sent successfully"
    );
  } catch (error) {
    logger.error("Failed to process contact form", error as Error, {
      endpoint: "POST /api/contact",
    });
    return errorResponse("Failed to send message. Please try again later.", 500);
  }
}

