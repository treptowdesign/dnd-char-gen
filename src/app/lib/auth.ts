import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;
if (!SECRET_KEY) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

export async function getUserFromServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get('chargen_authToken_server')?.value; // get token from cookies

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // verify token
    return decoded as { id: number; email: string }; // return user info
  } catch (error) {
    console.error('Invalid or expired auth token:', error);
    return null;
  }
}
