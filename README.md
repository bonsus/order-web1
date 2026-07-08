# Ordeo — ERP & Omnichannel Platform (Nuxt 4 SSR)

Website SaaS untuk **Ordeo**, platform ERP & omnichannel untuk seller: kelola order
marketplace, stok, gudang, pembayaran COD, dan laporan bisnis dalam satu sistem.

Dibangun dengan **Nuxt 4 (SSR)**, TypeScript, Tailwind CSS, SQLite + Drizzle ORM,
Nitro server API, autentikasi JWT (httpOnly cookie), dan hashing password bcrypt.

---

## ✨ Fitur

- Landing page premium (hero, fitur, workflow, testimoni, FAQ, footer legal)
- Halaman `/features`, `/pricing`, `/register`, `/login`, `/checkout`, `/checkout/success`
- Halaman legal: `/terms`, `/privacy`, `/refund-policy`
- Autentikasi register/login/logout dengan JWT di cookie httpOnly
- Alur checkout: simpan order ke SQLite dengan status `pending`
- Dummy payment yang **siap diganti ke Midtrans Snap API** (`server/utils/payment.ts`)
- Webhook Midtrans dummy untuk update status pembayaran
- Seed data paket (Starter / Growth / Business)
- Responsive & SSR aktif

---

## 🧱 Tech Stack

| Bagian     | Teknologi                          |
| ---------- | ---------------------------------- |
| Framework  | Nuxt 4 (SSR, `app/` dir)           |
| Bahasa     | TypeScript                         |
| Styling    | Tailwind CSS (`@nuxtjs/tailwindcss`) |
| Database   | SQLite via `better-sqlite3`        |
| ORM        | Drizzle ORM + Drizzle Kit          |
| API        | Nitro server routes (`server/api`) |
| Auth       | JWT (`jsonwebtoken`) + cookie httpOnly |
| Password   | `bcryptjs`                         |

> Catatan: proyek menggunakan `bcryptjs` (implementasi murni JS, drop-in untuk `bcrypt`)
> agar instalasi lintas platform lebih andal tanpa proses kompilasi native tambahan.

---

## 📋 Prasyarat

- Node.js 20 atau lebih baru
- npm 10+

---

## 🚀 Instalasi

```bash
# 1. Install dependencies
npm install

# 2. Salin variabel lingkungan
cp .env.example .env
# lalu ubah JWT_SECRET pada .env untuk produksi

# 3. Buat tabel database (push schema Drizzle ke SQLite)
npm run db:push

# 4. Seed data paket (Starter / Growth / Business)
npm run db:seed

# (opsi) langkah 3 & 4 sekaligus:
npm run db:setup
```

File database akan dibuat di `./ordeo.db` (dapat diubah lewat `DATABASE_URL`).

> Catatan: aplikasi **membuat tabel & mengisi data paket secara otomatis** saat server
> pertama kali dijalankan (lihat `server/db/index.ts`). Jadi langkah 3 & 4 bersifat
> opsional untuk lokal, dan **tidak wajib** di server produksi.

---

## 🧑‍💻 Menjalankan

```bash
# Mode development (http://localhost:3100)
npm run dev

# Build untuk produksi
npm run build

# Menjalankan hasil build (SSR)
npm run preview
```

---

## ☁️ Deploy ke VPS Ubuntu

Penyebab umum "web bisa diakses tapi API 500" adalah **database belum siap** atau
**modul native `better-sqlite3` tidak dikompilasi di server**. Ikuti langkah berikut
langsung **di VPS** (jangan menyalin `node_modules`/`.output` dari macOS/Windows —
binary `better-sqlite3` berbeda antar OS):

```bash
# 1. Clone & masuk folder
git clone <repo-url> ordeo && cd ordeo

# 2. Pastikan build tools tersedia (untuk kompilasi better-sqlite3)
sudo apt-get update && sudo apt-get install -y build-essential python3

# 3. Install dependency (better-sqlite3 akan dikompilasi untuk Linux)
npm install

# 4. Siapkan environment — WAJIB ganti JWT_SECRET & set path DB absolut
cp .env.example .env
# contoh isi .env:
#   JWT_SECRET=ganti-dengan-string-acak-panjang
#   DATABASE_URL=/var/www/ordeo/ordeo.db

# 5. Build untuk produksi
npm run build

# 6. Jalankan (tabel & seed dibuat otomatis saat start)
npm start          # = PORT=3100 node .output/server/index.mjs
```

### Menjalankan sebagai service (systemd)

Buat file `/etc/systemd/system/ordeo.service`:

