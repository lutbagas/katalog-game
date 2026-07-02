"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("login");
        router.push("/login");
        router.refresh();
      } else {
        setMessage("Logout gagal");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan koneksi");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
          loading
            ? "cursor-wait bg-white/10 text-white/55"
            : "bg-red-500/90 text-white hover:bg-red-500"
        }`}
      >
        <MdLogout aria-hidden="true" />
        {loading ? "Logout..." : "Logout"}
      </button>
      {message && (
        <p className="absolute right-0 mt-2 w-48 rounded-lg border border-red-300/30 bg-red-500/15 px-3 py-2 text-xs text-red-100">
          {message}
        </p>
      )}
    </div>
  );
}
