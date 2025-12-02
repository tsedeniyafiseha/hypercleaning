import { PrismaClient } from '@prisma/client';

async function diagnoseDatabase() {
  console.log('=== DATABASE CONNECTION DIAGNOSTICS ===\n');

  // 1. Check environment variables
  console.log('1. Environment Variables:');
  console.log('   DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Missing');
  console.log('   DIRECT_URL:', process.env.DIRECT_URL ? '✓ Set' : '✗ Missing');
  
  if (process.env.DATABASE_URL) {
    // Parse and display connection details (without password)
    try {
      const url = new URL(process.env.DATABASE_URL);
      console.log('\n   Connection Details:');
      console.log('   - Protocol:', url.protocol);
      console.log('   - Host:', url.hostname);
      console.log('   - Port:', url.port);
      console.log('   - Database:', url.pathname.slice(1));
      console.log('   - Username:', url.username);
      console.log('   - Password:', url.password ? '***' + url.password.slice(-4) : 'Not set');
      console.log('   - SSL Mode:', url.searchParams.get('sslmode') || 'Not specified');
    } catch (error) {
      console.log('   ✗ Invalid URL format:', error);
    }
  }

  // 2. Test Prisma Client initialization
  console.log('\n2. Prisma Client Initialization:');
  let prisma: PrismaClient | null = null;
  try {
    prisma = new PrismaClient({
      log: ['error', 'warn'],
    });
    console.log('   ✓ Prisma client created successfully');
  } catch (error) {
    console.log('   ✗ Failed to create Prisma client:', error);
    process.exit(1);
  }

  // 3. Test database connection
  console.log('\n3. Database Connection Test:');
  try {
    await prisma.$connect();
    console.log('   ✓ Successfully connected to database');
  } catch (error: any) {
    console.log('   ✗ Connection failed:', error.message);
    console.log('\n   Error Details:');
    console.log('   - Code:', error.code);
    console.log('   - Meta:', JSON.stringify(error.meta, null, 2));
    await prisma.$disconnect();
    process.exit(1);
  }

  // 4. Test simple query
  console.log('\n4. Simple Query Test:');
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('   ✓ Query executed successfully:', result);
  } catch (error: any) {
    console.log('   ✗ Query failed:', error.message);
  }

  // 5. Check tables
  console.log('\n5. Database Tables Check:');
  try {
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `;
    console.log('   ✓ Found', tables.length, 'tables:');
    tables.forEach(t => console.log('     -', t.tablename));
  } catch (error: any) {
    console.log('   ✗ Failed to list tables:', error.message);
  }

  // 6. Check Prisma migrations
  console.log('\n6. Prisma Migrations Status:');
  try {
    const migrations = await prisma.$queryRaw<Array<{ migration_name: string }>>`
      SELECT migration_name FROM _prisma_migrations ORDER BY finished_at DESC LIMIT 5
    `;
    console.log('   ✓ Recent migrations:');
    migrations.forEach(m => console.log('     -', m.migration_name));
  } catch (error: any) {
    console.log('   ✗ Failed to check migrations:', error.message);
    console.log('   (This might mean migrations table doesn\'t exist yet)');
  }

  // Cleanup
  await prisma.$disconnect();
  console.log('\n=== DIAGNOSTICS COMPLETE ===\n');
}

diagnoseDatabase().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
