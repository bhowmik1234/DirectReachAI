import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const protectedRoutes = ['/discover', '/finder'];

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect("https://direct-reach-ai-tmey.vercel.app/api/auth/signin?callbackUrl=https%3A%2F%2Fdirect-reach-ai-tmey.vercel.app%2F");
  }
//   https://direct-reach-ai-tmey.vercel.app/api/auth/signin?callbackUrl=https%3A%2F%2Fdirect-reach-ai-tmey.vercel.app%2F

  return NextResponse.next();
}

export const config = {
  matcher: ['/discover', '/finder'],  
};
