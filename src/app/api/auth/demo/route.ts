import { NextResponse } from "next/server";
import { demoUser, publicUser } from "@/lib/backend";

export function POST() {
  const result = demoUser();
  if (!result) return NextResponse.json({ message: "Demo user missing." }, { status: 500 });
  return NextResponse.json({ token: result.token, user: publicUser(result.user) });
}
