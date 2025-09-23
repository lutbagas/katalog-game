import { useRouter } from "next/navigation";
import { useState } from "react"

export function BackButton(){
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleBack = () => {
    if (disabled) return;
    setDisabled(true);
    router.back();
    setTimeout(() => {setDisabled(true)}, 500)
  }

  return(
    <button 
      onClick={handleBack}
      disabled={disabled}
      className={`absolute top-3 left-3 rounded-xl cursor-pointer p-1 px-5 ${disabled? "bg-gray-500" : " bg-violet-700 hover:bg-violet-800"}`}
    >&larr;</button>
  )
}