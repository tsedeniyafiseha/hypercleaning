import { PrismaClient } from '@prisma/client';
import * as net from 'net';
import * as dns from 'dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);

const host = 'aws-1-eu-west-1.pooler.supabase.com';
const ports = [5432, 6543];

async function checkDNS() {
  console.log('\n🔍 DNS Resolution Check');
  console.log('='.repeat(60));
  try {
    const addresses = await resolve4(host);
    console.log(`✅ DNS resolved: ${host}`);
    console.log(`   IP addresses: ${addresses.join(', ')}`);
    return true;
  } catch (error: any) {
    console.log(`❌ DNS resolution failed: ${error.message}`);
    return false;
  }
}

async function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 5000;

    socket.setTimeout(timeout);
    
    socket.on('connect', () => {
      console.log(`✅ Port ${port}: OPEN and accepting connections`);
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      console.log(`❌ Port ${port}: Connection timeout (${timeout}ms)`);
      socket.destroy();
      resolve(false);
    });

    socket.on('error', (err: any) => {
      console.log(`❌ Port ${port}: ${err.code || err.message}`);
      resolve(false);
    });

    console.log(`   Testing port ${port}...`);
    socket.connect(port, host);
  });
}

async function checkPorts() {
  console.log('\n🔍 Port Connectivity Check');
  console.log('='.repeat(60));
  
  for (const port of ports) {
    await checkPort(port);
  }
}

async function testPrismaConnection(url: string, name: string) {
  console.log(`\n🔍 Testing Prisma: ${name}`);
  console.log('='.repeat(60));
  
  const prisma = new PrismaClient({
    datasources: { db: { url } },
    log: ['error', 'warn'],
  });

  try {
    console.log('   Connecting...');
    await prisma.$connect();
    console.log('   ✅ Connected');
    
    console.log('   Running query...');
    const result = await prisma.$queryRaw`SELECT current_database(), version()`;
    console.log('   ✅ Query successful');
    console.log('   Result:', result);
    
    await prisma.$disconnect();
    return true;
  } catch (error: any) {
    console.log(`   ❌ Failed: ${error.message}`);
    console.log(`   Error code: ${error.code || 'N/A'}`);
    await prisma.$disconnect();
    return false;
  }
}

async function checkSupabaseStatus() {
  console.log('\n🔍 Checking Supabase Project Status');
  console.log('='.repeat(60));
  
  try {
    const response = await fetch(`https://${host.replace('.pooler', '')}/rest/v1/`, {
      method: 'HEAD',
    });
    console.log(`✅ Supabase project is responding (HTTP ${response.status})`);
  } catch (error: any) {
    console.log(`⚠️  Could not reach Supabase REST API: ${error.message}`);
    console.log('   This might indicate the project is paused or inactive');
  }
}

async function main() {
  console.log('\n🚀 COMPREHENSIVE SUPABASE DIAGNOSTICS');
  console.log('='.repeat(60));
  console.log(`Host: ${host}`);
  console.log(`Time: ${new Date().toISOString()}`);
  
  // Step 1: DNS
  const dnsOk = await checkDNS();
  if (!dnsOk) {
    console.log('\n❌ CRITICAL: DNS resolution failed. Cannot proceed.');
    return;
  }

  // Step 2: Port connectivity
  await checkPorts();

  // Step 3: Supabase status
  await checkSupabaseStatus();

  // Step 4: Prisma connections
  const connections = [
    {
      name: 'Transaction Pooler (6543)',
      url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    },
    {
      name: 'Session Pooler (5432)',
      url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-1-eu-west-1.pooler.supabase.com:5432/postgres',
    },
  ];

  for (const conn of connections) {
    await testPrismaConnection(conn.url, conn.name);
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n💡 RECOMMENDATIONS:');
  console.log('   1. Check Supabase dashboard: https://supabase.com/dashboard');
  console.log('   2. Verify project is not paused');
  console.log('   3. Check if you have connection pooling enabled');
  console.log('   4. Try getting fresh connection strings from Settings > Database');
  console.log('   5. Check for any firewall/antivirus blocking connections');
  console.log('   6. Verify your Supabase project region matches the connection string');
  console.log('\n');
}

main().catch(console.error);
