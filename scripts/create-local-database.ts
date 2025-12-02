/**
 * Create Local PostgreSQL Database
 */

import { Client } from "pg";

async function createDatabase() {
  console.log("🚀 Creating ecommerce_app database...\n");

  // Connect to default postgres database
  const client = new Client({
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "Diana$1321%",
    database: "postgres",
  });

  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL server");

    // Check if database already exists
    const checkDb = await client.query(
      "SELECT datname FROM pg_database WHERE datname = 'ecommerce_app'"
    );

    if (checkDb.rows.length > 0) {
      console.log("⚠️  Database 'ecommerce_app' already exists");
    } else {
      // Create database
      await client.query("CREATE DATABASE ecommerce_app");
      console.log("✅ Database 'ecommerce_app' created successfully");
    }

    await client.end();

    // Now test connection to new database
    console.log("\n🔍 Testing connection to ecommerce_app...");
    const testClient = new Client({
      host: "localhost",
      port: 5433,
      user: "postgres",
      password: "Diana$1321%",
      database: "ecommerce_app",
    });

    await testClient.connect();
    console.log("✅ Successfully connected to ecommerce_app database");
    
    const version = await testClient.query("SELECT version()");
    console.log(`✅ Database ready: ${version.rows[0].version.split(",")[0]}`);
    
    await testClient.end();

    console.log("\n" + "=".repeat(60));
    console.log("✅ DATABASE SETUP COMPLETE");
    console.log("=".repeat(60));
    console.log("\n📝 Next steps:");
    console.log("   1. Run: npm run prisma:migrate");
    console.log("   2. Run: npm run prisma:seed");
    console.log("   3. Run: npm run dev");

  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createDatabase();
