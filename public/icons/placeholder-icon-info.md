# Informasi Placeholder Ikon

Dalam produksi, Anda perlu mengganti ikon placeholder dengan ikon asli. Anda bisa menggunakan salah satu metode berikut:

## Metode 1: Buat Ikon Manual dengan Designer Grafis

1. Buat ikon dengan ukuran yang diperlukan (72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, dan 512x512)
2. Simpan ikon dalam format PNG di folder `/public/icons/`
3. Pastikan nama file sesuai dengan format yang digunakan di `manifest.json`

## Metode 2: Menggunakan Favicon Generator

1. Kunjungi [Favicon Generator](https://realfavicongenerator.net/) atau layanan serupa
2. Upload logo yang ingin digunakan sebagai ikon
3. Download hasil generate dan salin file ke direktori `/public/icons/`

## Metode 3: Menggunakan Generator Sederhana (Node.js + Canvas)

Jika anda memiliki Node.js dan modul canvas terinstal, Anda bisa menggunakan script berikut:

1. Instal dependency yang diperlukan:
   ```bash
   npm install canvas
   ```

2. Jalankan script generator ikon sederhana (`icon-generator.js`):
   ```bash
   node icon-generator.js
   ```

Script ini akan menghasilkan ikon placeholder sederhana untuk semua ukuran yang diperlukan. 