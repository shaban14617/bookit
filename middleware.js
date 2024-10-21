import { NextResponse } from 'next/server';
import { useAuth } from './context/authContext';
import checkAuth from './app/actions/checkAuth';

export default async function middleware(request) {
  const { isAuthenticated } = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bookings'],
};
