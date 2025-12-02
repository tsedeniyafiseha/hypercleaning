import { Client } from 'pg';

async function testPostgresAuth() {
  console.log('=== POSTGRESQL AUTHENTICATION TEST ===\n');

  console.log('Environment DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'NOT SET');
  console.log('');

  const connectionStrings = [
    {
      name: 'aws-0 pooler (port 6543)',
      url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-0-eu-west-1.pooler.supabase.com:6543/postgres',
    },
    {
      name: 'aws-1 pooler (port 6543)',
      url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres',
    },
    {
      name: 'aws-0 direct (port 5432)',
      url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-0-eu-west-1.pooler.supabase.com:5432/postgres',
    },
    {
      name: 'Transaction pooler (port 6543) with pgbouncer',
      url: 'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    },
  ];

  for (const { name, url } of connectionStrings) {
    if (!url) continue;
    
    console.log(`Testing: ${name}`);
    const client = new Client({ 
      connectionString: url,
      ssl: {
        rejectUnauthorized: false
      }
    });

    try {
      await client.connect();
      console.log('  ✓ Connection successful!');
      
      const result = await client.query('SELECT version()');
      console.log('  ✓ Query successful:', result.rows[0].version.substring(0, 50) + '...');
      
      await client.end();
      console.log('  ✓ This connection string works!\n');
      
      console.log('WORKING CONNECTION STRING:');
      console.log(url);
      console.log('\n');
      break;
    } catch (error: any) {
      console.log('  ✗ Failed:', error.message);
      console.log('');
      try {
        await client.end();
      } catch {}
    }
  }

  console.log('=== TEST COMPLETE ===');
}

testPostgresAuth().catch(console.error);
