/**
 * Test script for contact form functionality
 * Tests SMTP configuration and contact form submission
 */

async function testContactForm() {
  console.log("🧪 Testing Contact Form...\n");

  // Check environment variables
  console.log("1️⃣ Checking SMTP Configuration:");
  const requiredVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "FROM_EMAIL", "ADMIN_EMAIL"];
  
  let allPresent = true;
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value) {
      console.log(`   ✅ ${varName}: ${varName.includes("PASS") ? "***" : value.substring(0, 20)}...`);
    } else {
      console.log(`   ❌ ${varName}: MISSING`);
      allPresent = false;
    }
  }

  if (!allPresent) {
    console.log("\n❌ SMTP configuration incomplete. Please check your .env file.");
    process.exit(1);
  }

  console.log("\n2️⃣ Testing Contact Form API:");
  
  const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+64 22 123 4567",
    message: "This is a test message from the contact form test script.",
  };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("   ✅ Contact form submission successful");
      console.log(`   📧 Response: ${data.message}`);
    } else {
      console.log("   ❌ Contact form submission failed");
      console.log(`   Error: ${data.error || JSON.stringify(data)}`);
      process.exit(1);
    }
  } catch (error) {
    console.log("   ❌ Failed to test contact form");
    console.error(`   Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }

  console.log("\n✅ All contact form tests passed!");
}

testContactForm().catch((error) => {
  console.error("Test failed:", error);
  process.exit(1);
});
