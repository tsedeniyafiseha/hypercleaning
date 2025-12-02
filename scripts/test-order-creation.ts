import { prisma } from '../src/lib/prisma';

async function testOrderCreation() {
  try {
    console.log('Testing order creation...\n');

    // Test data
    const testData = {
      totalAmount: 59.98,
      currency: "usd",
      customerEmail: "test@example.com",
      status: "pending",
      shippingAddress: {
        fullName: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        addressLine1: "123 Test Street",
        city: "Test City",
        state: "TS",
        postalCode: "12345",
        country: "US"
      }
    };

    console.log('Creating order with data:', JSON.stringify(testData, null, 2));

    const order = await prisma.order.create({
      data: testData
    });

    console.log('\n✓ Order created successfully!');
    console.log('Order ID:', order.id);
    console.log('Order details:', JSON.stringify(order, null, 2));

    // Clean up - delete the test order
    await prisma.order.delete({
      where: { id: order.id }
    });
    console.log('\n✓ Test order cleaned up');

  } catch (error) {
    console.error('\n✗ Error creating order:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testOrderCreation();
