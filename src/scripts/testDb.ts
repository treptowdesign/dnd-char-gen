import prisma from '../models/prismaClient';

// async function testDb() {
//   try {
//     const users = await prisma.user.findMany();
//     console.log('Users:', users);
//   } catch (error) {
//     console.error('Error testing DB:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

async function testDb() {
  try {
    const characters = await prisma.character.findMany();
    console.log('Posts:', characters);
  } catch (error) {
    console.error('Error testing DB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDb();
