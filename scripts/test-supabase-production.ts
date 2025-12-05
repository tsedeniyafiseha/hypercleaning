import { PrismaClient } from '@prisma/client';

const DATABASE_URL = "postgresql://postgres.tgdfkmtwwyrzkgtcjdaf:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL
      }
    }
  });

  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Successfully connected to Supabase!\n');

    // Test query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('📊 Database version:', result);

    console.log('\n✅ Connection test passed!');
    console.log('🎉 Your Supabase database is ready for production!\n');

  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nFull error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
