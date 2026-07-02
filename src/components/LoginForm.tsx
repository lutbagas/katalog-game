"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PiSpinnerGapBold } from "react-icons/pi";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";

type LoginMessage = {
  text: string;
  type: "success" | "error" | "";
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<LoginMessage>({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        setMessage({ text: "Login berhasil", type: "success" });
        localStorage.setItem("login", "1");

        setTimeout(() => {
          router.push(redirect || "/dashboard");
        }, 650);
      } else {
        setMessage({
          text: data?.error || "Email atau password salah",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
      setMessage({
        text: "Tidak bisa terhubung ke server.",
        type: "error",
      });
    } finally {
      setTimeout(() => setLoading(false), 650);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-white/15 bg-slate-950/70 p-6 text-white shadow-2xl shadow-slate-950/30 backdrop-blur md:p-8"
    >
      <div className="mb-7">
        <p className="text-sm font-medium text-cyan-200">Welcome back</p>
        <h2 className="mt-2 text-2xl font-bold">Login</h2>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/80">
            Email
          </span>
          <span className="relative block">
            <MdEmail
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/45"
            />
            <input
              type="email"
              value={email}
              placeholder="nama@email.com"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-12 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-300/25"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/80">
            Password
          </span>
          <span className="relative block">
            <MdLock
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/45"
            />
            <input
              type="password"
              value={password}
              placeholder="Masukkan password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-12 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-300/25"
            />
          </span>
        </label>

        <button
          type="submit"
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl font-semibold transition ${
            loading
              ? "cursor-wait bg-white/15 text-white/65"
              : "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <PiSpinnerGapBold className="animate-spin text-xl" />
              Memproses...
            </>
          ) : (
            <>
              <MdLogin className="text-xl" aria-hidden="true" />
              Masuk
            </>
          )}
        </button>

        {message.text && (
          <p
            className={`rounded-xl border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                : "border-red-300/30 bg-red-400/10 text-red-200"
            }`}
          >
            {message.text}
          </p>
        )}

        <p className="text-center text-sm text-white/65">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-cyan-200 hover:text-cyan-100"
          >
            Daftar
          </Link>
        </p>
      </div>
    </form>
  );
}
