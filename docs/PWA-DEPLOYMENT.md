# Cara Deploy Pomoduo sebagai PWA

Dokumen ini menjelaskan langkah-langkah untuk men-deploy aplikasi Pomoduo sebagai Progressive Web App (PWA) yang dapat digunakan secara offline.

## Persiapan Sebelum Deploy

1. **Pastikan Service Worker Berfungsi**:
   Pastikan file `sw.js` ada di folder `public/` dan berisi kode untuk caching aset statis.

2. **Pastikan Manifest File Tersedia**:
   Pastikan file `manifest.json` ada di folder `public/` dan berisi informasi yang dibutuhkan.

3. **Pastikan Ikon PWA Tersedia**:
   Pastikan semua ukuran ikon tersedia di folder `public/icons/`.

## Build Aplikasi untuk Produksi

### Metode 1: Deploy ke Platform Hosting Statis (Vercel, Netlify, dll)

1. Persiapkan build produksi:
   ```bash
   npm run build
   ```

2. Deploy folder `out/` ke layanan hosting pilihan Anda.

### Metode 2: Deploy untuk Penggunaan Offline Lengkap

1. Build aplikasi dan siapkan untuk PWA:
   ```bash
   npm run deploy-offline
   ```

2. Folder `out/` sekarang berisi aplikasi yang siap digunakan secara offline.

3. Salin seluruh isi folder `out/` ke perangkat target (misalnya, flash drive, SD card, dll).

## Pengujian PWA

Sebelum distribusi, pastikan untuk menguji:

1. **Lighthouse Audit**:
   - Buka Chrome DevTools > Lighthouse
   - Jalankan audit untuk PWA
   - Pastikan skor PWA tinggi dan tidak ada masalah kritis

2. **Pengujian Offline**:
   - Buka aplikasi di browser
   - Putuskan koneksi internet (mode pesawat)
   - Pastikan aplikasi masih berfungsi dengan baik

3. **Pengujian Instalasi**:
   - Kunjungi aplikasi di Chrome/Edge
   - Pastikan opsi "Install" muncul di address bar
   - Uji proses instalasi dan pastikan aplikasi berjalan dengan baik setelah diinstal

## Distribusi Offline

Untuk mendistribusikan aplikasi untuk penggunaan offline:

1. **Metode USB/SD Card**:
   - Salin folder `out/` ke perangkat penyimpanan
   - Buka file `index.html` menggunakan browser

2. **Metode Jaringan Lokal**:
   - Siapkan server HTTP sederhana (misalnya, Python SimpleHTTPServer)
   - Host folder `out/`
   - Pengguna dapat mengakses dan menginstal aplikasi melalui jaringan lokal

## Pembaruan Aplikasi

Untuk memperbarui aplikasi:

1. Ubah nomor versi di `package.json` dan `sw.js`
2. Build ulang aplikasi dengan perintah yang sama
3. Distribusikan file yang diperbarui

## Konfigurasi Tambahan untuk Apache/Nginx

Jika Anda menggunakan server web Apache atau Nginx, tambahkan konfigurasi berikut:

### Apache (.htaccess)

```apache
<IfModule mod_headers.c>
    # Mengizinkan Service Worker
    Header set Service-Worker-Allowed "/"
</IfModule>

# Pengalihan untuk SPA
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /sw.js {
    add_header Service-Worker-Allowed "/";
    add_header Cache-Control "no-cache";
}
```

## Troubleshooting Umum

- **Service Worker Tidak Mendaftar**: Pastikan aplikasi dijalankan melalui HTTPS atau localhost
- **Aset Tidak Ter-cache**: Periksa daftar `urlsToCache` di `sw.js`
- **PWA Tidak Dapat Diinstal**: Pastikan semua kriteria PWA terpenuhi, termasuk ikon dan manifest

## Sumber Daya Tambahan

- [Dokumentasi PWA Google](https://web.dev/progressive-web-apps/)
- [Workbox (Library untuk Service Worker)](https://developers.google.com/web/tools/workbox)
- [Checklist PWA](https://web.dev/pwa-checklist/) 