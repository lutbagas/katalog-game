# Katalog Game

Katalog Game adalah aplikasi katalog game berbasis web yang dibangun dengan Next.js. Proyek ini menggunakan Prisma untuk akses database dan dirancang agar mudah dikembangkan.

## Fitur Utama

- Katalog game dengan halaman detail.
- Sistem autentikasi pengguna.
- Dashboard dan profil pengguna.
- API route untuk kebutuhan data aplikasi.

## Prasyarat

- Node.js 20+
- NPM (atau package manager lain yang kompatibel)

## Instalasi

```bash
npm install
```

## Menjalankan Aplikasi

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`.

## Script Penting

- `npm run dev` - menjalankan mode development.
- `npm run build` - build untuk production.
- `npm run start` - menjalankan hasil build.
- `npm run lint` - menjalankan linting.
- `npm run clean` - membersihkan artefak build dan cache.

## Struktur Direktori

```text
src/
  app/         # Routing dan halaman (Next.js App Router)
  components/  # Komponen UI reusable
  data/        # Data statis/seed di sisi frontend
  lib/         # Helper, utilitas, dan konfigurasi
  types/       # Definisi tipe TypeScript
prisma/        # Skema dan konfigurasi Prisma
public/        # Aset statis
```

## Konfigurasi Environment

Buat file `.env` sesuai kebutuhan. Contoh:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/katalog_game"
```

Sesuaikan nilai environment dengan konfigurasi lokal Anda.

## Lisensi

Lisensi belum ditentukan.
