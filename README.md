# Pomoduo - Study With Me

Pomoduo adalah aplikasi timer pomodoro cozy yang dibuat menggunakan Next.js dan dilengkapi dengan todo list dan latar belakang musik yang nyaman untuk belajar. Aplikasi ini didesain untuk bisa digunakan secara offline sebagai Progressive Web App (PWA).

## Fitur

- 🕒 **Timer Pomodoro** - 25 menit fokus kerja diikuti dengan 5 menit istirahat
- ✓ **Todo List** - Manajemen tugas sederhana dengan simpan otomatis
- 🎵 **Lo-fi Music** - Latar belakang musik yang nyaman saat belajar/bekerja
- 🌓 **Dark Mode** - Dukungan tema terang dan gelap
- 📱 **Progressive Web App** - Bisa digunakan secara offline dan diinstal di desktop/mobile
- 🎨 **UI yang Cozy** - Desain antarmuka yang nyaman dengan animasi yang smooth

## Cara Penggunaan

### Online

1. Kunjungi situs web aplikasi
2. Gunakan timer untuk fokus belajar/bekerja
3. Kelola tugas-tugas Anda dengan todo list
4. Nikmati latar belakang musik lo-fi

### Offline (Penginstalan PWA)

1. Kunjungi situs web aplikasi
2. Pada peramban Chrome/Edge, klik ikon "Install App" di address bar
3. Atau pada perangkat iOS, klik "Share" dan pilih "Add to Home Screen"
4. Setelah diinstal, aplikasi dapat digunakan tanpa koneksi internet

## Menjalankan Proyek Secara Lokal

### Prasyarat

- Node.js 14.0.0 atau yang lebih baru
- npm atau yarn

### Penginstalan

```bash
# Clone repositori
git clone https://github.com/yourusername/pomoduo.git

# Masuk ke direktori proyek
cd pomoduo

# Instal dependensi
npm install
# atau
yarn install

# Jalankan server pengembangan
npm run dev
# atau
yarn dev
```

### Build untuk Produksi (Web Statis)

```bash
# Build aplikasi
npm run build

# Jalankan build lokal
npm start
```

### Build untuk PWA (Penggunaan Offline)

```bash
# Build aplikasi untuk PWA
npm run deploy-offline
```

## Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Library animasi
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Untuk generasi musik
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Penyimpanan data lokal
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - Untuk fitur offline

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT - lihat file LICENSE untuk detail lebih lanjut.

## Dukungan

Jika Anda memiliki pertanyaan atau saran, silakan buka issue di repositori GitHub.
