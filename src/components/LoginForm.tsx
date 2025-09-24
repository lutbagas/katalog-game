"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PiSpinnerGapBold } from "react-icons/pi";

export function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (disabled) return;
    setDisabled(true)
    setTimeout(() => {setDisabled(false)}, 750)
    try {
        const res = await fetch ("api/auth/login", {
          method: "POST",
          body: JSON.stringify({email, password}),
          headers: {"Content-Type": "application/json"},
          credentials: "include",
        })
        
        if (res.ok){
          setTimeout(() => router.push("/dashboard"), 1500)
          setMessage({text: "Login Berhasil", type: "success"});
        } else {
          setMessage({ text : "Login Gagal", type: "error"});
        }
      } catch (e) {
        console.log(e);
        setMessage({ text :"Tidak dapat menghubungkan dengan server", type: "error"});
      } finally {
        setLoading(false)
      }
  } 
  return (
    <form onSubmit={handleSubmit} className="bg-gray-950 p-9 space-y-5 text-indigo-100  ">
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
      <button className={` p-2 w-full transition-colors hover:scale-105 ${disabled? "bg-gray-700": "bg-violet-800 hover:bg-purple-700 cursor-pointer"}`}
      disabled={disabled || loading}>
        {loading ? "Memproses..." : "Masuk"}
      </button>
        {loading && <PiSpinnerGapBold className="ml-2 animate-spin" />}
        {message.text && <p className={message.type === "success"? "text-green-500": "text-red-500"}>{message.text}</p>}
    </form>
  )
}