import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request){
  try{
    const body = await req.json();
    const email = String(body?.email ?? "").toLowerCase().trim();
    const password = String(body?.password ?? "");
    
    if (!email || !password){
      return NextResponse.json({ error: "input tidak valid"}, {status: 400})
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {id: true, email:true, passwordHash: true}
    })

    if (!user){
      return NextResponse.json({error:"Email atau password salah"}, {status: 400})
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      return NextResponse.json({error: "Email atau password salah"}, {status: 400}) 
    }

    // Login berhasil → set cookie
    const res = NextResponse.json({success: true, message: "Login Berhasil"});
    res.cookies.set("loggedIn", "true", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 jam
    });

    return res;

  } catch (e){
    console.log(e)
    return NextResponse.json({error: "tidak dapat terhubung dengan server"}, {status: 500})
  }
}
