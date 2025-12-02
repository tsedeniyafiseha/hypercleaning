import { prisma } from '../src/lib/prisma';

async function checkUserOrders() {
  try {
    console.log('🔍 Checking user orders in database...\n');

    // Get all users
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true }
    });

    console.log(`Found ${users.length} users:\n`);
    users.forEach(user => {
      console.log(`  - ${user.email} (ID: ${user.id})`);
    });

    // Get all orders
    const orders = await prisma.order.findMany({
      include: {
        OrderItem: true,
        User: { select: { email: true } }
      }
    });

    console.log(`\nFound ${orders.length} orders:\n`);
    
    if (orders.length === 0) {
      console.log('❌ No orders found in database!');
      console.log('\nTo create an order:');
      console.log('1. Sign in to the app');
      console.log('2. Add products to cart');
      console.log('3. Go to checkout');
      console.log('4. Fill in shipping details');
      console.log('5. Submit order');
    } else {
      orders.forEach(order => {
        console.log(`Order #${order.id}:`);
        console.log(`  User: ${order.User?.email || 'Guest'} (userId: ${order.userId})`);
        console.log(`  Status: ${order.status}`);
        console.log(`  Total: $${order.totalAmount}`);
        console.log(`  Items: ${order.OrderItem.length}`);
        order.OrderItem.forEach(item => {
          console.log(`    - ${item.name} x${item.quantity} ($${item.unitPrice})`);
        });
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserOrders();
