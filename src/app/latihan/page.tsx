// src/app/latihan/page.tsx
import { prisma } from "@/lib/prisma";
import { Latihan } from "@/components/latihan";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LatihanPage() {
  const loggedIn = (await cookies()).get("loggedIn")?.value;
  if (!loggedIn) redirect("/login");

  // ambil user pertama untuk latihan (bisa diganti dengan user dari cookie, misalnya)
  const user = await prisma.user.findFirst();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-700 via-indigo-700 to-purple-700 text-white">
      <h1 className="text-3xl font-bold mb-6">Update User</h1>
      {user ? (
        <Latihan userId={user.id} currentEmail={user.email} />
      ) : (
        <p>Tidak ada user di database.</p>
      )}
    </main>
  );
}
