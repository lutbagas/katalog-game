import { NextResponse } from "next/server";
import { prisma} from "@/lib/prisma";

export async function GET(request: Request, {params}: { params: Promise<{id :string }>}) {
    try {
        const { id } = await params;

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id:true,
                email:true,
                createdAt: true,
                favorite:true,
                played: true
            }
        });
        if (!user) {
            return NextResponse.json({ message: "user tidak ditemukan"}, { status:404})
        };
        return NextResponse.json(user)
    } catch(error) {
        console.error(error);

        return NextResponse.json({ message: "Gagal mengambil detail user"}, { status: 500})

    }
}