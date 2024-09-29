import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { DEFAULT_REDIRECT_URL, authRoutes } from "@/routes";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  const isLoggedIn = !!session?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],

};

