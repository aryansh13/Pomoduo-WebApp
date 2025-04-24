'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { motion } from 'framer-motion';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Periksa koneksi internet saat komponen dimuat
    setIsOnline(navigator.onLine);
    
    // Dengarkan perubahan status online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Mencoba merefresh halaman saat kembali online
  const tryReconnect = () => {
    if (isOnline) {
      window.location.href = '/';
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background-light dark:bg-background-dark">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <BackgroundGradient containerClassName="max-w-md mx-auto">
          <div className="p-8">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-fun font-bold">PD</span>
            </div>
            
            <h1 className="text-2xl font-fun font-bold text-primary mb-2">Pomoduo</h1>
            <p className="text-sm font-fun mb-4">Study With Me</p>
            
            <div className="mt-6">
              {isOnline ? (
                <>
                  <p className="text-sm mb-4 font-fun">Terdeteksi koneksi internet. Anda bisa kembali ke aplikasi.</p>
                  <Button className="font-fun" onClick={tryReconnect}>
                    Kembali ke Aplikasi
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm mb-4 font-fun">
                    Anda sedang offline. Tidak perlu khawatir, aplikasi Pomoduo masih bisa digunakan
                    tanpa koneksi internet.
                  </p>
                  <Button className="font-fun" onClick={tryReconnect}>
                    Coba Lagi
                  </Button>
                </>
              )}
            </div>
          </div>
        </BackgroundGradient>
      </motion.div>
    </div>
  );
} 