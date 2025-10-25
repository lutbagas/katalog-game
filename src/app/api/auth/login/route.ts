import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const password = String(body?.password ?? '');
  
    if (!email || !password) {
      return NextResponse.json({ error: 'Input tidak valid' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 400 });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 400 })
    }
    const res = NextResponse.json({ success: true, message: 'Login berhasil' });
    res.cookies.set('loggedIn', 'true', {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Tidak dapat dengan server' }, { status: 500})
  }
}