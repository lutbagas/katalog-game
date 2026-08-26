import { prisma } from '@/lib/prisma';
import { Prisma } from "@prisma/client";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';



export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            return NextResponse.json({message: 'user belum login atau token tidak ada'}, { status: 401})
        }
        console.log("userId dari cookie:", userId);
        console.log("body:", body);

        const played = await prisma.played.create({
            data: {
                id: body.id,
                name: body.name,
                released: body.released,
                background_image: body.background_image,
                user: {
                    connect: {
                        id: userId
                    }
                }
                
            }
        });
        return NextResponse.json(played)
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            console.error("P2002: played sudah ada karena unique constraint", {
                code: error.code,
                target: error.meta?.target,
            })
            return NextResponse.json({ message: "Game ini sudah ada di played"}, { status: 409 })

        }
        console.error('Post gagal dijalankan', error)

        return NextResponse.json({ message: 'Internal server error'}, { status: 500})
    }
}

export async function GET() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value

    const played = await prisma.played.findMany({
        where: {
            userId,
        }
    });
    return NextResponse.json(played, { status: 201 })

};

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        if(!userId) {
            return NextResponse.json({ message: "unauthorized "}, { status: 401 });
        }
        await prisma.played.delete({
            where: {
                id_userId: {
                    id: body.id,
                    userId,
                }
            }
        });
        return NextResponse.json({ message: "played berhasil dihapus"});
    } catch(error) {
        console.error("delete played error:", error);

        return NextResponse.json({ message: "gagal menghapus favorite"}, { status: 500});
    }
}