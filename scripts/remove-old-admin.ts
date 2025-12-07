/**
 * Remove old admin user from database
 */

import { prisma } from "../src/lib/prisma";

async function removeOldAdmin() {
  console.log("🗑️  Removing old admin user...\n");

  const oldAdminEmail = "tsedeniyafisehaw@gmail.com";

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: oldAdminEmail },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        _count: {
          select: {
            Order: true,
          },
        },
      },
    });

    if (!user) {
      console.log("✅ User not found - nothing to remove");
      console.log(`   Email: ${oldAdminEmail}`);
      process.exit(0);
    }

    console.log("📋 User found:");
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name || "Not set"}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Orders: ${user._count.Order}`);

    if (user._count.Order > 0) {
      console.log("\n⚠️  WARNING: This user has orders associated with them.");
      console.log("   Deleting this user will also delete their orders.");
      console.log("\n   If you want to keep the orders, consider:");
      console.log("   1. Changing the user's role to 'user' instead of deleting");
      console.log("   2. Reassigning orders to another user");
    }

    console.log("\n🗑️  Deleting user...");

    // Delete the user (cascade will handle related records)
    await prisma.user.delete({
      where: { email: oldAdminEmail },
    });

    console.log("✅ User deleted successfully!");
    console.log(`   Removed: ${oldAdminEmail}`);

    // Verify deletion
    const checkUser = await prisma.user.findUnique({
      where: { email: oldAdminEmail },
    });

    if (!checkUser) {
      console.log("\n✅ Verification: User no longer exists in database");
    } else {
      console.log("\n❌ Warning: User still exists after deletion attempt");
    }

    console.log("\n📊 Current admin users:");
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: {
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (admins.length === 0) {
      console.log("   No admin users found");
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

removeOldAdmin();
