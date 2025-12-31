import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { email, password } = await req.json();

  try {
    const updateData: Record<string, any> = {};

    if (email) updateData.email = email.trim().toLowerCase();
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // ✅ hash di backend
      updateData.passwordHash = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, createdAt: true },
    });

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: { message: "Gagal update user" } },
      { status: 500 }
    );
  }
}

