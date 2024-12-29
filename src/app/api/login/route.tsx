import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/User';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 });
    }

    // verify the password
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 });
    }

    // respond with user data
    return NextResponse.json({ id: user.id, username: user.username }, { status: 200 });
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ error: 'Failed to log in' }, { status: 500 });
  }
}
