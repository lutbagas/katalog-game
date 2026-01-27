"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/ThemeContext/ThemeContext";
import { MdNightlightRound } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { MdGamepad } from "react-icons/md";

export function Navbar() {
  const [logged, setLogged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { alt ,setAlt } = useTheme();
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    try {
      setAlt((prev: boolean) => !prev);
      setDisabled(true)
    } finally {
      setTimeout(() => setDisabled(false), 750)

    }
    
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLogged(localStorage.getItem("login") === "1");
    }
  }, []);

  // Tutup dropdown kalau klik di luar menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-gradient-to-r py-4 shadow-lg">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6">
        {/* Logo / Title */}
        <h1
          className="flex items-center text-md xl:text-xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 bg-clip-text text-transparent drop-shadow tracking-tight cursor-pointer"
          onClick={() => router.push("/")}
        >
          <MdGamepad className="text-md xl:text-xl text-blue-400 animate-spin [animation-duration:3s]"/>
          <span className="mx-2.5 text-md xl:text-xl">
            katalog game
          </span>
        </h1>
        <div className="relative left-4 lg:left-80 md:left-50 sm:left-30 xl:left-115">
          <button
            onClick={handleClick}
            className={`${disabled ? 'bg-red-400' : 'bg-sky-400' } rounded-xl border border-white/20  px-4 py-2 text-sm text-white backdrop-blur cursor-pointer`}
            disabled={disabled}
          >
            {alt ? <MdNightlightRound className="text-xl" /> : <IoSunny className="text-xl" />}
          </button>
        </div>
        {/* Tombol pojok kanan */}
        <div className="relative menu-container">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-200 text-sky-700 font-semibold px-3 py-2 rounded-md hover:bg-sky-300 transition"
          >
            {logged ? "Menu" : "Account"}
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 z-50">
              {logged ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("login");
                      setLogged(false);
                      setMenuOpen(false);
                      router.push("/");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/userPage"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Hapus
                  </Link>
                  <Link 
                    href="/latihan"
                    className="block px-4 py-2 hover:bg-gray-100">
                      Latihan
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
