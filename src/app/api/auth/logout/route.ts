import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Hapus cookie (ganti 'token' sesuai nama cookie kamu)
  res.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  return res;
}
