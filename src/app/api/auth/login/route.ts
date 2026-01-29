// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { loginService } from '@/services/login.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await loginService(body);

    const res = NextResponse.json({ success: true });
    res.cookies.set('loggedIn', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return res;
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: e.statusCode ?? 500 }
    );
  }
}