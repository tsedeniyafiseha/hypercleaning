import * as net from 'net';
import * as dns from 'dns';
import { promisify } from 'util';

const resolve = promisify(dns.resolve);

async function testConnection() {
  console.log('=== NETWORK CONNECTIVITY TEST ===\n');

  const hosts = [
    'aws-1-eu-west-1.pooler.supabase.com',
    'aws-0-eu-west-1.pooler.supabase.com',
    'db.dhfflpixjzwxexvflpzk.supabase.co',
  ];

  const port = 6543;

  for (const host of hosts) {
    console.log(`Testing: ${host}:${port}`);
    
    // DNS resolution test
    try {
      const addresses = await resolve(host);
      console.log(`  ✓ DNS resolved to: ${addresses.join(', ')}`);
    } catch (error: any) {
      console.log(`  ✗ DNS resolution failed: ${error.message}`);
      continue;
    }

    // TCP connection test
    await new Promise<void>((resolve) => {
      const socket = net.createConnection({ host, port, timeout: 5000 });
      
      socket.on('connect', () => {
        console.log(`  ✓ TCP connection successful`);
        socket.end();
        resolve();
      });

      socket.on('timeout', () => {
        console.log(`  ✗ Connection timeout`);
        socket.destroy();
        resolve();
      });

      socket.on('error', (error: any) => {
        console.log(`  ✗ Connection error: ${error.message}`);
        resolve();
      });
    });

    console.log('');
  }

  console.log('=== TEST COMPLETE ===\n');
  console.log('RECOMMENDATIONS:');
  console.log('1. Check your Supabase project settings for the correct connection string');
  console.log('2. Verify the pooler hostname format (should be aws-0-... not aws-1-...)');
  console.log('3. Ensure your IP is whitelisted in Supabase if using connection pooling');
  console.log('4. Try using the direct connection string instead of pooler');
}

testConnection().catch(console.error);
