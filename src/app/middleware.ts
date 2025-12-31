import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get("loggedIn")?.value;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/userPage", "/latihan"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Kalau user buka halaman protected tapi belum login
  if (isProtected && !loggedIn) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/userPage/:path*", "/latihan/:path*"],
};
