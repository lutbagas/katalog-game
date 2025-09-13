// app/register/page.tsx
import { LoginForm } from "@/components/LoginForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-500 via-indigo-500  to-purple-500 text-white">
      <h1 className="text-3xl font-bold mb-6"></h1>
      <LoginForm />
    </main>
  );
}
