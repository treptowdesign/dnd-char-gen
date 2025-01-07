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

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, {
      expiresIn: '1d',
    });

    // setCookie('authToken', token, { httpOnly: true, maxAge: 60 * 60 * 24 });

    const response = NextResponse.json({ message: 'User registered', user: newUser, token });

    response.headers.set(
      'Set-Cookie',
      `chargen_authToken_server=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
