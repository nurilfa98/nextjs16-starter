// Daftar role disimpan sebagai konstanta (bukan string bebas) supaya TypeScript
// menangkap typo seperti "ADMINS". File ini TIDAK memakai `server-only`
// karena Client Component juga boleh memakainya, misalnya untuk menyembunyikan
// tombol. Ingat: menyembunyikan tombol bukan pengaman, pengecekan sebenarnya
// tetap di server (lib/auth/dal.ts).
//
// Satu user = satu role, disimpan di kolom users.role (tidak ada tabel roles).
// Tambah role baru: (1) tambahkan ke ROLES dan ROLE_LABELS di bawah,
// (2) atur haknya di lib/auth/permissions.ts, (3) `pnpm db:generate` supaya
// CHECK constraint users.role ikut diperbarui.
//
// ADMIN = pengelola aplikasi: kelola pengguna, lihat audit log & error log.
// USER  = pengguna biasa: hanya mengelola akunnya sendiri (Profil).
export const ROLES = ["ADMIN", "USER"] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

// Nama role yang tampil di UI. Kode tetap memakai nilai aslinya (ADMIN, dst).
export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrator",
  USER: "Pengguna",
};
