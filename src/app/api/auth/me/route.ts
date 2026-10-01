import { NextRequest, NextResponse } from "next/server";
import { getUserByToken, publicUser } from "@/lib/backend";

export function GET(request: NextRequest) {
  const user = getUserByToken(request.headers.get("authorization"));
  if (!user) return NextResponse.json({ message: "Please sign in to continue." }, { status: 401 });
  return NextResponse.json({ user: publicUser(user) });
}
