// app/catalog/page.tsx
import Link from "next/link";
import { fetchGames } from "@/lib/rawg-api";
import { GameCard } from "@/components/GameCard";

type SP = { view?: string; genres?: string; page?: string; q?: string };

export default async function CatalogPage({ searchParams }: { searchParams: SP }) {
  const view = (searchParams.view || "rating") as "rating" | "released" | "genres";
  const page = Number(searchParams.page || 1) || 1;
  const q = (searchParams.q || "").trim();
  const genre = (searchParams.genres || "").trim();

  const opts = (ordering?: string, g?: string) => ({
    pageSize: 12, page, ordering: q ? undefined : ordering, search: q || undefined, genres: g || undefined,
  });

  const data =
    view === "rating"
      ? await fetchGames(opts("-rating"))
      : view === "released"
      ? await fetchGames(opts("-released"))
      : await fetchGames(opts(undefined, genre || "action")); // default genre=action jika kosong

  const tabs: { key: SP["view"]; label: string }[] = [
    { key: "rating", label: "Sort by Rating" },
    { key: "released", label: "Sort by Release Date" },
    { key: "genres", label: "Sort by Genres" },
  ];

  const pill = (g: string, label: string) => {
    const u = new URLSearchParams({ view: "genres", genres: g });
    if (q) u.set("q", q);
    return (
      <Link
        key={g}
        href={`/catalog?${u.toString()}`}
        className={`rounded-2xl border px-3 py-1 text-sm ${
          genre === g ? "border-white/70 bg-white/10" : "border-white/15 bg-white/5 hover:bg-white/10"
        }`}
      >
        {label}
      </Link>
    );
  };

  const build = (p: number) => {
    const u = new URLSearchParams();
    u.set("view", view);
    if (q) u.set("q", q);
    if (genre) u.set("genres", genre);
    u.set("page", String(p));
    return `/catalog?${u.toString()}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#223159] via-[#312965] to-[#20697a] text-neutral-100">
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {q ? `Hasil untuk “${q}”` : view === "genres" ? `Genre: ${genre || "action"}` : "Katalog Game"}
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              {view === "rating" && "Urut rating tertinggi"}
              {view === "released" && "Rilis terbaru lebih dulu"}
              {view === "genres" && "Saring menurut genre"}
            </p>
          </div>
          <form action="/catalog" className="hidden md:block">
            <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2">
              <input name="q" defaultValue={q} placeholder="Cari..." className="bg-transparent outline-none text-sm" />
              <button className="rounded-lg bg-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-700">Cari</button>
            </div>
          </form>
        </header>

        {/* Tabs */}
        <nav className="flex flex-wrap gap-2">
          {tabs.map(t => {
            const u = new URLSearchParams({ view: String(t.key) });
            if (q) u.set("q", q);
            if (genre) u.set("genres", genre);
            return (
              <Link
                key={String(t.key)}
                href={`/catalog?${u.toString()}`}
                className={`rounded-2xl px-4 py-2 text-sm border ${
                  view === t.key ? "border-white/70 bg-white/10" : "border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        {/* Genre pills (muncul jika tab genres) */}
        {view === "genres" && (
          <div className="flex flex-wrap gap-2">
            {[
              ["action", "Action"],
              ["role-playing-games-rpg", "RPG"],
              ["adventure", "Adventure"],
              ["shooter", "Shooter"],
              ["strategy", "Strategy"],
              ["simulation", "Simulation"],
            ].map(([g, l]) => pill(g, l))}
          </div>
        )}

        {/* Grid */}
        {data.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center">
            <p className="text-neutral-300">Tidak ada hasil.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {data.map((g: any) => <GameCard key={g.id} game={g} />)}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <Link href={build(Math.max(1, page - 1))} className={`rounded-xl border px-4 py-2 text-sm ${page<=1?"pointer-events-none opacity-40":"hover:bg-neutral-900"}`}>← Sebelumnya</Link>
          <span className="text-xs text-neutral-500">Halaman {page}</span>
          <Link href={build(page + 1)} className={`rounded-xl border px-4 py-2 text-sm ${data.length===0?"pointer-events-none opacity-40":"hover:bg-neutral-900"}`}>Berikutnya →</Link>
        </div>
      </div>
    </main>
  );
}
