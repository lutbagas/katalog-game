
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request){
  try{
    const body = await req.json();
    const email = String(body?.email ?? "").toLowerCase().trim();
    const password = String(body?.password ?? "");

    if (!email || !password || password.length < 6){
      return NextResponse.json({error: "Email atau password tidak valid"}, {status:400});
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {email, passwordHash},
      select: {id: true, email: true}
    });
    return NextResponse.json({success:"email dan password berhasil dibuat", user}, {status: 201})
  } catch(e: any){
    if (e?.code === "P2002"){
      return NextResponse.json({error:"Email sudah digunakan"}, {status:409});
    }
    return NextResponse.json({error: "terjadi kesalahan pada server"}, {status:500})
  }
}