import { NextRequest, NextResponse } from "next/server";
import { enrollUser, getUserByToken, publicUser } from "@/lib/backend";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = getUserByToken(request.headers.get("authorization"));
  if (!user) return NextResponse.json({ message: "Please sign in to continue." }, { status: 401 });
  const { slug } = await params;
  const updated = enrollUser(user, slug);
  if (!updated) return NextResponse.json({ message: "Course not found." }, { status: 404 });
  return NextResponse.json({ user: publicUser(updated) });
}
