import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { getSession } from "better-auth/api";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const sessionCookie = getSessionCookie(request);
  console.log("Session Cookie:", sessionCookie);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
