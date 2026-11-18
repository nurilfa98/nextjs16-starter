# Onboarding Proyek Baru

Prosedur ini dijalankan **Claude** satu kali, saat repo hasil salinan starter
dibuka pertama kali (dipicu blok `starter-onboarding` di `CLAUDE.md`). Tujuannya
mengubah repo dari "template starter" menjadi "proyek nyata": identitas diganti,
`CLAUDE.md` ditulis ulang, dan dokumen bisnis dibuat dari jawaban user.

Ada dua mode, dipilih user di langkah 2:

- **Mode cepat**: user sudah tahu aplikasinya; wawancara 2 putaran.
- **Mode diskusi**: user membawa cerita operasional klien (misalnya usaha UMKM)
  dan ingin menyusun alur bisnisnya bersama Claude **sebelum** development.

Setelah selesai, **hapus file ini** (langkah 9).

## Prinsip

- Tanyakan, jangan menebak. Jangan mengarang alur bisnis, istilah, atau aturan
  yang tidak disebut user. Yang belum diketahui ditulis sebagai `TODO:` atau
  masuk bagian "Pertanyaan terbuka", bukan diisi asumsi.
- Mode cepat: wawancara pendek, maksimal 2 putaran. Mode diskusi: percakapan
  bergilir yang panjangnya mengikuti kebutuhan (langkah 4).
- Pertanyaan pilihan memakai `AskUserQuestion`; pertanyaan bebas (deskripsi
  aplikasi, cerita operasional) ditanyakan lewat chat.
- Semua teks yang ditulis ke dokumen berbahasa Indonesia, identifier berbahasa
  Inggris (aturan di `CONVENTIONS.md` bagian 1).
- Jangan menulis kode fitur selama onboarding. Hasil akhirnya hanya identitas,
  dokumen, dan konfigurasi dasar.
- Tampilkan ringkasan perubahan dan minta persetujuan sebelum menghapus file atau
  membuat commit.

## 1. Cek apakah onboarding perlu dijalankan

Lewati seluruh prosedur ini bila **keduanya** benar:

- `git remote get-url origin` mengarah ke `nurilfa98/nextjs16-starter`, dan
- `name` di `package.json` masih `nextjs16-starter`.

Itu berarti sedang mengembangkan starter-nya sendiri. Bila user menyuruh
memulai onboarding secara eksplisit, jalankan saja.

**Melanjutkan sesi sebelumnya:** bila blok `starter-onboarding` masih ada di
`CLAUDE.md` **dan** `docs/BUSINESS-FLOW.md` sudah ada, berarti mode diskusi
pernah dimulai dan belum selesai. Baca draf itu, ringkas posisi terakhir
(bagian mana yang sudah jelas, apa saja `TODO:` yang tersisa), dan lanjutkan
langkah 4 dari sana. Jangan mengulang pertanyaan dari awal dan jangan menimpa draf.

## 2. Pilih mode

Tanyakan satu pertanyaan dengan `AskUserQuestion`:

| Opsi | Kapan | Lanjut ke |
| --- | --- | --- |
| **Saya sudah tahu aplikasinya** | Gambaran sudah jelas; tinggal setup. | Langkah 3 |
| **Saya punya cerita operasional klien, mau diskusi menyusun alur bisnis dulu (Direkomendasikan bila alurnya belum tertulis)** | Aplikasi dibuat dari cerita/kebutuhan klien, terutama usaha kecil (UMKM) yang prosesnya belum terdokumentasi. | Langkah 4 |

Bila cerita klien sudah tertulis (catatan, chat WhatsApp, transkrip, daftar
nota), cukup pilih opsi kedua lalu tempel isinya; Claude mulai dari bahan itu.

## 3. Mode cepat, putaran 1: kenali aplikasinya (pertanyaan bebas)

Tanyakan lewat chat, dalam satu pesan:

1. **Aplikasi apa yang mau dibuat?** Nama (sementara pun boleh), masalah yang
   diselesaikan, dan siapa pemakainya.
2. **Nama usaha/organisasi pemilik** (untuk footer dan `COMPANY_NAME`).
3. **Modul/fitur utama** yang terpikir, satu baris per modul (boleh belum lengkap).
4. **Proses yang punya beberapa langkah, status, atau persetujuan**, bila ada
   (misalnya: pengajuan → disetujui → diproses → selesai).

