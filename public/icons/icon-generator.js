// Script sederhana untuk membuat placeholder ikon
// Dalam project nyata, Anda sebaiknya gunakan desain ikon asli

const fs = require('fs');
const { createCanvas } = require('canvas');

// Ukuran ikon yang diperlukan
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Buat folder icons jika belum ada
try {
  if (!fs.existsSync('./icons')) {
    fs.mkdirSync('./icons');
  }
} catch (err) {
  console.error('Error creating icons directory:', err);
}

// Fungsi untuk membuat ikon
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Latar belakang
  ctx.fillStyle = '#F9F5F1';
  ctx.fillRect(0, 0, size, size);
  
  // Lingkaran
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#FF6347';
  ctx.fill();
  
  // Teks
  const fontSize = Math.floor(size * 0.2);
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText('PD', size / 2, size / 2);
  
  // Simpan sebagai PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`./icons/icon-${size}x${size}.png`, buffer);
  console.log(`Created icon-${size}x${size}.png`);
}

// Buat ikon untuk semua ukuran
sizes.forEach(createIcon);

console.log('All icons generated!'); 