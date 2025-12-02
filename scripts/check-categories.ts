import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { Product: true }
        }
      }
    });
    
    console.log('\n=== CATEGORIES IN DATABASE ===');
    console.log(`Total categories: ${categories.length}\n`);
    
    if (categories.length === 0) {
      console.log('❌ No categories found!');
      console.log('Run: npm run prisma:seed to create categories\n');
    } else {
      categories.forEach(cat => {
        console.log(`✓ ${cat.name} (${cat.slug})`);
        console.log(`  ID: ${cat.id}, Products: ${cat._count.Product}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategories();
