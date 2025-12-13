/**
 * Check Prisma Connection Status
 * Verifies if Prisma is properly connected to the database
 */

import { PrismaClient } from '@prisma/client';
import { testDatabaseConnection, prisma } from '../src/lib/prisma';
import { validateDatabaseConnection, healthCheck, getDatabaseStatus } from '../src/lib/db-connection';

async function checkConnection() {
  console.log('🔍 Checking Prisma Database Connection\n');
  console.log('='.repeat(60));

  // Check environment variables
  console.log('\n📋 Step 1: Environment Variables');
  console.log('   DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('   DIRECT_URL:', process.env.DIRECT_URL ? '✅ Set' : '⚠️  Not set (optional)');
  
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    console.log('   Host:', url.hostname);
    console.log('   Port:', url.port || '5432 (default)');
    console.log('   Database:', url.pathname.slice(1) || 'default');
    console.log('   Using:', url.port === '6543' ? '⚠️  Pooler (slow)' : '✅ Direct (fast)');
  }

  // Test basic connection
  console.log('\n📋 Step 2: Basic Connection Test');
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1 as test`;
    const latency = Date.now() - startTime;
    console.log(`   ✅ Connected successfully`);
    console.log(`   ⚡ Latency: ${latency}ms`);
    
    if (latency < 500) {
      console.log('   🚀 Performance: Excellent');
    } else if (latency < 2000) {
      console.log('   ⚡ Performance: Good');
    } else if (latency < 5000) {
      console.log('   ⚠️  Performance: Slow (consider direct connection)');
    } else {
      console.log('   🐌 Performance: Very Slow (use direct connection)');
    }
  } catch (error: any) {
    console.log('   ❌ Connection failed');
    console.log('   Error:', error.message);
    if (error.code === 'P1001') {
      console.log('   💡 Tip: Check if database server is running');
    } else if (error.code === 'P1000') {
      console.log('   💡 Tip: Check credentials in DATABASE_URL');
    }
    return;
  }

  // Test connection utility
  console.log('\n📋 Step 3: Connection Utility Test');
  try {
    const isConnected = await testDatabaseConnection();
    console.log('   ✅ Connection utility working');
    console.log('   Status:', isConnected ? 'Connected' : 'Disconnected');
  } catch (error: any) {
    console.log('   ❌ Connection utility failed');
    console.log('   Error:', error.message);
  }

  // Validate connection
  console.log('\n📋 Step 4: Connection Validation');
  try {
    const { connected, error } = await validateDatabaseConnection();
    if (connected) {
      console.log('   ✅ Connection validated');
    } else {
      console.log('   ❌ Validation failed');
      console.log('   Error:', error);
    }
  } catch (error: any) {
    console.log('   ❌ Validation error');
    console.log('   Error:', error.message);
  }

  // Health check
  console.log('\n📋 Step 5: Health Check');
  try {
    const health = await healthCheck();
    if (health.healthy) {
      console.log('   ✅ Health check passed');
      console.log(`   ⚡ Latency: ${health.latency}ms`);
    } else {
      console.log('   ❌ Health check failed');
      console.log('   Error:', health.error);
    }
  } catch (error: any) {
    console.log('   ❌ Health check error');
    console.log('   Error:', error.message);
  }

  // Database status
  console.log('\n📋 Step 6: Database Status');
  try {
    const status = await getDatabaseStatus();
    console.log('   Status:', status.status);
    console.log('   Response Time:', status.responseTime);
    console.log('   Timestamp:', status.timestamp);
  } catch (error: any) {
    console.log('   ❌ Status check failed');
    console.log('   Error:', error.message);
  }

  // Test query
  console.log('\n📋 Step 7: Query Test');
  try {
    const startTime = Date.now();
    const result = await prisma.$queryRaw`SELECT version() as version`;
    const queryTime = Date.now() - startTime;
    console.log('   ✅ Query executed successfully');
    console.log(`   ⚡ Query Time: ${queryTime}ms`);
    if (Array.isArray(result) && result.length > 0) {
      const version = (result[0] as any)?.version || 'Unknown';
      console.log('   Database Version:', version.substring(0, 50) + '...');
    }
  } catch (error: any) {
    console.log('   ❌ Query failed');
    console.log('   Error:', error.message);
  }

  // Check tables
  console.log('\n📋 Step 8: Database Tables Check');
  try {
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename
    `;
    console.log(`   ✅ Found ${tables.length} tables`);
    if (tables.length > 0) {
      console.log('   Tables:', tables.map(t => t.tablename).join(', '));
    } else {
      console.log('   ⚠️  No tables found - run migrations: npm run prisma:migrate');
    }
  } catch (error: any) {
    console.log('   ❌ Table check failed');
    console.log('   Error:', error.message);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Prisma Connection Check Complete');
  console.log('\n💡 Recommendations:');
  
  if (process.env.DATABASE_URL?.includes(':6543')) {
    console.log('   - Switch to direct connection (port 5432) for faster performance');
    console.log('   - Update DATABASE_URL to use port 5432 instead of 6543');
  }
  
  console.log('\n📝 Next Steps:');
  console.log('   1. If connection is slow, switch to direct connection');
  console.log('   2. If tables are missing, run: npm run prisma:migrate');
  console.log('   3. If connection fails, check DATABASE_URL in .env.local');

  // Cleanup
  await prisma.$disconnect();
  console.log('\n✅ Connection closed');
}

checkConnection().catch((error) => {
  console.error('\n❌ Connection check failed:', error);
  process.exit(1);
});



