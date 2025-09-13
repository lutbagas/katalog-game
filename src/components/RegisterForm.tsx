"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"
import { TbLoader2 } from "react-icons/tb";

export function RegisterForm(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch ("api/auth/register", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {"Content-Type": "application/json"}
      })
      if (res.ok){
        setTimeout(() => router.push("/login"), 1500)
        setMessage("Register Berhasil")
      } else {
        setMessage("Register gagal")
      }
    } catch (e) {
      console.log(e)
      setMessage("Gagal terhubung dengan server")
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-7 space-y-3">
      <h3 className="text-2xl text-center">Register</h3>
      <input 
        type="email"
        value={email}
        placeholder="Masukkkan Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3"
      />
      <input 
        type="password"
        value={password}
        placeholder="Masukkan Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3" 
      />
      <button 
        type="submit"
        className="bg-blue-500 w-full p-3 hover:bg-blue-700 cursor-pointer">
          {loading? "Memproses..." : "Masuk"}
          {message? <TbLoader2 className="animate-spin" /> : ""}
        </button>
    </form>
  )
}