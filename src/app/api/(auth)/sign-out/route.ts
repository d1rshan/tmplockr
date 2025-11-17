import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("__tmplockr_jwt")
  return NextResponse.json({ success: true });
}
