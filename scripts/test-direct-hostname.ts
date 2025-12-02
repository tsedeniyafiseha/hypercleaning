import { PrismaClient } from '@prisma/client';

async function testDirectHostname() {
  console.log('🔍 Testing Direct Supabase Hostname\n');
  
  const directUrl = 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@db.dhfflpixjzwxexvflpzk.supabase.co:5432/postgres';
  
  console.log('Testing: db.dhfflpixjzwxexvflpzk.supabase.co:5432\n');
  
  const prisma = new PrismaClient({
    datasources: { db: { url: directUrl } },
    log: ['error'],
  });

  try {
    console.log('Connecting...');
    await prisma.$connect();
    console.log('✅ Connected!\n');
    
    console.log('Running test query...');
    const result = await prisma.$queryRaw`SELECT 1 as test, current_database(), version()`;
    console.log('✅ Query successful!\n');
    console.log('Result:', result);
    
    console.log('\n🎉 SUCCESS! Direct hostname works!');
    console.log('Your .env files have been updated to use this connection.');
    
    await prisma.$disconnect();
    return true;
  } catch (error: any) {
    console.log('❌ Failed:', error.message);
    console.log('Code:', error.code);
    
    if (error.message.includes('Tenant or user not found')) {
      console.log('\n💡 This means the hostname is wrong or project is paused.');
      console.log('Check your Supabase dashboard for the correct connection string.');
    }
    
    await prisma.$disconnect();
    return false;
  }
}

testDirectHostname();
