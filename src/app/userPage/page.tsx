// src/app/userPage/page.tsx
import { UsersPage } from "@/components/UsersPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function userPage() {
  const loggedIn = (await cookies()).get("loggedIn")?.value;

  if (!loggedIn) {
    redirect("/login")

  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-700 via-indigo-700  to-purple-700 text-white">
      <h1 className="text-3xl font-bold mb-6">delete user</h1>
      <UsersPage />
    </main>
  );
}
