import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check the cookie from the request
  const cookie = request.cookies.get("Authorization");

  // Extract the pathname from the request URL
  const { pathname } = new URL(request.url);

  // Define the root path as unprotected
  const unprotectedRoutes = ["/"];

  // Check if the request path is in unprotectedRoutes
  if (unprotectedRoutes.includes(pathname)) {
    // Allow access to the unprotected route
    return NextResponse.next();
  }

  // If Authorization cookie is not present, redirect to "/"
  if (!cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed for all other routes
  return NextResponse.next();
}

// Matching paths configuration
export const config = {
  // Use a more general matcher to cover all routes
  matcher: ["/((?!api|_next/static|favicon.ico).*)"], // Match all except API routes, Next.js static files, and favicon
};
