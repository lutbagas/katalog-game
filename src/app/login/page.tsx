// app/login/page.tsx

import { LoginForm } from "@/components/LoginForm";
import { HomeButton } from "@/components/HomeButton";

export default function LoginPage() {
  return (
    <>
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-800 via-indigo-800  to-purple-800 text-white">
    <HomeButton/>
      <h1 className="text-3xl font-bold mb-6"></h1>
      <LoginForm />
    </main>
    </>
  );
}
