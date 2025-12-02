import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost.com';
  
  console.log(`Setting up admin user: ${adminEmail}`);
  
  // New secure password
  const newPassword = 'Hyper@Clean2024$Secure!';
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: 'Admin User',
      passwordHash: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });
  
  console.log('✅ Admin user created/updated successfully!');
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  ADMIN CREDENTIALS');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Email:    ${adminEmail}`);
  console.log(`  Password: ${newPassword}`);
  console.log('═══════════════════════════════════════════════════');
  console.log('');
  console.log('⚠️  IMPORTANT: Store this password securely!');
  console.log('   Do not share it or commit it to version control.');
  console.log('');
}

main()
  .catch((e) => {
    console.error('Error updating admin password:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
