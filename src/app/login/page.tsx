// app/login/page.tsx
'use client'
import { LoginForm } from "@/components/LoginForm";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white">
          Memuat login...
        </div>
      }
    >
      <button className="bg-linear-to-br from-purple-600 via-purple-600 to to-purple-900 mx-5 my-10 rounded-xl px-2 py-2 cursor-pointer"
      onClick={() => router.push('/')}>&larr; home</button>
      <LoginForm />
    </Suspense>
  );
}
