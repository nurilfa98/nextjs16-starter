// Pencatat audit log. Dipakai oleh SEMUA fitur (auth, users, dst), karena itu
// letaknya di lib/, bukan di features/. Folder features/audit berisi halaman
// untuk MELIHAT log (khusus yang punya permission audit:view).
//
// Aturan pakai:
// - Panggil SETELAH aksi berhasil, dengan data sebelum (oldValues) dan
//   sesudah (newValues) perubahan.
// - Jangan simpan data rahasia (password, token) di oldValues/newValues.
// - Untuk perubahan data penting, kirim `tx` agar log ikut transaksi yang sama:
//   kalau perubahan gagal/di-rollback, log-nya juga batal.
//
//     await db.transaction(async (tx) => {
//       await tx.update(users).set({ isActive: false }).where(eq(users.id, id));
//       await logAudit({ userId: actor.id, action: "USER_DEACTIVATED", entityName: "users", entityId: id }, tx);
//     });
//
// Referensi: https://orm.drizzle.team/docs/transactions

import "server-only";
import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";

// Daftar aksi dibuat sebagai union type supaya penamaan konsisten dan mudah
// difilter di halaman audit. Format: <ENTITAS>_<AKSI> KAPITAL. Tambahkan
// seiring fitur bertambah (dan daftarkan labelnya di features/audit/constants.ts).
export type AuditAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "SESSION_REVOKED"
  | "PASSWORD_CHANGED"
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_ACTIVATED"
  | "USER_DEACTIVATED"
  | "USER_DELETED"
  | "USER_RESTORED"
  | "USER_PASSWORD_RESET";

type AuditEntry = {
  userId: string | null; // pelaku
  action: AuditAction;
  entityName: string; // nama tabel yang terdampak, misal "users"
  entityId: string; // id baris yang terdampak
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string | null;
};

// Tipe `tx` di dalam db.transaction(async (tx) => ...)
type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function logAudit(entry: AuditEntry, tx: typeof db | Transaction = db) {
  await tx.insert(auditLogs).values(entry);
}
