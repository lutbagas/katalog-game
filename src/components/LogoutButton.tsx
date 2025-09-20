"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        credentials: "include", // 🔑 penting supaya cookie ikut terkirim
      });

      if (res.ok) {
        router.push("/login");
        router.refresh();
      } else {
        setMessage("Logout Failed");
      }
    } catch (error) {
      setMessage("terjadi kesalahan koneksi");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-red-600 p-2 rounded-lg cursor-pointer"
      >
        {loading ? "Logout..." : "Logout"}
      </button>
      {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
    </div>
  );
}
