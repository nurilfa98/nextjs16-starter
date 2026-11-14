-- Role ADMIN lama (pengelola penuh) berubah menjadi DEVELOPER: akun teknis yang
-- tersembunyi dan punya akses Log Error. ADMIN baru (pengelola pengguna) dibuat
-- setelahnya lewat UI bila dibutuhkan.
ALTER TABLE "users" DROP CONSTRAINT "ck_users_role";--> statement-breakpoint
UPDATE "users" SET "role" = 'DEVELOPER' WHERE "role" = 'ADMIN';--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "ck_users_role" CHECK ("role" IN ('DEVELOPER', 'ADMIN', 'USER'));
