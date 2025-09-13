"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem("login") !== "1") {
      router.replace("/login");
    }
  }, [router]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-violet-200">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-80">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Halo, User!</h2>
        <button
          className="bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-700 shadow w-full"
          onClick={() => {
            window.localStorage.removeItem("login");
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
