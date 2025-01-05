import prisma from '../models/prismaClient';
import bcrypt from 'bcryptjs';

async function seedDb() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
      },
    });

    console.log('Seeded user:', user);
  } catch (error) {
    console.error('Error seeding DB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDb();
