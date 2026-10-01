import { NextResponse } from "next/server";
import { getCourse } from "@/lib/backend";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCourse(slug);
  if (!data) return NextResponse.json({ message: "Course not found." }, { status: 404 });
  return NextResponse.json(data);
}
