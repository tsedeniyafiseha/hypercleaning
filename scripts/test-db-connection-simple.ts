/**
 * Simple database connection test
 */

import { prisma } from "../src/lib/prisma";

async function testConnection() {
  console.log("🔍 Testing database connection...\n");

  try {
    // Test basic query
    console.log("1. Testing basic query...");
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("   ✅ Basic query successful:", result);

    // Count users
    console.log("\n2. Counting users...");
    const userCount = await prisma.user.count();
    console.log(`   ✅ Found ${userCount} users in database`);

    // Count products
    console.log("\n3. Counting products...");
    const productCount = await prisma.product.count();
    console.log(`   ✅ Found ${productCount} products in database`);

    // List admin users
    console.log("\n4. Listing admin users...");
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: {
        email: true,
        name: true,
        role: true,
      },
    });
    
    if (admins.length === 0) {
      console.log("   ⚠️  No admin users found");
    } else {
      console.log(`   ✅ Found ${admins.length} admin user(s):`);
      admins.forEach((admin) => {
        console.log(`      - ${admin.email} (${admin.name})`);
      });
    }

    console.log("\n✅ All database connection tests passed!");
    console.log("\n📊 Summary:");
    console.log(`   Users: ${userCount}`);
    console.log(`   Products: ${productCount}`);
    console.log(`   Admins: ${admins.length}`);

  } catch (error) {
    console.error("\n❌ Database connection test failed!");
    console.error("Error:", error);
    
    if (error instanceof Error) {
      console.error("\nError details:");
      console.error("  Message:", error.message);
      console.error("  Name:", error.name);
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
