import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================
// PUBLIC ROUTES (no authentication required)
// ============================================
const publicRoutes: RegExp[] = [
  /^\/$/,
  /^\/login$/,
  /^\/verify-otp$/,
  /^\/forgot-password$/,
  /^\/reset-password$/,
  /^\/register$/,
  /^\/services$/,
  /^\/features$/,
  /^\/pricing$/,
  /^\/contact$/,
];

// Bypass static assets and API routes (API routes handle their own auth)
const bypassRoutes: RegExp[] = [
  /^\/_next\//,
  /^\/api\//,
  /^\/favicon\.ico$/,
  /\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => route.test(pathname));
}

function shouldBypass(pathname: string): boolean {
  return bypassRoutes.some((route) => route.test(pathname));
}

function getAuthToken(request: NextRequest): string | null {
  return request.cookies.get("auth_token")?.value ?? null;
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  // Optional: preserve original destination
  // loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass static assets and API routes
  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  // 2. Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 3. All other routes require authentication
  const token = getAuthToken(request);
  if (!token) {
    return redirectToLogin(request);
  }

  // 4. Token exists → allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};