Dari jawaban ini turunkan: nama paket (`kebab-case`), `PRODUCT_NAME`,
`PRODUCT_TAGLINE`, `PRODUCT_DESCRIPTION`, `COMPANY_NAME`, `COOKIE_PREFIX`.
Usulkan nilainya ke user, jangan langsung ditulis.

## 4. Mode diskusi: susun alur bisnis dari cerita klien

Tujuannya satu: menghasilkan `docs/BUSINESS-FLOW.md` yang cukup jelas untuk
mulai development, **tanpa menulis kode**. Lawan bicara adalah developer yang
mewakili klien, jadi hal yang hanya klien yang tahu ditandai
`TODO (tanya klien):`.

### Cara berdiskusi

- Mulai dengan satu ajakan bebas: *"Ceritakan usaha klien dan satu kejadian
  nyata dari awal sampai akhir, misalnya satu pesanan dari pelanggan datang
  sampai uangnya diterima."* Jangan menyodorkan formulir panjang.
- **Satu topik per giliran, maksimal 3 pertanyaan, masing-masing satu kalimat
  tanpa anak pertanyaan** (hindari "siapa..., kapan..., dan dengan apa...?" dalam
  satu butir). Minta contoh konkret (angka, nama barang, kejadian minggu lalu),
  bukan jawaban abstrak.
- **Pakai kata-kata klien**, bukan istilah korporat. UMKM jarang punya
  "persetujuan", "departemen", atau "SOP"; mungkin yang ada "titip nota",
  "kasbon", "DP". Catat istilah itu apa adanya di glosarium dan petakan ke
  identifier Inggris.
- **Ulangi dengan kata sendiri** setelah tiap topik (3-6 baris atau diagram
  `mermaid` sederhana) dan minta dikoreksi. Pisahkan jelas mana **fakta dari
  klien** dan mana **usulan Claude**; usulan ditandai "usulan, belum
  dikonfirmasi".
- Jangan menawarkan solusi teknis (tabel, API, library) di tahap ini. Usulan
  fitur boleh, asal berupa pertanyaan ("perlu dicatat siapa yang mengantar?").
- **Tulis ke `docs/BUSINESS-FLOW.md` secara bertahap** (kerangka di langkah 7)
  setiap satu topik selesai, bukan di akhir. Dengan begitu diskusi bisa
  dilanjutkan di sesi lain (lihat "Melanjutkan sesi" di langkah 1). Blok
  `starter-onboarding` di `CLAUDE.md` **tetap ada** sampai langkah 9.

### Daftar topik (urutan fleksibel, lewati yang tidak relevan)

1. **Gambaran usaha**: jual apa, skala (omzet kasar, jumlah orang, jumlah
   cabang/lokasi), siapa pemiliknya, jam operasional.
2. **Pelaku**: pemilik, karyawan/kasir/kurir, pelanggan, pemasok. Siapa mengerjakan
   apa, dan memakai perangkat apa (HP, laptop, tablet bersama?). Siapa yang
   benar-benar akan membuka aplikasi ini.
3. **Alur utama**: telusuri satu kasus nyata dari pemicu sampai selesai, satu
   alur sekali. Tanyakan di tiap langkah: siapa, di mana, apa yang dicatat.
4. **Cara kerja sekarang dan yang menyakitkan**: dicatat di mana (buku, nota,
   WhatsApp, Excel, ingatan), apa yang sering salah atau hilang, apa yang paling
   memakan waktu.
5. **Uang**: harga (tetap/bisa ditawar/bertingkat), diskon, DP, cicilan/termin,
   hutang-piutang, metode bayar (tunai, transfer, QRIS), siapa memegang uang.
6. **Barang/bahan/stok** (bila relevan): satuan, cara menghitung stok, bahan baku
   vs barang jadi, pemasok, minimum stok.
7. **Pengecualian**: batal, retur, salah input, pelanggan tidak bayar, barang
   rusak/kurang, harga berubah di tengah jalan.
8. **Laporan**: apa yang ingin pemilik lihat (harian/mingguan/bulanan), dalam
   bentuk apa (layar HP, PDF, Excel, dikirim lewat WhatsApp).
9. **Batas dan prioritas**: apa yang **tidak** dibangun sekarang, dan mana yang
   wajib ada di Fase 1 agar klien sudah terbantu (usahakan satu alur utama
   dulu). Ini mengisi bagian "Prioritas & fase".
10. **Istilah klien** yang belum dibahas, dan data lama yang perlu dipindahkan
    (spreadsheet, buku).

