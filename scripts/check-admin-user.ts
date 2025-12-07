/**
 * Check if admin user exists and verify credentials
 */

import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function checkAdminUser() {
  console.log("🔍 Checking admin user...\n");

  const adminEmail = "taranveerebu340@gmail.com";

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        passwordHash: true,
        createdAt: true,
      },
    });

    if (!user) {
      console.log("❌ Admin user NOT found in database");
      console.log(`\nTo create admin user, run:`);
      console.log(`npx tsx scripts/setup-production-admin.ts`);
      process.exit(1);
    }

    console.log("✅ Admin user found:");
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name || "Not set"}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Email Verified: ${user.emailVerified ? "Yes" : "No"}`);
    console.log(`   Has Password: ${user.passwordHash ? "Yes" : "No"}`);
    console.log(`   Created: ${user.createdAt}`);

    if (!user.passwordHash) {
      console.log("\n❌ User has no password set!");
      console.log("This user might have been created via OAuth (Google).");
      console.log("\nTo set a password, run:");
      console.log(`npx tsx scripts/update-admin-password.ts`);
      process.exit(1);
    }

    if (user.role !== "admin") {
      console.log("\n⚠️  User exists but role is not 'admin'");
      console.log("Updating role to admin...");
      
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "admin" },
      });
      
      console.log("✅ Role updated to admin");
    }

    // Test password verification
    console.log("\n🔐 Testing password verification...");
    console.log("Note: You'll need to know the password to test this.");
    console.log("\nIf you don't know the password, run:");
    console.log(`npx tsx scripts/update-admin-password.ts`);

    console.log("\n✅ Admin user check complete!");
    console.log("\nTo login:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: [the password you set]`);

  } catch (error) {
    console.error("❌ Error checking admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminUser();
