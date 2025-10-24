import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req : Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const password = String(body?.password ?? '');

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Email atau password salah'}, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true },
    })
    return NextResponse.json({ success: 'Email berhasil dibuat' }, { status: 201});
  } catch(e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ error: 'Email sudah digunakan' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Tidak dapat terhubung dengan server' }, { status: 500})
  }
}