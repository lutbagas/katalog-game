// app/dashboard/page.tsx
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";
import { fetchGames } from "@/lib/rawg-api";

export default async function DashboardPage() {
  const [top, recent] = await Promise.all([
    fetchGames({ pageSize: 4, ordering: "-rating" }),
    fetchGames({ pageSize: 4, ordering: "-released" }),
  ]);
  const kpi = [
    { label: "Total Game", value: 128 },
    { label: "Favorit", value: 10 },
    { label: "Baru", value: recent.length },
  ];
  return (
    <main className="min-h-screen bg-slate-800 text-neutral-100">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-slate-700/30 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link href="/catalog" className="rounded-xl border border-neutral-800
             bg-neutral-900 px-3 py-1.5 text-sm hover:bg-neutral-850">Buka Katalog</Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* KPI */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpi.map(i => (
            <div key={i.label} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <p className="text-sm text-neutral-300">{i.label}</p>
              <p className="mt-2 text-3xl font-semibold">{i.value}</p>
            </div>
          ))}
        </section>
        {/* Aksi cepat */}
        <section className="flex flex-wrap gap-3">
          {["Tambah Game", "Genre", "Impor CSV"].map((label, idx) => (
            <Link key={label} href={["/games/new", "/genres", "/import"][idx]} className="rounded-2xl
             border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm hover:bg-neutral-850">{label}</Link>
          ))}
        </section>
        <Section title="Rating Tertinggi" items={top} />
        <Section title="Rilis Terbaru" items={recent} />
      </div>
    </main>
  );
}

function Section({ title, items }: { title: string; items: any[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link href="/catalog" className="text-sm text-neutral-400 hover:text-neutral-200">Lihat semua</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(g => (
          <a key={g.id} href={`/game/${g.slug}`} className="group overflow-hidden rounded-2xl border
           border-neutral-800 bg-neutral-900 hover:bg-neutral-850">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={g.background_image} alt={g.name} className="h-full w-full object-cover
               transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-medium">{g.name}</h3>
                <span className="rounded-full border border-neutral-800
                 px-2 py-0.5 text-xs">{g.rating?.toFixed?.(1) ?? "-"}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                {g.genres?.map((x: any) => x.name).slice(0, 2).join(" • ") || "—"}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
