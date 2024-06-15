import Cookies from "js-cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //Check the cookie
  const cookie = Cookies.get("Authorization");

  if (!cookie) {
    return NextResponse.redirect(new URL("/#", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/Homepage/:path*",
};
