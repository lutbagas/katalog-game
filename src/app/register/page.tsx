// app/register/page.tsx
"use client"
import { RegisterForm } from "@/components/RegisterForm";
import { BackButton } from "@/components/BackButton";
import { HomeButton } from "@/components/HomeButton";

export default function RegisterPage() {
  return (
    <>
      <HomeButton/>
      <main className="min-h-screen flex flex-col items-center justify-center  text-white">
        <h1 className="text-3xl font-bold mb-6"></h1>
        <RegisterForm />
      </main>
    </>
  );
}
