import { useRouter } from "next/navigation";


export function HomeButton(){
  const router = useRouter();
  return(
    <button onClick={() => router.push("/")}
    className="p-1.5 bg-violet-700 absolute top-3 left-4 cursor-pointer hover:bg-violet-800">Home</button>
  )
}