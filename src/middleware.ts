import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, // required
  });

  const { pathname } = request.nextUrl;

  // 🔹 If logged in, prevent access to auth pages
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signUp") || pathname.startsWith("/verify"))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

    if (token && (pathname.startsWith("/doctor"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔹 If NOT logged in and trying to access protected routes → redirect to login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Otherwise, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signUp",
    
    "/home/:path*", // all dashboard subroutes
  ],
};
