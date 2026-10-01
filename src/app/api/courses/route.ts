import { NextRequest, NextResponse } from "next/server";
import { listCourses } from "@/lib/backend";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  return NextResponse.json({
    courses: listCourses(
      searchParams.get("q") || undefined,
      searchParams.get("category") || undefined,
      searchParams.get("level") || undefined
    ),
  });
}
