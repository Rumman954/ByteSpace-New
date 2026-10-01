import { NextRequest, NextResponse } from "next/server";
import { loginUser, publicUser } from "@/lib/backend";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };
  const result = loginUser(String(email || ""), String(password || ""));
  if (!result) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  return NextResponse.json({ token: result.token, user: publicUser(result.user) });
}
