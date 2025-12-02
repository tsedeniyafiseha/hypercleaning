/**
 * Diagnose Local PostgreSQL Connection
 */

import { Client } from "pg";

async function checkPostgresRunning() {
  console.log("🔍 Checking if PostgreSQL is running...\n");
  
  const client = new Client({
    host: "localhost",
    port: 5433, // Updated to correct port
    user: "postgres",
    password: "Diana$1321%",
    database: "postgres", // Try default database first
  });

  try {
    await client.connect();
    console.log("✅ PostgreSQL server is running");
    
    const result = await client.query("SELECT version()");
    console.log(`✅ Version: ${result.rows[0].version}`);
    
    // Check if database exists
    const dbCheck = await client.query(
      "SELECT datname FROM pg_database WHERE datname = 'ecommerce_app'"
    );
    
    if (dbCheck.rows.length > 0) {
      console.log("✅ Database 'ecommerce_app' exists");
    } else {
      console.log("⚠️  Database 'ecommerce_app' does NOT exist");
      console.log("\n📝 To create it, run:");
      console.log('   psql -U postgres -c "CREATE DATABASE ecommerce_app;"');
    }
    
    await client.end();
    return true;
  } catch (error: any) {
    console.log("❌ Failed to connect to PostgreSQL");
    console.log(`   Error: ${error.message}`);
    console.log("\n📝 Possible issues:");
    console.log("   1. PostgreSQL is not running");
    console.log("   2. Password is incorrect");
    console.log("   3. User 'postgres' doesn't exist");
    console.log("   4. PostgreSQL is not listening on localhost:5432");
    console.log("\n📝 To check if PostgreSQL is running:");
    console.log("   Windows: Check Services for 'postgresql' service");
    console.log("   Or run: pg_isready -h localhost -p 5432");
    return false;
  }
}

async function testWithEcommerceDb() {
  console.log("\n🔍 Testing connection to ecommerce_app database...\n");
  
  const client = new Client({
    host: "localhost",
    port: 5433, // Updated to correct port
    user: "postgres",
    password: "Diana$1321%",
    database: "ecommerce_app",
  });

  try {
    await client.connect();
    console.log("✅ Connected to ecommerce_app database");
    
    // Check if tables exist
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tableCheck.rows.length > 0) {
      console.log(`✅ Found ${tableCheck.rows.length} tables:`);
      tableCheck.rows.forEach((row) => {
        console.log(`   - ${row.table_name}`);
      });
    } else {
      console.log("⚠️  No tables found. You need to run migrations:");
      console.log("   npm run prisma:migrate");
    }
    
    await client.end();
  } catch (error: any) {
    console.log("❌ Failed to connect to ecommerce_app database");
    console.log(`   Error: ${error.message}`);
  }
}

async function run() {
  console.log("=" .repeat(60));
  console.log("PostgreSQL Local Database Diagnostics");
  console.log("=" .repeat(60) + "\n");
  
  const serverRunning = await checkPostgresRunning();
  
  if (serverRunning) {
    await testWithEcommerceDb();
  }
  
  console.log("\n" + "=" .repeat(60));
  console.log("Diagnostic Complete");
  console.log("=" .repeat(60));
}

run().catch(console.error);
