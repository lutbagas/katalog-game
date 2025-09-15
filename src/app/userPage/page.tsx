// src/app/userPage/page.tsx
"use client"
import { UsersPage } from "@/components/UsersPage";
import { BackButton } from "@/components/BackButton";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b  from-blue-500 via-indigo-500  to-purple-500 text-white">
      <BackButton/>
      <UsersPage />
    </main>
  );
}
