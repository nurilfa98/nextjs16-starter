# Panduan untuk Claude

<!-- BEGIN:starter-onboarding -->
## ⚠️ Proyek ini belum diinisialisasi (masih berisi template starter)

**Sebelum mengerjakan permintaan user apa pun**, baca
[docs/ONBOARDING.md](docs/ONBOARDING.md) dan jalankan prosedurnya: tanyakan
aplikasi apa yang akan dibuat (atau diskusi menyusun alur bisnis dari cerita
operasional klien), putuskan perlu-tidaknya `docs/BUSINESS-FLOW.md`, ganti
identitas, lalu tulis ulang file ini (blok ini ikut dihapus). Bila
`docs/BUSINESS-FLOW.md` sudah ada tetapi blok ini masih ada, diskusi belum selesai:
lanjutkan, jangan mulai dari awal.

Lewati bila `git remote get-url origin` mengarah ke `nurilfa98/nextjs16-starter`
**dan** `name` di `package.json` masih `nextjs16-starter` (sedang mengembangkan
starter-nya sendiri), atau bila user meminta melewatinya.
<!-- END:starter-onboarding -->

Starter template web app Next.js 16 (App Router, React 19, TypeScript, Tailwind v4,
shadcn/ui, PostgreSQL + Drizzle, iron-session). **Wajib** membaca dua dokumen
berikut sebelum menulis atau mengubah kode, dan mengikutinya:

1. [docs/CONVENTIONS.md](docs/CONVENTIONS.md): penamaan kode & database, soft
   delete, format (tab 2, LF), komponen reusable, layout PWA tanpa sidebar,
   Conventional Commits.
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): struktur folder, arah dependensi,
   alur data (query & Server Action), keamanan berlapis.

Next.js di proyek ini punya perubahan besar dibanding versi lama: baca
`AGENTS.md` dan dokumentasi di `node_modules/next/dist/docs/` sebelum memakai API Next.js.

## Aturan yang paling sering dilanggar

- Fungsi & variabel `camelCase`, class/type/komponen `PascalCase`, konstanta
  `UPPER_SNAKE_CASE`, file & folder `kebab-case`. Identifier berbahasa Inggris;
  komentar dan teks UI berbahasa Indonesia.
- Indentasi **2 spasi**, akhir baris **LF**, di semua jenis file.
- Tabel `snake_case` jamak. Foreign key `<tabel_tunggal>_id` (sekali `_id`);
  kolom pelaku `created_by` / `updated_by` / `deleted_by`; index `idx_<tabel>_<kolom>`.
- Tabel bisnis memakai `auditColumns()` dan **soft delete** (`deleted_at`).
  Setiap query ke tabel itu wajib `notDeleted(tabel)`. Satu user = satu role
  (kolom `users.role`), tidak ada tabel `roles`.
- Pakai komponen global di `src/components` (DataTable, DatePicker, NumberInput,
  PasswordInput, PhoneInput, Input, ...) bila ada. Komponen khusus satu fitur
  tetap di `features/<fitur>/components`.
- UI **tanpa sidebar**: AppHeader + MenuLauncher (kotak ikon di `/`) + MenuFab.
  Menu baru hanya lewat `components/layout/nav-config.ts`.
- Server Action: validasi zod → `verifySession`/`requirePermission` → cek
  kepemilikan data → simpan + `logAudit` → revalidate → `ActionResult`.
- Commit mengikuti Conventional Commits: `tipe(scope): deskripsi bahasa Indonesia`.
- Sebelum menyatakan selesai: `pnpm typecheck` dan `pnpm lint` harus lolos.
- **Jangan membaca `CHANGELOG.md`** (dibuat otomatis oleh release-please dan makin
  panjang, tidak dibutuhkan untuk menulis kode) dan jangan menyuntingnya manual.
