import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;
if (!SECRET_KEY) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

export async function GET() {
  // get cookies from the request
  const cookieStore = await cookies();
  const token = cookieStore.get('chargen_authToken_server')?.value;

  // if no token, return unauthorized
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string };

    // return a protected response
    return NextResponse.json({
      message: 'Protected route accessed successfully!',
      user: { id: decoded.id, email: decoded.email },
    });
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }
}
