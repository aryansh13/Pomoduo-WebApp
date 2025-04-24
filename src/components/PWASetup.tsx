'use client';

import { useEffect } from 'react';

// Komponen untuk mendaftarkan service worker
export default function PWASetup() {
  useEffect(() => {
    // Register service worker hanya di browser dan lingkungan produksi
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered: ', registration);
          })
          .catch(error => {
            console.error('Service Worker registration failed: ', error);
          });
      });
    }
  }, []);

  // Komponen ini tidak merender apapun
  return null;
} 