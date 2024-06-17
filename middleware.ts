import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check the cookie from the request
  const cookie = request.cookies.get("Authorization");

  if (!cookie) {
    // Redirect to the home page if the Authorization cookie is not present
    return NextResponse.redirect(new URL("/#", request.url));
  }

  // Allow the request to proceed if the Authorization cookie is present
  return NextResponse.next();
}

// Matching paths configuration
export const config = {
  matcher: "/Homepage/:path*",
};
