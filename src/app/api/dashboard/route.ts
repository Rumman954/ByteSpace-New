import { NextRequest, NextResponse } from "next/server";
import { dashboardFor, getUserByToken } from "@/lib/backend";

export function GET(request: NextRequest) {
  const user = getUserByToken(request.headers.get("authorization"));
  if (!user) return NextResponse.json({ message: "Please sign in to continue." }, { status: 401 });
  return NextResponse.json(dashboardFor(user));
}
