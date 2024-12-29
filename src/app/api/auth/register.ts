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

    // check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ username, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
