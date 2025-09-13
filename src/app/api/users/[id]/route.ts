// src/app/api/users/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params } : { params: {id: string}}
) {
  try {
    const { id } = params;
    const existing = await prisma.user.findUnique({where: {id}})

    if (!existing){
      return NextResponse.json({error: {code: "NOT_FOUDD", message: "User tidak ada"}}, {status: 404})
    }
    await prisma.user.delete({where: {id}})
    return new NextResponse(null, {status: 204})
  } catch (e) {
    console.log(e);
    return NextResponse.json({error: {code: "SERVER_ERROR", message: "tidak dapat terhubung dengan server"}}, {status: 500})
  }

}

