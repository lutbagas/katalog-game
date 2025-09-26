"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function FilterBar(){
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("genre", e.target.value);
    router.push(`/catalog?${params.toString()}`);
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("rating", e.target.value);
    router.push(`/catalog?${params.toString()}`);
  };

  return(
    <div className="flex flex-wrap gap-4 items-center">
      <select onChange={handleGenreChange} className="bg-[#2b2b3b] text-white p-2 rounded">
        <option value="">semua Genre</option>
        <option value="action">Action</option>
        <option value="rpg">RPG</option>
        <option value="shooter">Shooter</option>
      </select>
      <select onChange={handleRatingChange} className="bg-[#2b2b3b] text-white p2 rounded">
        <option value="">Semua Rating</option>
        <option value="4">4 keatas</option>
        <option value="3">3 Keatas</option>
        <option value="2">2 keatas</option>
      </select>
    </div>
  )
}