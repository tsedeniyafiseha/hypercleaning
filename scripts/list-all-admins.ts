/**
 * List all admin users in the database
 */

import { prisma } from "../src/lib/prisma";

async function listAllAdmins() {
  console.log("👥 Listing all admin users...\n");

  try {
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        _count: {
          select: {
            Order: true,
            Review: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (admins.length === 0) {
      console.log("❌ No admin users found in database");
      console.log("\nTo create an admin user, run:");
      console.log("npx tsx scripts/setup-production-admin.ts");
      process.exit(1);
    }

    console.log(`✅ Found ${admins.length} admin user(s):\n`);

    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.email}`);
      console.log(`   Name: ${admin.name || "Not set"}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Email Verified: ${admin.emailVerified ? "Yes" : "No"}`);
      console.log(`   Orders: ${admin._count.Order}`);
      console.log(`   Reviews: ${admin._count.Review}`);
      console.log(`   Created: ${admin.createdAt}`);
      console.log("");
    });

    // Also list all users for reference
    const allUsers = await prisma.user.findMany({
      select: {
        email: true,
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`\n📊 Total users in database: ${allUsers.length}`);
    console.log("\nAll users:");
    allUsers.forEach((user) => {
      console.log(`   - ${user.email} (${user.role})`);
    });

  } catch (error) {
    console.error("\n❌ Error listing admins:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

listAllAdmins();
