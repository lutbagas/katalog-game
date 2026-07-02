// app/dashboard/page.tsx
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";
import { fetchGames } from "@/lib/rawg-api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  MdArrowForward,
  MdGroups,
  MdLibraryBooks,
  MdOutlineStar,
  MdSportsEsports,
} from "react-icons/md";

export default async function DashboardPage() {
  const loggedIn = (await cookies()).get("loggedIn")?.value;

  if (!loggedIn) {
    redirect("/login");
  }

  const [top, recent] = await Promise.all([
    fetchGames({ pageSize: 4, ordering: "-rating" }),
    fetchGames({ pageSize: 4, ordering: "-released" }),
  ]);

  const kpi = [
    { label: "Top Picks", value: top.length, icon: MdOutlineStar },
    { label: "Rilis Baru", value: recent.length, icon: MdSportsEsports },
    { label: "Komunitas", value: "Live", icon: MdGroups },
  ];

  return (
    <main className="min-h-screen text-neutral-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-xl text-slate-950">
              <MdLibraryBooks aria-hidden="true" />
            </span>
            Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/catalog"
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/20"
            >
              Buka Katalog
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <section className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/10 p-6 shadow-xl shadow-slate-950/20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-200">
              Overview
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Selamat datang kembali
            </h1>
            <p className="mt-2 max-w-2xl text-white/70">
              Pantau game dengan rating tinggi dan rilis terbaru dari RAWG.
            </p>
          </div>
          <Link
            href="/community"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Explore Community
            <MdArrowForward aria-hidden="true" />
          </Link>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {kpi.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-slate-950/45 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-white/65">{item.label}</p>
                  <Icon className="text-2xl text-cyan-200" aria-hidden="true" />
                </div>
                <p className="mt-3 text-3xl font-semibold">{item.value}</p>
              </div>
            );
          })}
        </section>

        <section className="flex flex-wrap gap-3">
          {[
            { label: "Katalog", href: "/catalog" },
            { label: "Rating", href: "/catalog-rating" },
            { label: "Komunitas", href: "/community" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
            >
              {item.label}
            </Link>
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
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link href="/catalog" className="text-sm text-cyan-200 hover:text-cyan-100">
          Lihat semua
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((game) => (
          <Link
            key={game.id}
            href={`/game/${game.id}`}
            className="group overflow-hidden rounded-xl border border-white/10 bg-slate-950/45 transition hover:border-cyan-200/40 hover:bg-white/10"
          >
            <div className="aspect-[16/9] overflow-hidden bg-slate-950">
              <img
                src={game.background_image || "/placeholder.jpg"}
                alt={game.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-medium">{game.name}</h3>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/75">
                  {game.rating?.toFixed?.(1) ?? "-"}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-white/55">
                {game.genres?.map((genre: any) => genre.name).slice(0, 2).join(", ") || "-"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
