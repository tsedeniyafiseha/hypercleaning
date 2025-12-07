/**
 * Search for users by email pattern
 */

import { prisma } from "../src/lib/prisma";

async function searchUser() {
  const searchPattern = process.argv[2] || "tsedeniya";
  
  console.log(`🔍 Searching for users matching: "${searchPattern}"\n`);

  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: searchPattern,
          mode: "insensitive",
        },
      },
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
    });

    if (users.length === 0) {
      console.log(`✅ No users found matching "${searchPattern}"`);
      process.exit(0);
    }

    console.log(`Found ${users.length} user(s):\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name || "Not set"}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Email Verified: ${user.emailVerified ? "Yes" : "No"}`);
      console.log(`   Orders: ${user._count.Order}`);
      console.log(`   Reviews: ${user._count.Review}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log("");
    });

    console.log("\nTo remove a user, run:");
    console.log("npx tsx scripts/remove-user.ts <email>");

  } catch (error) {
    console.error("\n❌ Error searching users:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

searchUser();
