import nodemailer from 'nodemailer';
import { logger } from './logger';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export interface OrderConfirmationData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  orderDate: string;
}

export async function sendOrderConfirmation(data: OrderConfirmationData) {
  try {
    const itemsHtml = data.items
      .map(
        (item) =>
          `<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td></tr>`
      )
      .join('');

    const html = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>Order Date:</strong> ${data.orderDate}</p>
      <table border="1" cellpadding="10">
        <tr><th>Product</th><th>Quantity</th><th>Price</th></tr>
        ${itemsHtml}
      </table>
      <p><strong>Total:</strong> $${data.totalAmount.toFixed(2)}</p>
      <p>We'll send you tracking information soon.</p>
    `;

    await getTransporter().sendMail({
      from: process.env.FROM_EMAIL,
      to: data.customerEmail,
      subject: `Order Confirmation - ${data.orderId}`,
      html,
    });

    logger.info('Order confirmation email sent', { orderId: data.orderId });
  } catch (error) {
    logger.error('Failed to send order confirmation email', error as Error, {
      orderId: data.orderId,
    });
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    // Use NEXT_PUBLIC_SITE_URL or fallback to NEXTAUTH_URL for production
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/reset-password?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Hyper Clean Supplies</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">Reset Your Password</h2>
          <p style="color: #4b5563; font-size: 16px;">We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #0ea5e9; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">Reset Password</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="color: #0ea5e9; font-size: 14px; word-break: break-all;">${resetLink}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      </body>
      </html>
    `;

    await getTransporter().sendMail({
      from: process.env.FROM_EMAIL || 'noreply@hyperclean.com',
      to: email,
      subject: 'Password Reset Request - Hyper Clean Supplies',
      html,
    });

    logger.info('Password reset email sent', { email });
  } catch (error) {
    logger.error('Failed to send password reset email', error as Error, { email });
    throw error;
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  try {
    // Use NEXT_PUBLIC_SITE_URL or fallback to NEXTAUTH_URL for production
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const verificationLink = `${baseUrl}/api/auth/verify-email?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Hyper Clean Supplies</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">Verify Your Email Address</h2>
          <p style="color: #4b5563; font-size: 16px;">Thank you for signing up! Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #0ea5e9; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">Verify Email Address</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="color: #0ea5e9; font-size: 14px; word-break: break-all;">${verificationLink}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
        </div>
      </body>
      </html>
    `;

    await getTransporter().sendMail({
      from: process.env.FROM_EMAIL || 'noreply@hyperclean.com',
      to: email,
      subject: 'Verify Your Email Address - Hyper Clean Supplies',
      html,
    });

    logger.info('Verification email sent', { email });
  } catch (error) {
    logger.error('Failed to send verification email', error as Error, { email });
    throw error;
  }
}
