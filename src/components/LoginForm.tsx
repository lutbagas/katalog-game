"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PiSpinnerGapBold } from "react-icons/pi";

export function LoginForm(){
  const [email, setEmail] = useState("coba123@gmail.com");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | ''}>({text: '', type:''})
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // baca query redirect
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      });

      if (res.ok){
        setMessage({text: "Login Berhasil", type: "success"});

        // kalau ada redirect, ke situ, kalau tidak ke dashboard
        setTimeout(() => {
          if (redirect) {
            router.push(redirect);
          } else {
            router.push("/dashboard");
          }
        }, 750);

      } else {
        setMessage({text: "Login Gagal", type: "error"});
      }

    } catch(e) {
      console.log(e);
    } finally {
      setTimeout(() => setLoading(false), 750);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleSubmit} className="bg-gray-950 p-9 space-y-5 text-indigo-100 rounded-xl shadow-md shadow-violet-500/20">
        <h3 className="text-2xl text-center font-semibold">Login</h3>

        <input 
          type="email"
          value={email}
          placeholder="Masukkan email"
          autoComplete="new-email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-800 w-full p-3 focus:ring-2 outline-none focus:ring-violet-500"
        />

        <input 
          type="password"
          value={password}
          placeholder="Masukkan password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-800 w-full p-3 focus:ring-2 outline-none focus:ring-violet-500"
        />

        <button 
          className={`p-2 w-full transition-colors hover:bg-purple-800
             ${loading ? "bg-gray-700" : "bg-violet-900 cursor-pointer"}`}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>

        {loading && <PiSpinnerGapBold className="ml-2 animate-spin" />}
        {message.text && (
          <p className={message.type === "success" ? "text-green-500" : "text-red-500"}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}
