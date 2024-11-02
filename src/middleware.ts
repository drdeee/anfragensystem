import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const resHeaders = new Headers(request.headers);
  resHeaders.set(
    "WWW-Authenticate",
    'Basic realm="Admin Area", charset="UTF-8"'
  );

  const auth = request.headers.get("Authorization");

  let authentificated = false;
  if (
    auth !== null &&
    auth.split(" ").length === 2 &&
    auth.split(" ")[0] === "Basic"
  ) {
    const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
      .toString("utf-8")
      .split(":");

    if (
      user === process.env.ADMIN_USER &&
      pass === process.env.ADMIN_PASSWORD
    ) {
      authentificated = true;
    }
  }
  if (!authentificated)
    return NextResponse.json(
      { status: "notAuthentificated" },
      { status: 401, headers: resHeaders }
    );
  return NextResponse.next({
    request: {
      headers: resHeaders,
    },
  });
}

export const config = {
  matcher: "/admin",
};
