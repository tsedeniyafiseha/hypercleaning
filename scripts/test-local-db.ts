/**
 * Test Local PostgreSQL Connection
 * Tests different password encodings
 */

import { Client } from "pg";

const password = "Diana$1321%";

// Test different encodings
const encodings = [
  { name: "No encoding", password: password },
  { name: "$ as %24", password: "Diana%241321%25" },
  { name: "$ as %24, % as %25", password: "Diana%241321%2525" },
  { name: "URL encoded", password: encodeURIComponent(password) },
];

async function testConnection(encoding: { name: string; password: string }) {
  console.log(`\n🔍 Testing: ${encoding.name}`);
  console.log(`   Password: ${encoding.password}`);

  const connectionString = `postgresql://postgres:${encoding.password}@localhost:5432/ecommerce_app`;
  
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log(`   ✅ SUCCESS - Connection established!`);
    
    // Test query
    const result = await client.query("SELECT version()");
    console.log(`   Database: ${result.rows[0].version.split(" ")[0]}`);
    
    await client.end();
    return true;
  } catch (error: any) {
    console.log(`   ❌ FAILED - ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log("🚀 Testing Local PostgreSQL Connection\n");
  console.log("=" .repeat(60));

  for (const encoding of encodings) {
    const success = await testConnection(encoding);
    if (success) {
      console.log("\n" + "=".repeat(60));
      console.log("✅ FOUND WORKING CONNECTION!");
      console.log("=".repeat(60));
      console.log(`\nUse this in your .env file:`);
      console.log(`DATABASE_URL="postgresql://postgres:${encoding.password}@localhost:5432/ecommerce_app?schema=public"`);
      break;
    }
  }
}

runTests().catch(console.error);
