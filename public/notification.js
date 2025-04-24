// This file creates a notification sound using the Web Audio API
// It allows us to have a notification sound without requiring an external file

export const createNotificationSound = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      // Buat oscillator untuk nada pertama
      const osc1 = audioContext.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 800;
      
      // Buat oscillator untuk nada kedua
      const osc2 = audioContext.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = 1000;
      
      // Buat gain node
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.3;
      
      // Koneksikan nodes
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Pengaturan envelope
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
      
      // Mulai dan hentikan oscillators
      osc1.start(now);
      osc2.start(now + 0.1);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
      
      // Tambahkan sedikit delay pada nada kedua
      setTimeout(() => {
        // Buat oscillator untuk nada ketiga
        const osc3 = audioContext.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.value = 1200;
        
        const gainNode2 = audioContext.createGain();
        gainNode2.gain.value = 0.3;
        
        osc3.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        const now = audioContext.currentTime;
        gainNode2.gain.setValueAtTime(0, now);
        gainNode2.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gainNode2.gain.linearRampToValueAtTime(0, now + 0.8);
        
        osc3.start(now);
        osc3.stop(now + 0.8);
      }, 300);
    };
  } catch (error) {
    console.error('Failed to create notification sound:', error);
    return null;
  }
};

export const vibrate = () => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
    try {
      // Pola vibrasi: 100ms aktif, 50ms tidak aktif, 100ms aktif
      window.navigator.vibrate([100, 50, 100]);
      return true;
    } catch (error) {
      console.error('Failed to vibrate:', error);
      return false;
    }
  }
  return false;
}; 