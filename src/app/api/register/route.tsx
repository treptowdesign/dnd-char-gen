import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/User';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // create the new user
    const user = await User.create({ username, password });

    // respond with the created user's ID and username
    return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
  } catch (error) {
    console.error('Error in registration:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
