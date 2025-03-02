/* import { NextResponse } from "next/server";
export function middleware(request) {
  console.log(request);
  return NextResponse.redirect(new URL("/categories", request.url));
} */

import { auth } from "./app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes for authentication)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
