// app/login/page.tsx
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import { Suspense } from "react";
import { MdArrowBack, MdGamepad } from "react-icons/md";

export default function LoginPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/20"
        >
          <MdArrowBack aria-hidden="true" />
          Home
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_440px]">
          <section className="max-w-xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-300 text-3xl text-slate-950 shadow-lg shadow-cyan-950/20">
              <MdGamepad aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-200">
              Katalog Game
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              Masuk ke dashboard game kamu
            </h1>
            <p className="mt-4 max-w-lg text-white/75">
              Kelola katalog, cek rekomendasi, dan lanjutkan eksplorasi game
              dari satu tempat.
            </p>
          </section>

          <Suspense
            fallback={
              <div className="rounded-xl border border-white/15 bg-white/10 p-8 text-center text-white/80">
                Memuat login...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
