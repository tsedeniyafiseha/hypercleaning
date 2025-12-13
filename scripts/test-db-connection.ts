import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Test 1: Basic connection
    console.log('Test 1: Basic connection test');
    await prisma.$connect();
    console.log('✅ Connected to database successfully\n');

    // Test 2: Simple query
    console.log('Test 2: Running simple query');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query executed:', result, '\n');

    // Test 3: Check database version
    console.log('Test 3: Checking PostgreSQL version');
    const version = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database version:', version, '\n');

    // Test 4: List tables
    console.log('Test 4: Checking tables');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log('✅ Tables found:', tables, '\n');

    // Test 5: Count records in key tables
    console.log('Test 5: Counting records in tables');
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    const orderCount = await prisma.order.count();
    
    console.log('📊 Record counts:');
    console.log(`  - Users: ${userCount}`);
    console.log(`  - Products: ${productCount}`);
    console.log(`  - Categories: ${categoryCount}`);
    console.log(`  - Orders: ${orderCount}\n`);

    // Test 6: Check Prisma client generation
    console.log('Test 6: Verifying Prisma client');
    console.log('✅ Prisma client is properly generated\n');

    console.log('🎉 All tests passed! Database connection is working correctly.');
    
  } catch (error: any) {
    console.error('❌ Database connection test failed:\n');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('\nFull error:', error);
    
    if (error.code === 'P1001') {
      console.error('\n💡 Tip: Cannot reach database server. Check your DATABASE_URL.');
    } else if (error.code === 'P1002') {
      console.error('\n💡 Tip: Connection timeout. Check your network or database server.');
    } else if (error.code === 'P1003') {
      console.error('\n💡 Tip: Database does not exist. Create the database first.');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

testConnection();


