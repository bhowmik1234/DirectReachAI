import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const protectedRoutes = ['/discover', '/finder'];

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect("http://localhost:3000/api/auth/signin");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/discover', '/finder'],  
};
