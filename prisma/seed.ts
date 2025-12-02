import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create categories for cleaning supplies
  const categoriesData = [
    { name: 'Cleaning Chemicals', slug: 'cleaning-chemicals' },
    { name: 'Bathroom Care', slug: 'bathroom-care' },
    { name: 'Kitchen Care', slug: 'kitchen-care' },
    { name: 'Floor Care', slug: 'floor-care' },
    { name: 'Dispensers', slug: 'dispensers' },
    { name: 'Gloves', slug: 'gloves' },
    { name: 'Paper Products', slug: 'paper-products' },
  ];

  console.log('Creating categories...');
  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Get created categories
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(
    categories.map(c => [c.slug, c.id])
  );

  // Create sample products
  const productsData = [
    {
      title: 'Multi-Surface Cleaner',
      description: 'Professional grade multi-surface cleaner for all hard surfaces',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',
      categoryId: categoryMap['cleaning-chemicals'],
      stock: 100,
      rating: 4.5,
    },
    {
      title: 'Disinfectant Spray',
      description: 'Hospital-grade disinfectant kills 99.9% of germs',
      price: 15.99,
      imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
      categoryId: categoryMap['cleaning-chemicals'],
      stock: 75,
      rating: 4.8,
      discountPercentage: 10,
    },
    {
      title: 'Bathroom Cleaner',
      description: 'Powerful bathroom cleaner removes soap scum and hard water stains',
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
      categoryId: categoryMap['bathroom-care'],
      stock: 120,
      rating: 4.3,
    },
    {
      title: 'Kitchen Degreaser',
      description: 'Heavy-duty degreaser for commercial kitchens',
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
      categoryId: categoryMap['kitchen-care'],
      stock: 60,
      rating: 4.6,
    },
    {
      title: 'Floor Cleaner Concentrate',
      description: 'Concentrated floor cleaner for all floor types',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
      categoryId: categoryMap['floor-care'],
      stock: 50,
      rating: 4.7,
      discountPercentage: 15,
    },
    {
      title: 'Soap Dispenser',
      description: 'Wall-mounted soap dispenser for commercial use',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',
      categoryId: categoryMap['dispensers'],
      stock: 40,
      rating: 4.4,
    },
    {
      title: 'Nitrile Gloves (Box of 100)',
      description: 'Powder-free nitrile gloves for cleaning and food service',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',
      categoryId: categoryMap['gloves'],
      stock: 200,
      rating: 4.9,
    },
    {
      title: 'Paper Towels (12 Pack)',
      description: 'Heavy-duty paper towels for commercial cleaning',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
      categoryId: categoryMap['paper-products'],
      stock: 150,
      rating: 4.5,
      discountAmount: 5,
    },
  ];

  console.log('Creating products...');
  for (const product of productsData) {
    await prisma.product.upsert({
      where: { id: 0 }, // Will never match, always creates
      update: {},
      create: product,
    });
  }

  // Create admin user
  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('Hyper@Clean2024$Secure!', 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@localhost.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@localhost.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });

  // Create test user
  console.log('Creating test user...');
  const testPassword = await bcrypt.hash('Test123!', 10);
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      passwordHash: testPassword,
      role: 'user',
      emailVerified: new Date(),
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin credentials: admin@localhost.com / Hyper@Clean2024$Secure!');
  console.log('Test user credentials: test@example.com / Test123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
