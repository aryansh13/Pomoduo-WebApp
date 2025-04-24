// Lofi music player utility

// List of Creative Commons lo-fi tracks (simulated URLs)
const LOFI_TRACKS = [
  'https://example.com/lofi1.mp3', // Placeholder URL
  'https://example.com/lofi2.mp3', // Placeholder URL
  'https://example.com/lofi3.mp3', // Placeholder URL
];

// Since we don't have actual mp3 files, we'll create ambient sounds using Web Audio API
// This approach is better than including heavy mp3 files in the repository

let audioContext = null;
let musicSource = null;
let gainNode = null;

export const initLofiPlayer = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.3; // Lower volume for background music
    
    return true;
  } catch (error) {
    console.error('Failed to initialize audio context:', error);
    return false;
  }
};

// Create a lofi-like sound using oscillators and effects
export const createLofiSound = () => {
  if (!audioContext) return;
  
  try {
    // Clean up previous playing music
    stopLofiMusic();
    
    // Create main melody oscillator
    const melodyOsc = audioContext.createOscillator();
    melodyOsc.type = 'sine';
    melodyOsc.frequency.value = 440; // A4 note
    
    // Create the chord oscillator
    const chordOsc = audioContext.createOscillator();
    chordOsc.type = 'triangle';
    chordOsc.frequency.value = 261.63; // C4 note
    
    // Create filter for warm sound
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    filter.Q.value = 1;
    
    // Create a bit of reverb simulation
    const convolver = audioContext.createConvolver();
    
    // Create a gain node for melody (lower volume)
    const melodyGain = audioContext.createGain();
    melodyGain.gain.value = 0.15;
    
    // Create a gain node for chord (lower volume)
    const chordGain = audioContext.createGain();
    chordGain.gain.value = 0.1;
    
    // Connect the nodes
    melodyOsc.connect(melodyGain);
    chordOsc.connect(chordGain);
    melodyGain.connect(filter);
    chordGain.connect(filter);
    filter.connect(gainNode);
    
    // Random melody generator
    setInterval(() => {
      if (melodyOsc.frequency) {
        const notes = [392, 440, 494, 523]; // G4, A4, B4, C5
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        melodyOsc.frequency.setValueAtTime(randomNote, audioContext.currentTime);
        melodyOsc.frequency.setValueAtTime(
          randomNote * 0.99, 
          audioContext.currentTime + 0.5
        );
      }
    }, 2000);
    
    // Random chord progression
    setInterval(() => {
      if (chordOsc.frequency) {
        const chords = [261.63, 293.66, 329.63]; // C4, D4, E4
        const randomChord = chords[Math.floor(Math.random() * chords.length)];
        chordOsc.frequency.setValueAtTime(randomChord, audioContext.currentTime);
      }
    }, 4000);
    
    // Start oscillators
    melodyOsc.start();
    chordOsc.start();
    
    // Keep reference for stopping later
    musicSource = { melodyOsc, chordOsc, melodyGain, chordGain };
    
    return true;
  } catch (error) {
    console.error('Failed to create lofi music:', error);
    return false;
  }
};

export const playLofiMusic = () => {
  if (!audioContext) {
    const initialized = initLofiPlayer();
    if (!initialized) return false;
  }
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  return createLofiSound();
};

export const stopLofiMusic = () => {
  if (!audioContext || !musicSource) return false;
  
  try {
    if (musicSource.melodyOsc) {
      musicSource.melodyOsc.stop();
      musicSource.melodyOsc.disconnect();
    }
    
    if (musicSource.chordOsc) {
      musicSource.chordOsc.stop();
      musicSource.chordOsc.disconnect();
    }
    
    // Fade out
    if (gainNode) {
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      
      // Reset gain after fade out
      setTimeout(() => {
        if (gainNode) gainNode.gain.value = 0.3;
      }, 1500);
    }
    
    musicSource = null;
    return true;
  } catch (error) {
    console.error('Failed to stop lofi music:', error);
    return false;
  }
};

export const setMusicVolume = (volume) => {
  if (!gainNode) return false;
  
  try {
    // Volume should be between 0 and 1
    const normalizedVolume = Math.max(0, Math.min(1, volume));
    gainNode.gain.value = normalizedVolume;
    return true;
  } catch (error) {
    console.error('Failed to set music volume:', error);
    return false;
  }
}; 