```ini
[Unit]
Description=Ordeo Web
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/ordeo
Environment=NODE_ENV=production
Environment=PORT=3100
Environment=JWT_SECRET=ganti-dengan-string-acak-panjang
Environment=DATABASE_URL=/var/www/ordeo/ordeo.db
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ordeo
sudo journalctl -u ordeo -f   # cek log bila masih error
```

> Penting:
> - Set `WorkingDirectory` dan `DATABASE_URL` absolut agar file DB dibuat di lokasi
>   yang benar dan dapat ditulis oleh user service (`www-data`).
> - Pastikan folder DB dapat ditulis: `sudo chown -R www-data:www-data /var/www/ordeo`.
> - Jika sebelumnya sudah pernah `npm install` di OS lain, jalankan
>   `npm rebuild better-sqlite3` di VPS.

---

## 🗄️ Skrip Database

| Perintah            | Fungsi                                            |
| ------------------- | ------------------------------------------------- |
| `npm run db:push`   | Sinkronkan schema Drizzle langsung ke SQLite      |
| `npm run db:generate` | Generate file migrasi SQL dari schema           |
| `npm run db:seed`   | Isi data paket langganan                          |
| `npm run db:setup`  | Jalankan `db:push` lalu `db:seed`                 |

> Tabel & data paket juga dibuat otomatis saat aplikasi start, jadi skrip ini hanya
> diperlukan bila Anda ingin mengelola migrasi secara manual.

---

## 🔌 Endpoint API (Nitro)

| Method | Endpoint                          | Deskripsi                        |
| ------ | --------------------------------- | -------------------------------- |
| POST   | `/api/auth/register`              | Registrasi user + set cookie     |
| POST   | `/api/auth/login`                 | Login + set cookie               |
| POST   | `/api/auth/logout`                | Hapus cookie sesi                |
| GET    | `/api/auth/me`                    | Data user saat ini               |
| GET    | `/api/plans`                      | Daftar paket langganan           |
| POST   | `/api/checkout/create-order`      | Buat order (status `pending`)    |
| GET    | `/api/orders/:id`                 | Detail order (by id / invoice)   |
| POST   | `/api/payments/midtrans/webhook`  | Webhook pembayaran (dummy)        |

---

## 🗃️ Struktur Database

- **users** — akun pemilik bisnis
- **businesses** — profil bisnis (diisi saat checkout)
- **plans** — paket langganan (di-seed)
- **orders** — pesanan langganan
- **payment_logs** — jejak audit pembayaran/webhook

Definisi lengkap ada di [`server/db/schema.ts`](server/db/schema.ts).

---

## 💳 Integrasi Midtrans (nanti)

Alur pembayaran dibungkus di [`server/utils/payment.ts`](server/utils/payment.ts) melalui
fungsi tunggal `createTransaction()`. Saat ini menggunakan implementasi **dummy** yang
me-redirect ke `/checkout/success`.

Untuk mengaktifkan Midtrans Snap:

1. Isi `MIDTRANS_SERVER_KEY` & `MIDTRANS_CLIENT_KEY` pada `.env`.
2. Aktifkan fungsi `createMidtransTransaction` (sudah tersedia sebagai kerangka).
3. Endpoint `/api/payments/midtrans/webhook` sudah memetakan `transaction_status`
   Midtrans ke status order (`settlement/capture` → `paid`, dst.). Tambahkan verifikasi
   `signature_key` sebelum produksi.

---

## 📁 Struktur Proyek

```
app/
  assets/css/main.css      # Tailwind + design system
  components/              # Header, Footer, Logo, Icon, LegalPage
  composables/             # useAuth, useFormat
  layouts/default.vue
  middleware/auth.ts       # proteksi haluman /checkout
  pages/                   # landing, features, pricing, auth, checkout, legal
  plugins/auth.ts          # ambil sesi user saat init (SSR)
  utils/content.ts         # konten fitur/testimoni/FAQ
server/
  db/                      # schema.ts, index.ts (koneksi Drizzle)
  utils/                   # auth.ts, payment.ts
  api/                     # endpoint Nitro
scripts/seed.ts            # seed data paket
```

---

## 🔐 Environment Variables

| Variabel                | Default                | Keterangan                        |
| ----------------------- | ---------------------- | --------------------------------- |
| `JWT_SECRET`            | `ordeo-dev-secret-...` | Kunci penandatangan JWT (WAJIB diganti di produksi) |
| `DATABASE_URL`          | `./ordeo.db`           | Path file SQLite                  |
| `MIDTRANS_SERVER_KEY`   | —                      | (opsional) untuk Midtrans         |
| `MIDTRANS_CLIENT_KEY`   | —                      | (opsional) untuk Midtrans         |
| `MIDTRANS_IS_PRODUCTION`| `false`                | Mode Midtrans                     |

---

© PT Ordeo Mitra Digital. Proyek contoh SaaS.
