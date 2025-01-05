import prisma from '../models/prismaClient';

async function testDb() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error testing DB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDb();
