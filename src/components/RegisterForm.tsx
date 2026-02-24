"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"
import { TbLoader2 } from "react-icons/tb";

export function RegisterForm(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{text: string; type: 'Success' | 'Error' | ''}>({ text: '', type: ''});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (disabled) return;
    setDisabled(true);
    setTimeout(() => {setDisabled(false)}, 750)
    try {
      const res = await fetch ("api/auth/register", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {"Content-Type": "application/json"}
      })
      if (res.ok){
        setTimeout(() => router.push("/login"), 2500)
        setMessage({text: "Register Berhasil", type:'Success'})
      } else {
        setMessage({text: "Register Gagal", type: 'Error'})
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-7 space-y-3 rounded-xl">
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
        disabled={disabled}
        className={` w-full p-3 cursor-pointer ${disabled? "bg-gray-500": "bg-violet-800 hover:bg-purple-700"}`}>
          {loading? "Memproses..." : "Masuk"}
          {loading? <TbLoader2 className="animate-spin" /> : ""}
        </button>
        <p className={message.type == 'Success'? 'text-green-600' : 'text-red-600'}>
        {message.text}
        </p>
    </form>
  )
}