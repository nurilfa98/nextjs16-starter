// Logika bisnis pengguna yang dipakai lebih dari satu Server Action, dipisah
// dari actions.ts agar actions tetap berisi alur: validasi → otorisasi →
// simpan + audit. File ini tidak mengecek permission; pemanggil yang wajib.

import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { notDeleted } from "@/lib/db/soft-delete";

// Tipe `tx` di dalam db.transaction(async (tx) => ...)
export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

// Apakah setelah `targetId` dihapus/dinonaktifkan/diturunkan rolenya masih ada
// administrator aktif lain? Baris administrator dikunci (FOR UPDATE) sampai
// transaksi selesai, sehingga dua admin yang saling menghapus bersamaan tidak
// bisa sama-sama lolos dan meninggalkan aplikasi tanpa administrator.
export async function hasOtherActiveAdmin(tx: Transaction, targetId: string) {
  const admins = await tx
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.role, "ADMIN"), eq(users.isActive, true), notDeleted(users)))
    .for("update");
  return admins.some((admin) => admin.id !== targetId);
}
