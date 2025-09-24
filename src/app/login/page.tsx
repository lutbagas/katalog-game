// app/register/page.tsx
"use client"
import { LoginForm } from "@/components/LoginForm";
import { HomeButton } from "@/components/HomeButton";

export default function LoginPage() {
  return (
    <>
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-700 via-indigo-700  to-purple-700 text-white">
    <HomeButton/>
      <h1 className="text-3xl font-bold mb-6"></h1>
      <LoginForm />
    </main>
    </>
  );
}
