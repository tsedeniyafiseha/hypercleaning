/**
 * Helper script to show how to switch from pooler to direct connection
 * This script checks your current connection and provides instructions
 */

import { PrismaClient } from '@prisma/client';

async function checkAndRecommend() {
  console.log('🔄 Connection Type Checker\n');
  console.log('='.repeat(60));

  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.log('❌ DATABASE_URL is not set');
    console.log('   Please set DATABASE_URL in .env.local');
    return;
  }

  try {
    const url = new URL(dbUrl);
    const isPooler = url.port === '6543' || url.hostname.includes('pooler');
    const isDirect = url.port === '5432' && !url.hostname.includes('pooler');

    console.log('\n📋 Current Connection:');
    console.log('   Host:', url.hostname);
    console.log('   Port:', url.port || '5432 (default)');
    console.log('   Type:', isPooler ? '⚠️  Pooler (Slow)' : isDirect ? '✅ Direct (Fast)' : '❓ Unknown');

    if (isPooler) {
      console.log('\n💡 Recommendation: Switch to Direct Connection');
      console.log('\n📝 To switch to direct connection:');
      console.log('\n1. Go to Supabase Dashboard → Settings → Database');
      console.log('2. Copy the "Direct connection" string (not Transaction pooler)');
      console.log('3. Update DATABASE_URL in .env.local:');
      console.log('\n   Change from:');
      console.log(`   DATABASE_URL="${dbUrl}"`);
      console.log('\n   To (example):');
      const directUrl = dbUrl
        .replace(':6543', ':5432')
        .replace('pooler.supabase.com', 'supabase.com')
        .replace('aws-1-', 'aws-0-')
        .replace('?pgbouncer=true', '')
        .replace('&pgbouncer=true', '');
      console.log(`   DATABASE_URL="${directUrl}"`);
      console.log('\n4. Also update DIRECT_URL:');
      console.log(`   DIRECT_URL="${directUrl}"`);
      console.log('\n5. Restart dev server: npm run dev');
      console.log('\n6. Test connection: npm run check:db');

      // Test current connection speed
      console.log('\n⏱️  Testing current connection speed...');
      const prisma = new PrismaClient();
      try {
        const startTime = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        const latency = Date.now() - startTime;
        console.log(`   Current Latency: ${latency}ms`);
        
        if (latency > 5000) {
          console.log('   🐌 Very Slow - Definitely switch to direct connection!');
        } else if (latency > 2000) {
          console.log('   ⚠️  Slow - Consider switching to direct connection');
        } else {
          console.log('   ⚡ Acceptable - But direct connection will be faster');
        }
      } catch (error: any) {
        console.log('   ❌ Connection test failed:', error.message);
      } finally {
        await prisma.$disconnect();
      }
    } else if (isDirect) {
      console.log('\n✅ Already using direct connection!');
      console.log('   Your connection is optimized for development.');
      
      // Test connection speed
      console.log('\n⏱️  Testing connection speed...');
      const prisma = new PrismaClient();
      try {
        const startTime = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        const latency = Date.now() - startTime;
        console.log(`   Latency: ${latency}ms`);
        
        if (latency < 500) {
          console.log('   🚀 Excellent performance!');
        } else if (latency < 2000) {
          console.log('   ⚡ Good performance!');
        } else {
          console.log('   ⚠️  Still slow - check network or database load');
        }
      } catch (error: any) {
        console.log('   ❌ Connection test failed:', error.message);
      } finally {
        await prisma.$disconnect();
      }
    } else {
      console.log('\n❓ Unknown connection type');
      console.log('   Please verify your DATABASE_URL format');
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n📚 For more information, see: SWITCH_TO_DIRECT_CONNECTION.md');

  } catch (error) {
    console.log('❌ Error parsing DATABASE_URL:', error);
    console.log('   Please check your connection string format');
  }
}

checkAndRecommend().catch(console.error);

