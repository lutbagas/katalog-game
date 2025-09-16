// components/UsersPage.tsx
"use client"

import { useEffect, useState } from "react";
import { BackButton } from "./BackButton";
import { User } from "@prisma/client";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  // ambil data awal (async/await)
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const ct = res.headers.get("content-type") || "";
      const raw = await res.text();

      if (!ct.includes("application/json")) {
        console.error("Non-JSON response:", res.status, raw.slice(0, 200));
        throw new Error("API tidak mengirim JSON. Cek path/method/typo.");
      }

      const data = JSON.parse(raw);
      setUsers(data.data); // { data: [...] }
    } catch (err) {
      console.error("Gagal ambil data user:", err);
    }
  };
  fetchUsers();
}, []);


  // fungsi delete
  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert(data.data.message);
        setUsers(prev => prev.filter(user => user.id !== id));
      } else {
        alert(data.error.message);
      }
    } catch (err) {
      console.error("Gagal hapus user:", err);
    }
  };

  return (
    <div>
      <BackButton/>
      <h1>Daftar User</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email}
            <button onClick={() => handleDeleteUser(user.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