### Menutup diskusi

**Hanya user yang memutuskan diskusi selesai.** Claude tidak boleh menutupnya
sendiri.

- **Selesai**: user menyatakan cukup, dengan kata apa pun yang bermaksud itu
  ("cukup", "sudah", "lanjut setup", "tutup diskusi"). Bila maksudnya ambigu,
  tanyakan satu kali: "Saya tutup diskusi dan lanjut ke setup?".
- **Claude boleh mengusulkan** menutup bila topik 1-9 sudah punya isi atau
  `TODO:` yang disadari, dengan satu kalimat ("Semua topik sudah tersentuh,
  mau saya tutup?"). Bila user belum menjawab ya, diskusi berlanjut.
- **Jeda bukan selesai**: "lanjut besok", "nanti dulu", atau sesi ditutup di
  tengah jalan berarti diskusi dijeda. Simpan draf, **jangan** menjalankan langkah
  5 dan seterusnya, dan biarkan blok onboarding di `CLAUDE.md` (sesi berikutnya
  akan melanjutkan lewat aturan di langkah 1). Tulis juga satu baris
  `Posisi diskusi:` di bagian "Pertanyaan terbuka" `BUSINESS-FLOW.md`: topik
  terakhir yang dibahas dan pertanyaan yang tertunda, supaya sesi berikutnya
  tidak harus menebak dari `TODO:`. Hapus baris itu saat diskusi ditutup.

Setelah user menutup diskusi:

1. Bacakan ringkasan seluruh alur (maksimal satu layar) dan minta koreksi
   terakhir.
2. Rekomendasikan irisan **Fase 1** (alur paling berharga yang paling kecil)
   dan tunggu keputusan user.
3. Tawarkan menyusun semua `TODO (tanya klien):` menjadi **satu pesan siap kirim
   ke klien**, bahasa sederhana, bernomor, mudah dijawab lewat WhatsApp.
4. Lanjut ke langkah 5, tetapi **lewati pertanyaan yang sudah terjawab** oleh
   diskusi: role diturunkan dari topik 2, layanan luar dari topik 3 dan 8,
   dokumen bisnis otomatis "Lengkap" (sudah dibuat). Nama aplikasi dan
   `COMPANY_NAME` (nama usaha klien; bila klien tidak berbadan usaha, pakai nama
   usahanya atau nama developer/penyedia aplikasi) diusulkan dari cerita.

## 5. Keputusan struktur (`AskUserQuestion`)

Ajukan sekaligus, sesuaikan opsi dengan jawaban sebelumnya:

| Pertanyaan | Opsi | Dampak |
| --- | --- | --- |
| Dokumen bisnis? | **Lengkap** `docs/BUSINESS-FLOW.md` · **Ringkas** (hanya bagian 1-4) · Tidak perlu | Lihat "Rekomendasi dokumen" di bawah. |
| Role selain Developer/Admin/User? | Cukup bawaan · Tambah role | Role baru: `src/lib/auth/roles.ts` + `permissions.ts`, dan migration (kolom `users.role` bertipe enum). |
| Layanan luar yang dipakai? (pilih banyak) | Email (Resend) · WhatsApp (Fonnte) · Upload file (R2) · Tidak ada | Dicatat di bagian "Layanan luar" `README.md` dan `BUSINESS-FLOW.md` bagian 8 (kegunaannya `TODO:` bila belum disebut). Kode dan `.env.example` tidak diubah. |
| Target deploy? | Vercel · VPS/Docker · Belum tahu | `vercel.json` dipertahankan bila Vercel; selain itu catat cara menjadwalkan `/api/cron/cleanup`. |

### Rekomendasi dokumen

`docs/BUSINESS-FLOW.md` adalah **satu-satunya** dokumen tambahan yang
disarankan. Alasannya: `CONVENTIONS.md` dan `ARCHITECTURE.md` sudah menjawab
"bagaimana menulis kode", sedangkan yang belum ada adalah "apa yang dibangun dan
kenapa". Dokumen lain sengaja tidak dibuat:

- **Skema database**: sumbernya `src/lib/db/schema.ts`; menyalinnya ke dokumen
  hanya menghasilkan dokumen yang basi.
- **Daftar API/endpoint**: Server Action dan route sudah terdokumentasi lewat
  kodenya dan `ARCHITECTURE.md`.
- **Glosarium terpisah**: cukup satu bagian di `BUSINESS-FLOW.md`.

Pilih tingkat kedalaman dengan aturan ini:

- **Lengkap**: ada proses multi-langkah/status/persetujuan, rumus atau aturan
  hitung, atau lebih dari satu role dengan wewenang berbeda.
- **Ringkas** (bagian 1-4 saja): aplikasi pada dasarnya CRUD dengan satu-dua role.
- **Tidak perlu**: hanya prototipe/eksperimen. Tetap tulis 3-5 baris konteks
  bisnis di `CLAUDE.md` (langkah 9).

## 6. Terapkan identitas

Tunjukkan nilai yang akan ditulis, tunggu persetujuan, lalu:

1. `package.json`: ganti `name`.
2. `src/lib/brand.ts`: `PRODUCT_NAME`, `PRODUCT_TAGLINE`, `PRODUCT_DESCRIPTION`,
   `COMPANY_NAME`, `COOKIE_PREFIX`, `COPYRIGHT_YEAR`.
3. Jalankan `pnpm release:reset` (versi `0.1.0`, `CHANGELOG.md` dikosongkan).
   Ingatkan user menghapus tag lama bila ikut ter-clone
   (`git tag -d vX.Y.Z`). Jangan menghapus tag/remote sendiri.
4. Ingatkan hal yang tidak bisa dilakukan Claude: ganti logo
   (`src/components/layout/logo-mark.tsx`, `src/app/icon.svg`) lalu
   `pnpm icons:generate`; ubah `git remote` bila masih mengarah ke starter.
5. `README.md`: tulis ulang judul dan paragraf pembuka sesuai aplikasi; hapus
   kata "starter", `pnpm release:reset`, dan langkah ganti identitas dari bagian
   **langkah setup**. Baris `pnpm release:reset` di tabel "Perintah" tetap
   dipertahankan (perintahnya masih ada). Langkah `.env`, migrate, dan
   `db:create-developer` tetap dipertahankan.
6. Jangan menyentuh `.env` dan `.env.example`; keduanya milik user.
7. Ganti kata "starter ini" di komentar `src/lib/brand.ts` dan
   `scripts/reset-release.mjs` menjadi "proyek ini".

## 7. Buat `docs/BUSINESS-FLOW.md`

Isi dari jawaban user memakai kerangka di bawah. Untuk versi **Ringkas**, ambil
bagian 1-4 saja. Pada bagian yang user belum jawab, tulis `TODO:` beserta
pertanyaan yang perlu dijawab. Pada mode diskusi, dokumen ini sudah terbentuk
bertahap di langkah 4; di sini cukup dirapikan (nomor, tautan, `TODO:` yang
tersisa) dan bagian "Prioritas & fase" dipastikan terisi.

````markdown
# Alur Bisnis: <Nama Aplikasi>

Dokumen ini menjelaskan APA yang dibangun dan KENAPA. Cara menulis kodenya ada
di [CONVENTIONS.md](./CONVENTIONS.md) dan [ARCHITECTURE.md](./ARCHITECTURE.md).
Bila alur atau aturan bisnis berubah, perbarui dokumen ini pada commit yang sama.

## 1. Ringkasan

- Tujuan: <satu kalimat>
- Masalah yang diselesaikan: <...>
- Cara kerja sekarang: <dicatat di mana, apa yang sering salah>
- Pemakai: <siapa saja, memakai perangkat apa>
- Di luar cakupan: <hal yang sengaja tidak dikerjakan>

## 2. Aktor & role

| Aktor | Role di sistem (`users.role`) | Boleh melakukan | Permission |
| --- | --- | --- | --- |
| Developer | `DEVELOPER` | Semua, termasuk error log | semua |
| ... | ... | ... | `resource:aksi` |

## 3. Glosarium

Istilah bisnis (Indonesia) dan identifier di kode (Inggris) harus konsisten.

| Istilah bisnis | Identifier | Arti |
| --- | --- | --- |
| Pengajuan | `request` / tabel `requests` | ... |

## 4. Modul & menu

| Modul | Menu (`nav-config.ts`) | Dilihat oleh | Tabel utama |
| --- | --- | --- | --- |
| ... | `/path` | role / permission | `nama_tabel` |

## 5. Alur proses

Satu sub-bagian per proses:

### 5.1 <Nama proses>

- Pemicu: <siapa/apa yang memulai>
- Langkah: 1. ... 2. ...
- Status & transisi: `DRAFT` → `SUBMITTED` → `APPROVED` / `REJECTED`
  (siapa yang boleh memindahkan, syaratnya)
- Notifikasi: <siapa diberi tahu, lewat apa>
- Dicatat di audit log: <aksi apa saja>

## 6. Aturan bisnis

Beri nomor agar bisa dirujuk di kode dan commit (`BR-03`).

| No | Aturan | Berlaku pada |
| --- | --- | --- |
| BR-01 | ... | ... |

## 7. Laporan & output

Daftar laporan, ekspor (Excel/PDF), cetak, atau dashboard: isi, filter, pemakainya.

## 8. Integrasi & data luar

Sistem atau layanan lain yang terhubung, arah data, dan frekuensinya.

## 9. Pertanyaan terbuka

- [ ] <hal yang belum diputuskan, siapa yang memutuskan>

## 10. Prioritas & fase

| Fase | Isi | Alasan |
| --- | --- | --- |
| 1 | <alur/fitur yang wajib ada agar klien sudah terbantu> | ... |
| Nanti | <hal yang ditunda> | ... |
````

Pada mode diskusi, kolom "Istilah bisnis" di glosarium memakai kata-kata klien
apa adanya (mis. "kasbon", "titip nota"), bukan padanan korporat.

## 8. Role baru (hanya bila user minta)

Ikuti `CONVENTIONS.md` bagian 4 dan checklist bagian 7: tambah di `roles.ts`,
daftarkan di `ROLE_PERMISSIONS` (`permissions.ts`), buat migration lewat
`pnpm db:generate` (tidak butuh koneksi database), dan perbarui tabel role di
`BUSINESS-FLOW.md`. Permission fitur (mis. `loan:approve`) **belum dibuat**
karena kode fitur dilarang selama onboarding: isi role baru dengan array kosong
`[]` dan komentar singkat, lalu tulis `TODO:` di kolom Permission
`BUSINESS-FLOW.md`. Jalankan `pnpm typecheck` dan `pnpm lint`.

## 9. Tulis ulang `CLAUDE.md` lalu bersihkan

1. **Hapus blok** `<!-- BEGIN:starter-onboarding -->` sampai
   `<!-- END:starter-onboarding -->` dari `CLAUDE.md`.
2. **Ganti paragraf pembuka** (yang menyebut "Starter template") dengan deskripsi
   aplikasi 1-2 kalimat + ringkasan stack. Pertahankan kalimat peringatan
   Next.js 16 dan `AGENTS.md`.
3. **Daftar dokumen wajib baca**: bila `BUSINESS-FLOW.md` dibuat, jadikan butir
   pertama ("apa yang dibangun, istilah, alur, aturan bisnis; perbarui bila
   alur berubah"), lalu `CONVENTIONS.md` dan `ARCHITECTURE.md`.
4. **Tambahkan bagian "Konteks bisnis singkat"** (3-5 butir: aktor & role,
   modul utama, istilah kunci) setelah daftar dokumen. Pada pilihan "Tidak perlu
   dokumen", bagian inilah satu-satunya konteks bisnis.
5. **Biarkan** bagian "Aturan yang paling sering dilanggar" apa adanya.
6. Bila `BUSINESS-FLOW.md` dibuat, tambahkan satu butir di `CONVENTIONS.md`
   bagian 9 (Definition of done): "Alur/aturan bisnis yang berubah sudah
   diperbarui di `docs/BUSINESS-FLOW.md`".
7. Di `CONVENTIONS.md`: **pindahkan** kalimat "Mengulang penomoran di tengah
   proyek: `pnpm release:reset [versi]`, hapus tag lama, lalu commit" ke akhir
   bagian 8.2, lalu hapus bagian **8.3 "Memulai proyek baru dari starter"**.
   Ganti kata "starter" di kalimat pembuka dan judul 4.3 menjadi
   "bawaan"/"proyek ini", dan hapus tautan ke bagian 8.3 di `README.md`.
8. Hapus `docs/ONBOARDING.md` ini.
9. Jalankan `pnpm typecheck` dan `pnpm lint`.
10. Tampilkan ringkasan file yang berubah, lalu tawarkan commit:
    `chore: inisialisasi proyek <nama-aplikasi>` (Conventional Commits).
    Setelah itu tanyakan fitur pertama yang mau dikerjakan dan mulai dari
    checklist `CONVENTIONS.md` bagian 7.
