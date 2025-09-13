// src/app/api/users/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Terjadi kesalahan server" } },
      { status: 500 }
    );
  }
}


