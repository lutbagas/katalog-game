"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomeButton() {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleHome = () => {
    if (disabled) return;
    setDisabled(true)
    router.push("/")
    setTimeout(() => setDisabled(false), 750)
  }

  return(
    <button onClick={() => handleHome()}
    className="p-1.5 bg-violet-700 absolute top-3 left-4 cursor-pointer hover:bg-violet-800 rounded-xl hover:scale-105">Home</button>
  )
}
