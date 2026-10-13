# KSB UB

Website KSB UB menggunakan Next.js, TypeScript, Prisma, SQLite untuk lokal, dan PostgreSQL Supabase untuk production.

## Menjalankan lokal

1. Salin `.env.example` menjadi `.env`; gunakan `DATABASE_URL="file:./dev.db"` dan isi `AUTH_SECRET` acak minimal 32 karakter.
2. Jalankan `pnpm install`, `pnpm db:generate`, `pnpm db:migrate --name init`, dan `pnpm db:seed`.
3. Sinkronkan konten publik yang sudah disiapkan dengan `pnpm content:instagram`.
4. Buat admin: `pnpm admin:create admin@contoh.id kata-sandi-minimal-12 "Nama Anda"`.
5. Jalankan `pnpm dev`, lalu buka alamat yang dicetak terminal. Hentikan dengan `Ctrl+C`.

Pemeriksaan: `pnpm test`, `pnpm lint`, dan `pnpm build`.

## Deploy Vercel + Supabase

1. Buat proyek PostgreSQL di [Supabase](https://supabase.com/dashboard), lalu buat bucket **public** bernama `ksb-media` di Storage. Jangan gunakan bucket untuk data privat.
2. Di Vercel, impor repository GitHub dan masukkan environment variable **Production**: `DATABASE_URL` (URL PostgreSQL Supabase), `AUTH_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, dan `SUPABASE_STORAGE_BUCKET=ksb-media`. Jangan gunakan prefix `NEXT_PUBLIC_` untuk secret.
3. Jalankan migrasi sekali dari komputer aman yang memiliki `DATABASE_URL` production: `pnpm db:migrate:deploy`. Jangan pernah menjalankan `migrate reset` pada production.
4. Vercel menjalankan `pnpm build:vercel` melalui [vercel.json](vercel.json), yang menghasilkan Prisma Client PostgreSQL sebelum `next build`.
5. Setelah deployment pertama, buat admin production melalui prosedur satu-kali yang aman (misalnya menjalankan script `admin:create` dengan environment production); jangan memasukkan kata sandi ke Git atau chat.

## Media, backup, dan pemeliharaan

- Endpoint `POST /api/admin/upload` hanya menerima admin yang login, JPEG/PNG/WebP maksimum 5 MB, lalu mengunggah ke Supabase Storage. Service-role key hanya berada di server.
- Gambar publik bawaan berada di `public/images/ksb`; gambar runtime production berada di Supabase Storage. Cadangkan database melalui Supabase dan ekspor bucket secara berkala.
- Perubahan pada `main` yang terhubung ke Vercel akan memicu deployment otomatis. Sebelum push, jalankan test dan build. Bila deployment gagal, lihat tab **Deployments → Build Logs** di Vercel.
- Saat pergantian pengurus/developer, rotasi `AUTH_SECRET`, kredensial database, dan service-role key; perbarui anggota admin; lalu verifikasi akses dashboard.

## Batasan

Supabase dan Vercel belum dibuat/terhubung dalam proyek ini. Tidak ada secret, URL koneksi, akun GitHub, atau kredensial cloud yang tersimpan di repository.
