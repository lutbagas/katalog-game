import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    console.log('post dipanggil')
    const body = await req.json();
    console.log(body)
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');
  
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error:'email atau password tidak sesuai'}, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { email: true, id: true}
    })
    return NextResponse.json({ success: 'Email berhasil dibuat'}, { status: 201 });
  } catch (e: any) {
    if (e?.code === 'p2202') {
      return NextResponse.json({ error: 'Email sudah digunakan '}, { status: 400 })
    }
    return NextResponse.json({ error: 'tidak dapat terhubung dengan serverr'}, { status: 500})
  }
  


}