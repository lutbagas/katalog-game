import { useRouter } from "next/navigation";

export function BackButton(){
  const router = useRouter();

  return(
    <button onClick={() => router.push("/")}
    className="absolute top-5 left-5 px-3 bg-sky-600 p-2 rounded-2xl cursor-pointer">&larr; Kembali</button>
  )


}