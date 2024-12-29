import { authenticate } from '../lib/auth';

async function login() {
  const user = await authenticate('testuser2', 'password1234');
  if (user) {
    console.log('Login successful:', user.toJSON());
  } else {
    console.log('Login failed: Invalid username or password');
  }
}

login();
