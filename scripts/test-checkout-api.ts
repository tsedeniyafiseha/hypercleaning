// Test the checkout API endpoint
async function testCheckoutAPI() {
  try {
    const testData = {
      items: [
        {
          id: 1,
          name: "Test Product",
          srcUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          price: 29.99,
          quantity: 2
        }
      ],
      adjustedTotalPrice: 59.98,
      customerEmail: "test@example.com",
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

    console.log('Testing checkout API...');
    console.log('Request data:', JSON.stringify(testData, null, 2));

    const response = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('\nResponse status:', response.status);
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✓ Checkout API working!');
    } else {
      console.log('\n✗ Checkout API failed');
    }

  } catch (error) {
    console.error('✗ Error testing checkout:', error);
  }
}

testCheckoutAPI();
