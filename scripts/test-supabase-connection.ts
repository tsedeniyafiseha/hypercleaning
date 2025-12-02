import { PrismaClient } from '@prisma/client';

// Test different connection configurations
const connections = [
  {
    name: 'Transaction Pooler (port 6543)',
    url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
  },
  {
    name: 'Session Pooler (port 5432)',
    url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-1-eu-west-1.pooler.supabase.com:5432/postgres',
  },
  {
    name: 'Direct Connection (port 5432)',
    url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-0-eu-west-1.pooler.supabase.com:5432/postgres',
  },
];

async function testConnection(name: string, url: string) {
  console.log(`\n🔍 Testing: ${name}`);
  console.log(`URL: ${url.replace(/:[^:@]+@/, ':****@')}\n`);

  const prisma = new PrismaClient({
    datasources: {
      db: { url },
    },
    log: ['error'],
  });

  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log(`✅ SUCCESS: ${name}`);
    console.log(`   Result:`, result);
    await prisma.$disconnect();
    return true;
  } catch (error: any) {
    console.log(`❌ FAILED: ${name}`);
    console.log(`   Error: ${error.message}`);
    console.log(`   Code: ${error.code || 'N/A'}`);
    await prisma.$disconnect();
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Supabase Connection Options\n');
  console.log('=' .repeat(60));

  let successCount = 0;

  for (const conn of connections) {
    const success = await testConnection(conn.name, conn.url);
    if (success) successCount++;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Results: ${successCount}/${connections.length} connections successful\n`);

  if (successCount === 0) {
    console.log('⚠️  No connections worked. Possible issues:');
    console.log('   1. Supabase project is paused (check dashboard)');
    console.log('   2. Firewall/network blocking connection');
    console.log('   3. Incorrect credentials');
    console.log('   4. Database region mismatch');
    console.log('\n💡 Next steps:');
    console.log('   - Check your Supabase dashboard');
    console.log('   - Verify project is active');
    console.log('   - Get fresh connection strings from Settings > Database');
  }
}

main();
