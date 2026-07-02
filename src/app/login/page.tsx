// app/login/page.tsx
import { LoginForm } from "@/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white">
          Memuat login...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
