"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersPage } from "./UsersPage";

export function Navbar() {
  const [logged, setLogged] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLogged(localStorage.getItem("login") === "1");
    }
  }, []);

  return (
    <nav className="w-full bg-gradient-to-r from-[#223159] via-[#312965] to-[#20697a] py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 bg-clip-text text-transparent drop-shadow tracking-tight cursor-pointer" onClick={() => router.push("/")}>
          Katalog Game
        </h1>

        <div className="flex gap-4 items-center">
          {logged ? (
            <Link
              href="/profile"
              className="px-5 py-2 bg-gray-400 text-blue-700 rounded-xl font-semibold shadow hover:bg-blue-100 transition"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 bg-gray-200 text-sky-700 rounded-xl font-semibold shadow hover:bg-sky-200 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 bg-gray-200 text-sky-700 rounded-xl font-semibold shadow hover:bg-sky-200 transition"
              >
                Sign-Up
              </Link>
              <Link
               href="userPage"
               className="bg-gray-200 text-sky-700 p-3 rounded-xl font-semibold hover:bg-sky-200">hapus</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
