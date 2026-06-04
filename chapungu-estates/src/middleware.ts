import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Security headers for all responses
  const headers = new Headers(req.headers);

  // Block suspicious patterns
  if (
    pathname.includes("..") ||
    pathname.includes("<script") ||
    pathname.includes("javascript:")
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const response = NextResponse.next({ request: { headers } });

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
