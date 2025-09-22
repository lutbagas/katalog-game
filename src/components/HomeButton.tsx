import { useRouter } from "next/navigation";

const router = useRouter();

export default function HomeButton(){
  <button onClick={() => router.push("/")}>kembali</button>
}