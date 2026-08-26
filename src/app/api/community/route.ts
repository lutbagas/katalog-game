import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                createdAt: true,
                username: true,
            },
            orderBy:{
                createdAt: 'desc'
            }
        });
        return NextResponse.json(users)
    } catch(error) {
        console.error('get community error:', error)
        return NextResponse.json({ message: 'Internal Server Error'}, { status: 500})
 
    }
}