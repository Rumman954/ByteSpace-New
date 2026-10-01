import { NextRequest, NextResponse } from "next/server";
import { publicUser, registerUser } from "@/lib/backend";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { name, email, password } = body as { name?: string; email?: string; password?: string };
  if (!name || !email || !password) {
    return NextResponse.json({ message: "Name, email, and password are required." }, { status: 400 });
  }
  const result = registerUser(name, email, password);
  if ("error" in result) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }
  return NextResponse.json({ token: result.token, user: publicUser(result.user) }, { status: 201 });
}
