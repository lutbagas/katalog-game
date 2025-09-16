// app/register/page.tsx
"use client"
import { RegisterForm } from "@/components/RegisterForm";
import { BackButton } from "@/components/BackButton";

export default function RegisterPage() {
  return (
    <>
      <BackButton/>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-700 via-indigo-700  to-purple-700 text-white">
        <h1 className="text-3xl font-bold mb-6"></h1>
        <RegisterForm />
      </main>
    </>
  );
}
