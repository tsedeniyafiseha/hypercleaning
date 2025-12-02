/**
 * Payment System Test Script
 * Tests the complete payment flow including Stripe integration
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

interface TestResult {
  step: string;
  status: "✅ PASS" | "❌ FAIL" | "⚠️ WARNING";
  message: string;
  details?: any;
}

const results: TestResult[] = [];

async function testStripeConnection() {
  console.log("\n🔍 Testing Stripe Connection...");
  try {
    const balance = await stripe.balance.retrieve();
    results.push({
      step: "Stripe Connection",
      status: "✅ PASS",
      message: "Successfully connected to Stripe API",
      details: {
        available: balance.available,
        pending: balance.pending,
      },
    });
  } catch (error: any) {
    results.push({
      step: "Stripe Connection",
      status: "❌ FAIL",
      message: error.message,
    });
  }
}

async function testStripeKeys() {
  console.log("\n🔍 Testing Stripe Keys Configuration...");
  
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Check if keys exist
  if (!secretKey) {
    results.push({
      step: "Stripe Secret Key",
      status: "❌ FAIL",
      message: "STRIPE_SECRET_KEY not found in environment",
    });
  } else if (secretKey.startsWith("sk_test_")) {
    results.push({
      step: "Stripe Secret Key",
      status: "⚠️ WARNING",
      message: "Using TEST mode key (sk_test_...). Switch to LIVE key (sk_live_...) for production",
      details: { key: secretKey.substring(0, 20) + "..." },
    });
  } else if (secretKey.startsWith("sk_live_")) {
    results.push({
      step: "Stripe Secret Key",
      status: "✅ PASS",
      message: "Using LIVE mode key (production ready)",
      details: { key: secretKey.substring(0, 20) + "..." },
    });
  }

  if (!publishableKey) {
    results.push({
      step: "Stripe Publishable Key",
      status: "❌ FAIL",
      message: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not found",
    });
  } else if (publishableKey.startsWith("pk_test_")) {
    results.push({
      step: "Stripe Publishable Key",
      status: "⚠️ WARNING",
      message: "Using TEST mode key. Switch to LIVE key for production",
    });
  } else if (publishableKey.startsWith("pk_live_")) {
    results.push({
      step: "Stripe Publishable Key",
      status: "✅ PASS",
      message: "Using LIVE mode key (production ready)",
    });
  }

  if (!webhookSecret) {
    results.push({
      step: "Stripe Webhook Secret",
      status: "❌ FAIL",
      message: "STRIPE_WEBHOOK_SECRET not found. Webhooks will not work!",
    });
  } else {
    results.push({
      step: "Stripe Webhook Secret",
      status: "✅ PASS",
      message: "Webhook secret configured",
      details: { secret: webhookSecret.substring(0, 15) + "..." },
    });
  }
}

async function testCheckoutSession() {
  console.log("\n🔍 Testing Checkout Session Creation...");
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      customer_email: "test@example.com",
    });

    results.push({
      step: "Checkout Session Creation",
      status: "✅ PASS",
      message: "Successfully created test checkout session",
      details: {
        sessionId: session.id,
        url: session.url,
        amount: session.amount_total,
      },
    });

    // Clean up - expire the test session
    await stripe.checkout.sessions.expire(session.id);
  } catch (error: any) {
    results.push({
      step: "Checkout Session Creation",
      status: "❌ FAIL",
      message: error.message,
    });
  }
}

async function testDatabaseOrders() {
  console.log("\n🔍 Testing Database Orders...");
  try {
    const orderCount = await prisma.order.count();
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        OrderItem: true,
      },
    });

    results.push({
      step: "Database Orders",
      status: "✅ PASS",
      message: `Found ${orderCount} orders in database`,
      details: {
        totalOrders: orderCount,
        recentOrders: recentOrders.map((o) => ({
          id: o.id,
          status: o.status,
          total: o.totalAmount,
          items: o.OrderItem.length,
          createdAt: o.createdAt,
        })),
      },
    });
  } catch (error: any) {
    results.push({
      step: "Database Orders",
      status: "❌ FAIL",
      message: error.message,
    });
  }
}

async function testEnvironmentConfig() {
  console.log("\n🔍 Testing Environment Configuration...");
  
  const requiredVars = [
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET",
    "DATABASE_URL",
    "STRIPE_SECRET_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_WEBHOOK_SECRET",
  ];

  const missing = requiredVars.filter((v) => !process.env[v]);
  
  if (missing.length > 0) {
    results.push({
      step: "Environment Variables",
      status: "❌ FAIL",
      message: `Missing required variables: ${missing.join(", ")}`,
    });
  } else {
    results.push({
      step: "Environment Variables",
      status: "✅ PASS",
      message: "All required environment variables are set",
    });
  }

  // Check NEXTAUTH_SECRET
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret === "development-secret-key-change-in-production") {
    results.push({
      step: "NextAuth Secret",
      status: "⚠️ WARNING",
      message: "Using default development secret. Generate a secure random secret for production!",
    });
  } else if (secret && secret.length >= 32) {
    results.push({
      step: "NextAuth Secret",
      status: "✅ PASS",
      message: "NextAuth secret is configured and secure",
    });
  } else {
    results.push({
      step: "NextAuth Secret",
      status: "⚠️ WARNING",
      message: "NextAuth secret may be too short. Use at least 32 characters",
    });
  }

  // Check URLs
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  if (nextAuthUrl?.includes("localhost")) {
    results.push({
      step: "NextAuth URL",
      status: "⚠️ WARNING",
      message: "Using localhost URL. Update to production domain for deployment",
      details: { url: nextAuthUrl },
    });
  } else {
    results.push({
      step: "NextAuth URL",
      status: "✅ PASS",
      message: "Production URL configured",
      details: { url: nextAuthUrl },
    });
  }
}

async function testProducts() {
  console.log("\n🔍 Testing Products Availability...");
  try {
    const productCount = await prisma.product.count();
    const inStockProducts = await prisma.product.count({
      where: { stock: { gt: 0 } },
    });

    if (productCount === 0) {
      results.push({
        step: "Products",
        status: "⚠️ WARNING",
        message: "No products found in database. Run 'npm run prisma:seed' to add products",
      });
    } else {
      results.push({
        step: "Products",
        status: "✅ PASS",
        message: `Found ${productCount} products (${inStockProducts} in stock)`,
      });
    }
  } catch (error: any) {
    results.push({
      step: "Products",
      status: "❌ FAIL",
      message: error.message,
    });
  }
}

function printResults() {
  console.log("\n" + "=".repeat(80));
  console.log("📊 PAYMENT SYSTEM TEST RESULTS");
  console.log("=".repeat(80) + "\n");

  let passCount = 0;
  let failCount = 0;
  let warnCount = 0;

  results.forEach((result) => {
    console.log(`${result.status} ${result.step}`);
    console.log(`   ${result.message}`);
    if (result.details) {
      console.log(`   Details:`, JSON.stringify(result.details, null, 2));
    }
    console.log();

    if (result.status === "✅ PASS") passCount++;
    if (result.status === "❌ FAIL") failCount++;
    if (result.status === "⚠️ WARNING") warnCount++;
  });

  console.log("=".repeat(80));
  console.log(`Summary: ${passCount} passed, ${failCount} failed, ${warnCount} warnings`);
  console.log("=".repeat(80) + "\n");

  if (failCount > 0) {
    console.log("❌ PAYMENT SYSTEM HAS CRITICAL ISSUES - FIX BEFORE DEPLOYING\n");
    process.exit(1);
  } else if (warnCount > 0) {
    console.log("⚠️ PAYMENT SYSTEM WORKS BUT HAS WARNINGS - REVIEW BEFORE PRODUCTION\n");
  } else {
    console.log("✅ PAYMENT SYSTEM IS PRODUCTION READY\n");
  }
}

async function runTests() {
  console.log("🚀 Starting Payment System Tests...\n");

  await testEnvironmentConfig();
  await testStripeKeys();
  await testStripeConnection();
  await testCheckoutSession();
  await testDatabaseOrders();
  await testProducts();

  printResults();

  await prisma.$disconnect();
}

runTests().catch((error) => {
  console.error("❌ Test script failed:", error);
  process.exit(1);
});
