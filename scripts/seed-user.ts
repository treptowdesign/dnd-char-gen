import User from '../models/User';

async function createUser() {
  try {
    const user = await User.create({
      username: 'testuser',
      password: 'password123', // Will be hashed automatically
    });
    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
