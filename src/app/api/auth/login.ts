import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // validate input
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // find the user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // login successful
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
