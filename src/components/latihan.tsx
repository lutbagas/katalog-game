// src/components/latihan.tsx
"use client";

import { useState } from "react";

export function Latihan({
  userId,
  currentEmail,
}: {
  userId: string;
  currentEmail: string;
}) {
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("⏳ Mengupdate...");

  try {
    const res = await fetch(`/api/auth/latihan/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      email,
      password: password || undefined, // bukan passwordHash
      }),
    });

    // 💡 tambahkan ini
    const text = await res.text();
    console.log("Raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Response tidak dalam format JSON");
    }

    if (!res.ok) throw new Error(data.error?.message || "Gagal update user");

    setStatus("✅ User berhasil diupdate!");
  } catch (err: any) {
    console.error(err);
    setStatus(`❌ ${err.message}`);
  }
}


  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10  rounded p-20">
      <div>
        <label className=" text-sm font-medium mb-1 p-3 w-full">Email</label>
        <input
          type="email"
          className="border rounded p-3 w-full text-white text-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className=" text-sm font-medium mb-1 p-3 w-full">Password baru (opsional)</label>
        <input
          type="password"
          className="border rounded p-3 w-full text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Update User
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
