/**
 * Production Readiness Check
 * Comprehensive verification of all systems
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

interface CheckResult {
  category: string;
  item: string;
  status: "✅ PASS" | "❌ FAIL" | "⚠️ WARNING";
  message: string;
  action?: string;
}

const results: CheckResult[] = [];

// Environment Variables Check
function checkEnvironmentVariables() {
  console.log("\n🔍 Checking Environment Variables...\n");

  const required = [
    { key: "DATABASE_URL", name: "Database Connection" },
    { key: "NEXTAUTH_SECRET", name: "NextAuth Secret" },
    { key: "NEXTAUTH_URL", name: "NextAuth URL" },
    { key: "STRIPE_SECRET_KEY", name: "Stripe Secret Key" },
    { key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", name: "Stripe Publishable Key" },
    { key: "STRIPE_WEBHOOK_SECRET", name: "Stripe Webhook Secret" },
    { key: "ADMIN_EMAIL", name: "Admin Email" },
    { key: "SMTP_HOST", name: "Email SMTP Host" },
    { key: "CLOUDINARY_CLOUD_NAME", name: "Cloudinary Cloud Name" },
    { key: "CLOUDINARY_API_KEY", name: "Cloudinary API Key" },
    { key: "CLOUDINARY_API_SECRET", name: "Cloudinary API Secret" },
  ];

  required.forEach(({ key, name }) => {
    const value = process.env[key];
    if (!value) {
      results.push({
        category: "Environment",
        item: name,
        status: "❌ FAIL",
        message: `${key} is not set`,
        action: `Add ${key} to environment variables`,
      });
    } else if (value.includes("your_") || value.includes("change-in-production")) {
      results.push({
        category: "Environment",
        item: name,
        status: "⚠️ WARNING",
        message: `${key} contains placeholder value`,
        action: `Update ${key} with production value`,
      });
    } else {
      results.push({
        category: "Environment",
        item: name,
        status: "✅ PASS",
        message: `${key} is configured`,
      });
    }
  });

  // Check Stripe mode
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey?.startsWith("sk_test_")) {
    results.push({
      category: "Environment",
      item: "Stripe Mode",
      status: "⚠️ WARNING",
      message: "Using TEST mode Stripe keys",
      action: "Switch to LIVE keys for production (sk_live_...)",
    });
  } else if (stripeKey?.startsWith("sk_live_")) {
    results.push({
      category: "Environment",
      item: "Stripe Mode",
      status: "✅ PASS",
      message: "Using LIVE mode Stripe keys",
    });
  }

  // Check NextAuth Secret
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret === "development-secret-key-change-in-production") {
    results.push({
      category: "Security",
      item: "NextAuth Secret",
      status: "❌ FAIL",
      message: "Using default development secret",
      action: "Generate secure secret: openssl rand -base64 32",
    });
  } else if (secret && secret.length >= 32) {
    results.push({
      category: "Security",
      item: "NextAuth Secret",
      status: "✅ PASS",
      message: "NextAuth secret is secure",
    });
  }
}

// Database Check
async function checkDatabase() {
  console.log("\n🔍 Checking Database...\n");

  try {
    // Test connection
    await prisma.$connect();
    results.push({
      category: "Database",
      item: "Connection",
      status: "✅ PASS",
      message: "Database connection successful",
    });

    // Check tables exist
    const tables = [
      { name: "User", query: () => prisma.user.count() },
      { name: "Product", query: () => prisma.product.count() },
      { name: "Category", query: () => prisma.category.count() },
      { name: "Order", query: () => prisma.order.count() },
      { name: "Cart", query: () => prisma.cart.count() },
    ];

    for (const table of tables) {
      try {
        const count = await table.query();
        results.push({
          category: "Database",
          item: `${table.name} Table`,
          status: "✅ PASS",
          message: `${count} records found`,
        });
      } catch (error) {
        results.push({
          category: "Database",
          item: `${table.name} Table`,
          status: "❌ FAIL",
          message: "Table not found or inaccessible",
          action: "Run: npm run prisma:migrate",
        });
      }
    }

    // Check for admin user
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const admin = await prisma.user.findUnique({
        where: { email: adminEmail },
      });

      if (admin) {
        results.push({
          category: "Database",
          item: "Admin User",
          status: "✅ PASS",
          message: `Admin user exists: ${adminEmail}`,
        });
      } else {
        results.push({
          category: "Database",
          item: "Admin User",
          status: "⚠️ WARNING",
          message: "Admin user not found in database",
          action: "Create admin user or update ADMIN_EMAIL",
        });
      }
    }

    // Check for products
    const productCount = await prisma.product.count();
    if (productCount === 0) {
      results.push({
        category: "Database",
        item: "Products",
        status: "⚠️ WARNING",
        message: "No products in database",
        action: "Run: npm run prisma:seed or add products via admin",
      });
    } else {
      results.push({
        category: "Database",
        item: "Products",
        status: "✅ PASS",
        message: `${productCount} products in database`,
      });
    }

    // Check for categories
    const categoryCount = await prisma.category.count();
    if (categoryCount === 0) {
      results.push({
        category: "Database",
        item: "Categories",
        status: "⚠️ WARNING",
        message: "No categories in database",
        action: "Run: npm run prisma:seed or add categories via admin",
      });
    } else {
      results.push({
        category: "Database",
        item: "Categories",
        status: "✅ PASS",
        message: `${categoryCount} categories in database`,
      });
    }
  } catch (error: any) {
    results.push({
      category: "Database",
      item: "Connection",
      status: "❌ FAIL",
      message: error.message,
      action: "Check DATABASE_URL and ensure database is running",
    });
  }
}

// Stripe Check
async function checkStripe() {
  console.log("\n🔍 Checking Stripe Integration...\n");

  try {
    const balance = await stripe.balance.retrieve();
    results.push({
      category: "Payment",
      item: "Stripe Connection",
      status: "✅ PASS",
      message: "Successfully connected to Stripe API",
    });

    // Check webhook secret
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      results.push({
        category: "Payment",
        item: "Webhook Secret",
        status: "✅ PASS",
        message: "Webhook secret configured",
      });
    } else {
      results.push({
        category: "Payment",
        item: "Webhook Secret",
        status: "❌ FAIL",
        message: "Webhook secret not configured",
        action: "Add STRIPE_WEBHOOK_SECRET to environment",
      });
    }
  } catch (error: any) {
    results.push({
      category: "Payment",
      item: "Stripe Connection",
      status: "❌ FAIL",
      message: error.message,
      action: "Check STRIPE_SECRET_KEY is valid",
    });
  }
}

// Cloudinary Check
function checkCloudinary() {
  console.log("\n🔍 Checking Cloudinary Integration...\n");

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    if (cloudName.includes("your_")) {
      results.push({
        category: "Image Upload",
        item: "Cloudinary Config",
        status: "⚠️ WARNING",
        message: "Cloudinary credentials contain placeholders",
        action: "Update with real Cloudinary credentials",
      });
    } else {
      results.push({
        category: "Image Upload",
        item: "Cloudinary Config",
        status: "✅ PASS",
        message: "Cloudinary credentials configured",
      });
    }
  } else {
    results.push({
      category: "Image Upload",
      item: "Cloudinary Config",
      status: "❌ FAIL",
      message: "Cloudinary credentials missing",
      action: "Add CLOUDINARY_* variables to environment",
    });
  }
}

// Security Check
function checkSecurity() {
  console.log("\n🔍 Checking Security Configuration...\n");

  // Check HTTPS in production
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  if (nextAuthUrl?.startsWith("http://") && !nextAuthUrl.includes("localhost")) {
    results.push({
      category: "Security",
      item: "HTTPS",
      status: "❌ FAIL",
      message: "NEXTAUTH_URL uses HTTP instead of HTTPS",
      action: "Update NEXTAUTH_URL to use https://",
    });
  } else if (nextAuthUrl?.startsWith("https://")) {
    results.push({
      category: "Security",
      item: "HTTPS",
      status: "✅ PASS",
      message: "Using HTTPS for production",
    });
  }

  // Check localhost URLs
  if (nextAuthUrl?.includes("localhost")) {
    results.push({
      category: "Security",
      item: "Production URL",
      status: "⚠️ WARNING",
      message: "NEXTAUTH_URL points to localhost",
      action: "Update to production domain before deploying",
    });
  }
}

// Print Results
function printResults() {
  console.log("\n" + "=".repeat(80));
  console.log("🚀 PRODUCTION READINESS CHECK RESULTS");
  console.log("=".repeat(80) + "\n");

  const categories = Array.from(new Set(results.map((r) => r.category)));

  categories.forEach((category) => {
    console.log(`\n📋 ${category}`);
    console.log("-".repeat(80));

    const categoryResults = results.filter((r) => r.category === category);
    categoryResults.forEach((result) => {
      console.log(`${result.status} ${result.item}`);
      console.log(`   ${result.message}`);
      if (result.action) {
        console.log(`   ⚡ Action: ${result.action}`);
      }
    });
  });

  // Summary
  const passed = results.filter((r) => r.status === "✅ PASS").length;
  const failed = results.filter((r) => r.status === "❌ FAIL").length;
  const warnings = results.filter((r) => r.status === "⚠️ WARNING").length;

  console.log("\n" + "=".repeat(80));
  console.log(`📊 Summary: ${passed} passed, ${failed} failed, ${warnings} warnings`);
  console.log("=".repeat(80) + "\n");

  if (failed > 0) {
    console.log("❌ NOT PRODUCTION READY - Fix critical issues before deploying\n");
    process.exit(1);
  } else if (warnings > 0) {
    console.log("⚠️ MOSTLY READY - Review warnings before production deployment\n");
  } else {
    console.log("✅ PRODUCTION READY - All checks passed!\n");
  }
}

// Run all checks
async function runChecks() {
  console.log("🚀 Starting Production Readiness Check...\n");

  checkEnvironmentVariables();
  await checkDatabase();
  await checkStripe();
  checkCloudinary();
  checkSecurity();

  printResults();

  await prisma.$disconnect();
}

runChecks().catch((error) => {
  console.error("❌ Check failed:", error);
  process.exit(1);
});
