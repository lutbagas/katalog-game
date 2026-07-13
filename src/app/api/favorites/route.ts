import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const  userId = cookieStore.get("userId")?.value;

    if(!userId) {
      return NextResponse.json(
        { message: "User belum logiin / cookie userId tidak ada"},
        { status: 401 }
      );
    }
    const favorite = await prisma.favorite.create({
      data: {
        id: body.id,
        name: body.name,
        released: body.released,
        background_image: body.background_image,
        userId: userId,
      },
    });
    return NextResponse.json(favorite);
  } catch(error) {
    console.error("POST FAVORITE ERROR:", error);

    return NextResponse.json(
      { message: "gagal menambahkan favorite" }, 
      { status: 500}
    )

  }
}

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if(!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401}
    );
  }
  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json(favorites);
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "unatuhorized" },
        { status: 401 }
      );
    }
    await prisma.favorite.delete({
      where: {
        id_userId: {
          id: body.id,
          userId,
        }
      }
    })
    return NextResponse.json({
      message: "Favorite berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete favorite error:", error);

    return NextResponse.json(
      { message: "gagal menghapus favorite" },
      { status: 500}
    );
  }
}
