import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function proxy(request) {
  const session = await auth();
  // in case doesn't have session
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: ["/products/:path*"],
};
