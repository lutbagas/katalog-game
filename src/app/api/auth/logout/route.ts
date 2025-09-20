import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("loggedIn"); // atau "token" kalau pakai JWT
  return res;
}
