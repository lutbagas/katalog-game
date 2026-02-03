"use client";

import { useRouter, useSearchParams} from "next/navigation";

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("genre", e.target.value);
    router.push(`/catalog?${params.toString()}`);
  }
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("Rating", e.target.value);
    router.push(`/catalog?${params.toString()}`);
  }
  return(
    <div className="space-x-3">
      <select onChange={handleGenreChange} className="text-sky-400 bg-transparent ring-1 ring-black px-2"
        defaultValue={searchParams.get("genre") || ""}>
        <option value="">Semua Genre</option>
        <option value="action">Action</option>
        <option value="role-playing-games-rpg">RPG</option>
        <option value="Adventure">Adventure</option>
      </select>
      <select onChange={handleRatingChange} className="text-sky-400 bg-transparent ring-1 ring-black px-2"
        defaultValue={searchParams.get("Rating") || ""}>
        <option value="">Semua Rating</option>
        <option value="4">4 Keatas</option>
        <option value="3">3 Keatas</option>
        <option value="2">2 Keatas</option>
      </select>
    </div>
  )

}