// import authConfig from "./auth.config";
// import NextAuth from "next-auth";
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import {auth} from "./auth";

// // const {auth} = NextAuth(authConfig);
// import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes,publicRoutes } from "./routes";

// export default auth((req) => {
//     const {nextUrl} = req;
//     console.log("ROUTE:",req.nextUrl.pathname);
//     // const isLoggedIn = !!req.auth;
    
//     // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//     // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//     // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//     // if (isApiAuthRoute){
//     //     return;
//     // }

//     // if (isAuthRoute){
//     //     if (isLoggedIn){
//     //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     //     }
//     //     return ;
//     // }

//     // if (!isLoggedIn && !isPublicRoute){
//     //     return Response.redirect(new URL("/auth/login", nextUrl));
//     // }
//     // return ;
// });

// export const config = { 
//     matcher: ["/auth/login"]
//     // matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('middleware')
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}