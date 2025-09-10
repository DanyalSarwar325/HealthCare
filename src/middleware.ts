import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"
 

export  async function middleware(request: NextRequest) {
    const token= await getToken({req:request})
    const url=request.nextUrl
    if(token && (
        url.pathname.startsWith('/signIn')||
         url.pathname.startsWith('/signUp')||
          url.pathname.startsWith('/verify')
     ))
  return NextResponse.redirect(new URL('/home', request.url))

  if(!token && (
        url.pathname.startsWith('/dashboard')
     ))
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signIn','/dashboard/:path*'],
}