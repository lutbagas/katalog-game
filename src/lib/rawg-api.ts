// src/lib/rawg-api.ts
const API = "https://api.rawg.io/api";
const KEY = process.env.RAWG_KEY || process.env.NEXT_PUBLIC_RAWG_KEY;

export type FetchOpts = {
  page?: number;
  pageSize?: number;
  search?: string;
  genres?: string;
  ordering?: string;
}
export async function fetchGames(opts: FetchOpts){
  if (!KEY){
    throw new Error("rawg belum di set")
  }
  const {page= 12, pageSize= 1, search, genres, ordering} = opts;
  const p = new URLSearchParams({
    key: KEY, 
    page_size: String(pageSize),
    page: String(page)
  });
  if (search) p.set("search", search);
  if (genres) p.set("genres", genres)
  if (ordering) p.set("ordering", ordering);
  const res = await fetch (`${API}/games?${p.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal fetch RAWG");
  const data = await res.json();
  return data.results as any[]

}

