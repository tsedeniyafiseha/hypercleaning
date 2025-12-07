import { NextRequest, NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/validation";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/api-response";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    logger.error("SMTP configuration incomplete", new Error("Missing SMTP env vars"), {
      host: !!host,
      port: !!port,
      user: !!user,
      pass: !!pass,
    });
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

      logger.info("Attempting to send contact form emails", { 
        from: fromEmail, 
        to: adminEmail,
        userEmail: email 
      });

      // Email to admin
      await transporter.sendMail({
        from: fromEmail,
        to: adminEmail,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Contact Details</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <h3 style="color: #1f2937;">Message:</h3>
              <p style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </body>
          </html>
        `,
      });

      logger.info("Admin notification email sent successfully");

      // Confirmation email to user
      await transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: "Thank you for contacting us - Hyper Cleaning Supplies",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Hyper Cleaning Supplies</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Thank you for contacting us!</h2>
              <p style="color: #4b5563; font-size: 16px;">Dear ${name},</p>
              <p style="color: #4b5563; font-size: 16px;">We have received your message and will get back to you as soon as possible, typically within 24 hours.</p>
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Your message:</h3>
                <p style="color: #6b7280;">${message.replace(/\n/g, "<br>")}</p>
              </div>
              <p style="color: #4b5563; font-size: 16px;">Best regards,<br><strong>Hyper Cleaning Supplies Team</strong></p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="color: #9ca3af; font-size: 12px; text-align: center;">
                📧 info@hyperclean.co.nz<br>
                123 Cleaning Street, Auckland, New Zealand
              </p>
            </div>
          </body>
          </html>
        `,
      });

      logger.info("User confirmation email sent successfully", { email, name });
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

