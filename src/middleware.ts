import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (
    !req.auth &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register"
  ) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 