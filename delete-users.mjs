import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllUsers() {
  try {
    console.log("🗑️  Deleting all users and related data...\n");

    // Delete in order of foreign key dependencies
    const tokensDeleted = await prisma.verificationToken.deleteMany({});
    console.log(`✓ Deleted ${tokensDeleted.count} verification tokens`);

    const sessionsDeleted = await prisma.session.deleteMany({});
    console.log(`✓ Deleted ${sessionsDeleted.count} sessions`);

    const accountsDeleted = await prisma.account.deleteMany({});
    console.log(`✓ Deleted ${accountsDeleted.count} OAuth accounts`);

    const reviewsDeleted = await prisma.review.deleteMany({});
    console.log(`✓ Deleted ${reviewsDeleted.count} reviews`);

    const wishlistDeleted = await prisma.wishlist.deleteMany({});
    console.log(`✓ Deleted ${wishlistDeleted.count} wishlist items`);

    const orderItemsDeleted = await prisma.orderItem.deleteMany({});
    console.log(`✓ Deleted ${orderItemsDeleted.count} order items`);

    const ordersDeleted = await prisma.order.deleteMany({});
    console.log(`✓ Deleted ${ordersDeleted.count} orders`);

    const usersDeleted = await prisma.user.deleteMany({});
    console.log(`✓ Deleted ${usersDeleted.count} users`);

    console.log("\n✅ All users and emails deleted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllUsers();
