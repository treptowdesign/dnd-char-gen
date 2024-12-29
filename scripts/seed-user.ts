import User from '../models/User';

async function createUser() {
  try {
    const user = await User.create({
      username: 'testuser2',
      password: 'password1234', // Will be hashed automatically
    });
    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
