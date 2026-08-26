// app/login/page.tsx
'use client'
import { LoginForm } from "@/components/LoginForm";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/BackButton";

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
      <BackButton/>
      {/* <button className="absolute top-15 left-15 bg-linear-to-br from-purple-600/30 via-purple-600/30 to to-purple-900/30   rounded-xl px-2 py-2 cursor-pointer"
      onClick={() => router.push('/')}>&larr; home</button> */}
      <LoginForm />
    </Suspense>
  );
}
