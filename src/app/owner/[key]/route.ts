import { NextResponse, type NextRequest } from "next/server";
import { OWNER_COOKIE } from "@/server/access";
import { ownerCookieValue, safeEqual } from "@/server/crypto";

/**
 * The owner link: <APP_URL>/owner/<OWNER_LINK_SECRET>.
 * Opening it on a device gives that device manage access to every group (never player access).
 * A wrong key looks like any missing page.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const secret = process.env.OWNER_LINK_SECRET;
  if (!secret || !safeEqual(key, secret)) {
    return new NextResponse(null, { status: 404 });
  }
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(OWNER_COOKIE, ownerCookieValue(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
