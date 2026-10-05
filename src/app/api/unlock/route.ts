import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  checkPassword,
  buildCookieValue,
  checkRateLimit,
  resetRateLimit,
  COOKIE_NAME,
  COOKIE_MAX_AGE_S,
} from "@/lib/auth";

export async function POST(request: Request) {
  // Determine caller IP for rate limiting
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  const { allowed, delayMs } = checkRateLimit(ip);

  if (!allowed) {
    if (delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const candidate: string = typeof body?.password === "string" ? body.password : "";

    if (checkPassword(candidate)) {
      resetRateLimit(ip);

      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, buildCookieValue(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: COOKIE_MAX_AGE_S,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
