import Link from "next/link";
import { Navbar } from "@/components/NavBar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getDisplayName(email: string) {
  const name = email.split("@")[0] || "member";

  return name
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getInitial(email: string) {
  return getDisplayName(email).charAt(0).toUpperCase() || "U";
}

const joinedFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function CommunityPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen text-white">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-200">
                Explore Community
              </p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                Member yang sudah register
              </h1>
              <p className="mt-3 max-w-2xl text-white/80">
                Lihat siapa saja yang sudah bergabung di platform katalog game
                ini.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="rounded-xl bg-blue-600/70 px-5 py-2 font-semibold hover:bg-blue-600"
              >
                Join Community
              </Link>
              <Link
                href="/catalog"
                className="rounded-xl border border-white/20 bg-black/10 px-5 py-2 hover:bg-white/20"
              >
                Open Catalog
              </Link>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-4">
            <h2 className="text-xl font-semibold">Registered Members</h2>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm text-white/85">
              {users.length} member
            </span>
          </div>

          {users.length === 0 ? (
            <div className="rounded-xl border border-white/15 bg-white/10 p-8 text-center">
              <h3 className="text-xl font-semibold">Belum ada member</h3>
              <p className="mt-2 text-white/75">
                Jadilah orang pertama yang register di platform ini.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <article
                  key={user.id}
                  className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-lg font-bold text-slate-950">
                      {getInitial(user.email)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold">
                        {getDisplayName(user.email)}
                      </h3>
                      <p className="truncate text-sm text-white/75">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-white/85">
                      {user.role}
                    </span>
                    <span className="text-white/70">
                      Joined {joinedFormatter.format(user.createdAt)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
