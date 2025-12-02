// Simple database cleanup script
// Run with: node cleanup-db.js

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function cleanupDatabase() {
  try {
    console.log("🗑️  Starting database cleanup...\n");

    // Delete in order of dependencies (foreign keys)
    
    // 1. Delete verification tokens
    const tokensDeleted = await prisma.verificationToken.deleteMany({});
    console.log(`✓ Deleted ${tokensDeleted.count} verification tokens`);

    // 2. Delete sessions
    const sessionsDeleted = await prisma.session.deleteMany({});
    console.log(`✓ Deleted ${sessionsDeleted.count} sessions`);

    // 3. Delete accounts (OAuth)
    const accountsDeleted = await prisma.account.deleteMany({});
    console.log(`✓ Deleted ${accountsDeleted.count} OAuth accounts`);

    // 4. Delete reviews
    const reviewsDeleted = await prisma.review.deleteMany({});
    console.log(`✓ Deleted ${reviewsDeleted.count} reviews`);

    // 5. Delete wishlist items
    const wishlistDeleted = await prisma.wishlist.deleteMany({});
    console.log(`✓ Deleted ${wishlistDeleted.count} wishlist items`);

    // 6. Delete order items
    const orderItemsDeleted = await prisma.orderItem.deleteMany({});
    console.log(`✓ Deleted ${orderItemsDeleted.count} order items`);

    // 7. Delete orders
    const ordersDeleted = await prisma.order.deleteMany({});
    console.log(`✓ Deleted ${ordersDeleted.count} orders`);

    // 8. Delete users
    const usersDeleted = await prisma.user.deleteMany({});
    console.log(`✓ Deleted ${usersDeleted.count} users`);

    console.log("\n✅ Database cleanup complete!");
    console.log("All users, emails, and related data have been deleted.\n");

  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDatabase();
