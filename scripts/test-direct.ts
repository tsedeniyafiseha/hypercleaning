import { Client } from 'pg';

async function testDirect() {
  const urls = [
    'postgresql://postgres.dhfflpixjzwxexvflpzk:NewVersion$1321%25@aws-1-eu-west-1.pooler.supabase.com:5432/postgres',
    'postgresql://postgres:NewVersion$1321%25@db.dhfflpixjzwxexvflpzk.supabase.co:5432/postgres',
  ];

  for (const url of urls) {
    console.log('Testing:', url.substring(0, 60) + '...');
    const client = new Client({ 
      connectionString: url,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      const result = await client.query('SELECT 1');
      console.log('  ✓ Success!\n');
      await client.end();
      return;
    } catch (error: any) {
      console.log('  ✗', error.message, '\n');
      try { await client.end(); } catch {}
    }
  }
}

testDirect();
