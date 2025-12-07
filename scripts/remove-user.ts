/**
 * Remove a specific user from database
 * Usage: npx tsx scripts/remove-user.ts <email>
 */

import { prisma } from "../src/lib/prisma";

async function removeUser() {
  const emailToRemove = process.argv[2];

  if (!emailToRemove) {
    console.log("❌ Please provide an email address");
    console.log("\nUsage: npx tsx scripts/remove-user.ts <email>");
    console.log("Example: npx tsx scripts/remove-user.ts admin@localhost.com");
    process.exit(1);
  }

  console.log(`🗑️  Removing user: ${emailToRemove}\n`);

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: emailToRemove },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        _count: {
          select: {
            Order: true,
            Review: true,
            Wishlist: true,
          },
        },
      },
    });

    if (!user) {
      console.log("✅ User not found - nothing to remove");
      console.log(`   Email: ${emailToRemove}`);
      process.exit(0);
    }

    console.log("📋 User found:");
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name || "Not set"}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Orders: ${user._count.Order}`);
    console.log(`   Reviews: ${user._count.Review}`);
    console.log(`   Wishlist Items: ${user._count.Wishlist}`);

    const totalRecords = user._count.Order + user._count.Review + user._count.Wishlist;

    if (totalRecords > 0) {
      console.log(`\n⚠️  WARNING: This user has ${totalRecords} associated record(s).`);
      console.log("   Deleting this user will also delete:");
      if (user._count.Order > 0) console.log(`   - ${user._count.Order} order(s)`);
      if (user._count.Review > 0) console.log(`   - ${user._count.Review} review(s)`);
      if (user._count.Wishlist > 0) console.log(`   - ${user._count.Wishlist} wishlist item(s)`);
    }

    console.log("\n🗑️  Deleting user and all associated records...");

    // Delete the user (cascade will handle related records)
    await prisma.user.delete({
      where: { email: emailToRemove },
    });

    console.log("✅ User deleted successfully!");
    console.log(`   Removed: ${emailToRemove}`);

    // Verify deletion
    const checkUser = await prisma.user.findUnique({
      where: { email: emailToRemove },
    });

    if (!checkUser) {
      console.log("\n✅ Verification: User no longer exists in database");
    } else {
      console.log("\n❌ Warning: User still exists after deletion attempt");
    }

    // Show remaining admin users
    console.log("\n📊 Remaining admin users:");
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: {
        email: true,
        name: true,
      },
    });

    if (admins.length === 0) {
      console.log("   ⚠️  No admin users remaining!");
      console.log("   Run: npx tsx scripts/setup-production-admin.ts");
    } else {
      admins.forEach((admin) => {
        console.log(`   - ${admin.email} (${admin.name || "No name"})`);
      });
    }

  } catch (error) {
    console.error("\n❌ Error removing user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

removeUser();
