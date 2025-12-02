import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testCategoriesAPI() {
  try {
    console.log('\n=== Testing Categories API Query ===\n');
    
    // This is what the API does
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { Product: true } },
      },
      orderBy: { name: "asc" },
    });
    
    console.log('✓ Query successful!');
    console.log(`Found ${categories.length} categories:\n`);
    
    categories.forEach(cat => {
      console.log(`{`);
      console.log(`  id: ${cat.id},`);
      console.log(`  name: "${cat.name}",`);
      console.log(`  slug: "${cat.slug}",`);
      console.log(`  _count: { Product: ${cat._count.Product} }`);
      console.log(`},`);
    });
    
    console.log('\n✓ This is the data the frontend should receive');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCategoriesAPI();
