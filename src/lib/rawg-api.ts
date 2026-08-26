// src/lib/rawg-api.ts
import { FetchOpts } from "@/types/game.types";
const API = "https://api.rawg.io/api";
const KEY = process.env.RAWG_KEY || process.env.NEXT_PUBLIC_RAWG_KEY;

export async function fetchGames(opts: FetchOpts){
  if (!KEY){
    throw new Error("rawg belum di set")
  }
  const {page= 1, pageSize= 12, search, genres, ordering} = opts;
  const p = new URLSearchParams({
    key: KEY, 
    page_size: String(pageSize),
    page: String(page)
  });
  if (search) p.set("search", search);
  if (genres) p.set("genres", genres)
  if (ordering) p.set("ordering", ordering);
  try {
    const url = `${API}/games?${p.toString()}`;
    const requestTime = new Date().toLocaleTimeString();

    console.log("\n ============= [RAWG] Request =============");
    console.log("URL:", url);
    console.log("Time", requestTime);

    const res = await fetch(url, {
      next: {
        revalidate: 10
      }
    });

    const responseTime = new Date().toLocaleTimeString();

    console.log("================= [RAWG] Response ==========");
    console.log("Status:", res.status);
    console.log("Time:", responseTime);
    
    console.log("==============================\n")
    if (!res.ok) throw new Error("Gagal fetch RAWG");
    const data = await res.json();
    return data.results as any[]
  } catch(error) {
    console.error(error);
    return []
  }

}

