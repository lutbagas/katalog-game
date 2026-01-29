// lib/services/auth.service.ts
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function loginService({ email, password }: any) {
  if (!email || !password) {
    throw { message: 'Input tidak valid', statusCode: 400 };
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw { message: 'Email atau password salah', statusCode: 400 };
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw { message: 'Email atau password salah', statusCode: 400 };
  }

  return { id: user.id };
}

