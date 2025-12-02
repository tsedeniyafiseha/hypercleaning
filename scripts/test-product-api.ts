import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testProductAPI() {
  try {
    console.log('\n=== Testing Product API Query ===\n');
    
    // Test fetching product ID 7 and 8 (the ones failing)
    const productIds = [7, 8];
    
    for (const id of productIds) {
      console.log(`\nTesting Product ID: ${id}`);
      try {
        const product = await prisma.product.findUnique({
          where: { id },
          include: { Category: true },
        });
        
        if (!product) {
          console.log(`❌ Product ${id} not found`);
        } else {
          console.log(`✓ Product found: ${product.title}`);
          console.log(`  Price: ${product.price}`);
          console.log(`  Category: ${product.Category?.name || 'None'}`);
          console.log(`  Image: ${product.imageUrl}`);
        }
      } catch (err) {
        console.error(`❌ Error fetching product ${id}:`, err);
      }
    }
    
    // List all products
    console.log('\n\n=== All Products ===\n');
    const allProducts = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        categoryId: true,
      },
      orderBy: { id: 'asc' }
    });
    
    allProducts.forEach(p => {
      console.log(`ID ${p.id}: ${p.title} - $${p.price} (Category: ${p.categoryId || 'None'})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testProductAPI();
