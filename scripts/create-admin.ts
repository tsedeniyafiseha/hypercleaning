import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function createAdmin() {
  const adminEmail = 'admin@localhost.com';
  const adminPassword = 'admin123'; // Change this to your preferred password
  
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('✅ Admin account already exists!');
      console.log('Email:', adminEmail);
      console.log('You can login with this email and your password.');
      return;
    }

    // Create admin account
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin',
        passwordHash,
        emailVerified: new Date(), // Auto-verify admin
        role: 'admin',
      },
    });

    console.log('✅ Admin account created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('');
    console.log('You can now login at: http://localhost:3000/signin');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
