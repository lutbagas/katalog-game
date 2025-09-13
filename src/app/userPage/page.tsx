// src/app/userPage/page.tsx
import { UsersPage } from "@/components/UsersPage";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-violet-900 via-purple-700 text-white">
      <h1 className="text-3xl font-bold mb-6">delete user</h1>
      <UsersPage />
    </main>
  );
}
