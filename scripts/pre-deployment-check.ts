#!/usr/bin/env tsx
/**
 * Pre-Deployment Readiness Check
 * Validates all critical systems before deployment
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
}

const results: CheckResult[] = [];

async function checkDatabase() {
  try {
    await prisma.$connect();
    await prisma.user.count();
    results.push({
      name: 'Database Connection',
      status: 'pass',
      message: 'Successfully connected to database',
    });
  } catch (error) {
    results.push({
      name: 'Database Connection',
      status: 'fail',
      message: 'Failed to connect to database',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

async function checkEnvironmentVariables() {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'ADMIN_EMAIL',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length === 0) {
    results.push({
      name: 'Environment Variables',
      status: 'pass',
      message: 'All required environment variables are set',
    });
  } else {
    results.push({
      name: 'Environment Variables',
      status: 'fail',
      message: 'Missing required environment variables',
      details: missing.join(', '),
    });
  }

  // Check for production-ready values
  const warnings = [];
  if (process.env.NEXTAUTH_SECRET === 'pBBkwWHoSFaBQUEC5ELtzSteLpMg5NaC9oluSpK3xGA=') {
    warnings.push('NEXTAUTH_SECRET is using development value');
  }
  if (process.env.STRIPE_SECRET_KEY?.includes('test')) {
    warnings.push('Stripe is using TEST keys (not LIVE)');
  }
  if (process.env.NEXTAUTH_URL?.includes('localhost')) {
    warnings.push('NEXTAUTH_URL is set to localhost');
  }

  if (warnings.length > 0) {
    results.push({
      name: 'Production Configuration',
      status: 'warning',
      message: 'Some values need updating for production',
      details: warnings.join(', '),
    });
  }
}

async function checkDatabaseSchema() {
  try {
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `;

    const requiredTables = ['User', 'Product', 'Order', 'Category', 'Cart'];
    const existingTables = tables.map((t) => t.tablename);
    const missing = requiredTables.filter((t) => !existingTables.includes(t));

    if (missing.length === 0) {
      results.push({
        name: 'Database Schema',
        status: 'pass',
        message: `All required tables exist (${existingTables.length} tables)`,
      });
    } else {
      results.push({
        name: 'Database Schema',
        status: 'fail',
        message: 'Missing required tables',
        details: missing.join(', '),
      });
    }
  } catch (error) {
    results.push({
      name: 'Database Schema',
      status: 'fail',
      message: 'Failed to check database schema',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

async function checkAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      results.push({
        name: 'Admin User',
        status: 'warning',
        message: 'ADMIN_EMAIL not configured',
      });
      return;
    }

    const admin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (admin) {
      results.push({
        name: 'Admin User',
        status: 'pass',
        message: `Admin user exists: ${adminEmail}`,
      });
    } else {
      results.push({
        name: 'Admin User',
        status: 'warning',
        message: 'Admin user not found in database',
        details: `Create admin user with email: ${adminEmail}`,
      });
    }
  } catch (error) {
    results.push({
      name: 'Admin User',
      status: 'fail',
      message: 'Failed to check admin user',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

async function checkProducts() {
  try {
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();

    if (productCount > 0 && categoryCount > 0) {
      results.push({
        name: 'Product Catalog',
        status: 'pass',
        message: `${productCount} products, ${categoryCount} categories`,
      });
    } else {
      results.push({
        name: 'Product Catalog',
        status: 'warning',
        message: 'No products or categories found',
        details: 'Run: npm run prisma:seed',
      });
    }
  } catch (error) {
    results.push({
      name: 'Product Catalog',
      status: 'fail',
      message: 'Failed to check products',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

function printResults() {
  console.log('\n' + '='.repeat(70));
  console.log('  PRE-DEPLOYMENT READINESS CHECK');
  console.log('='.repeat(70) + '\n');

  let passCount = 0;
  let failCount = 0;
  let warningCount = 0;

  results.forEach((result) => {
    const icon =
      result.status === 'pass' ? '✓' : result.status === 'fail' ? '✗' : '⚠';
    const color =
      result.status === 'pass'
        ? '\x1b[32m'
        : result.status === 'fail'
        ? '\x1b[31m'
        : '\x1b[33m';
    const reset = '\x1b[0m';

    console.log(`${color}${icon} ${result.name}${reset}`);
    console.log(`  ${result.message}`);
    if (result.details) {
      console.log(`  Details: ${result.details}`);
    }
    console.log('');

    if (result.status === 'pass') passCount++;
    else if (result.status === 'fail') failCount++;
    else warningCount++;
  });

  console.log('='.repeat(70));
  console.log(
    `Results: ${passCount} passed, ${failCount} failed, ${warningCount} warnings`
  );
  console.log('='.repeat(70) + '\n');

  if (failCount > 0) {
    console.log('\x1b[31m❌ NOT READY FOR DEPLOYMENT\x1b[0m');
    console.log('Please fix the failed checks before deploying.\n');
    process.exit(1);
  } else if (warningCount > 0) {
    console.log('\x1b[33m⚠️  READY WITH WARNINGS\x1b[0m');
    console.log('Review warnings before deploying to production.\n');
  } else {
    console.log('\x1b[32m✅ READY FOR DEPLOYMENT\x1b[0m\n');
  }
}

async function main() {
  console.log('Running pre-deployment checks...\n');

  await checkEnvironmentVariables();
  await checkDatabase();
  await checkDatabaseSchema();
  await checkAdminUser();
  await checkProducts();

  await prisma.$disconnect();

  printResults();
}

main().catch((error) => {
  console.error('Check failed:', error);
  process.exit(1);
});
