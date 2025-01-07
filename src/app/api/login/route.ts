import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/models/prismaClient';
import { setCookie } from 'cookies-next';

// const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const SECRET_KEY = process.env.JWT_SECRET as string;
if (!SECRET_KEY) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({ message: 'Login successful', user, token });
    // console.log('Set-Cookie header added:', response.headers.get('Set-Cookie')); // Debugging

    response.headers.set(
      'Set-Cookie',
      `chargen_authToken_server=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Strict`
    );

    // Set HTTP-only cookie
    // setCookie('chargen_authToken_server', token, { httpOnly: true, maxAge: 60 * 60 * 24 });

    // return NextResponse.json({ message: 'Login successful', user, token });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
