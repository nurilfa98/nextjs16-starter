// Membuat akun ADMIN pertama, karena belum ada halaman register.
//
// Cara pakai (jalankan setelah pnpm db:migrate):
//   pnpm db:create-admin admin@contoh.com passwordRahasia "Nama Admin"
//
// Admin lalu membuat akun pengguna lain lewat menu Pengguna. Akun yang dibuat
// script ini langsung bisa dipakai login (password tidak ditandai sementara).
//
// Catatan: password yang diketik di terminal tersimpan di riwayat shell.
// Setelah login, ganti password lewat menu user → "Ganti password".

import nextEnv from "@next/env";
import bcrypt from "bcryptjs";
import postgres from "postgres";

nextEnv.loadEnvConfig(process.cwd());

const [email, password, fullName = "Administrator"] = process.argv.slice(2);

if (!email || !password) {
  console.error('Cara pakai: pnpm db:create-admin <email> <password> ["Nama Lengkap"]');
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password minimal 8 karakter.");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL);

try {
  const normalizedEmail = email.trim().toLowerCase();

  // Email milik user yang sudah dihapus (deleted_at terisi) boleh dipakai lagi.
  const [existing] = await sql`
    select id from users where email = ${normalizedEmail} and deleted_at is null limit 1`;
  if (existing) {
    console.error(`Email ${normalizedEmail} sudah terdaftar.`);
    process.exitCode = 1;
  } else {
    // Cost 12, sama dengan src/lib/auth/password.ts
    const passwordHash = await bcrypt.hash(password, 12);

    await sql`
      insert into users (id, full_name, email, password_hash, role)
      values (${crypto.randomUUID()}, ${fullName}, ${normalizedEmail}, ${passwordHash}, 'ADMIN')`;

    console.log(`✓ Akun ADMIN dibuat: ${normalizedEmail}`);
  }
} finally {
  await sql.end();
}
