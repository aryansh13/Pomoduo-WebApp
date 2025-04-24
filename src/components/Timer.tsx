'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

// Create utility functions since we can't directly import from public
const createNotificationSound = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      // Create oscillator for first tone
      const osc1 = audioContext.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 800;
      
      // Create oscillator for second tone
      const osc2 = audioContext.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = 1000;
      
      // Create gain node
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.3;
      
      // Connect nodes
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set envelope
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
      
      // Start and stop oscillators
      osc1.start(now);
      osc2.start(now + 0.1);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
      
      // Add a slight delay for the third tone
      setTimeout(() => {
        // Create oscillator for third tone
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

const vibrate = () => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
    try {
      // Vibration pattern: 100ms active, 50ms inactive, 100ms active
      window.navigator.vibrate([100, 50, 100]);
      return true;
    } catch (error) {
      console.error('Failed to vibrate:', error);
      return false;
    }
  }
  return false;
};

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  pomodorosUntilLongBreak: number;
}

interface TimerProps {
  settings?: Partial<TimerSettings>;
}

const defaultSettings: TimerSettings = {
  pomodoro: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
  autoStartBreaks: true,
  autoStartPomodoros: true,
  pomodorosUntilLongBreak: 4,
};

export const Timer: React.FC<TimerProps> = ({ settings: userSettings }) => {
  const settings = { ...defaultSettings, ...userSettings };
  
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro);
  const [isPaused, setIsPaused] = useState(true);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const notificationSoundRef = useRef<(() => void) | null>(null);
  
  // Initialize notification sound
  useEffect(() => {
    notificationSoundRef.current = createNotificationSound();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Determine current session duration based on mode
  const getCurrentModeDuration = () => {
    switch (mode) {
      case 'pomodoro': return settings.pomodoro;
      case 'shortBreak': return settings.shortBreak;
      case 'longBreak': return settings.longBreak;
    }
  };
  
  // Reset timer based on current mode
  const resetTimer = (newMode?: TimerMode) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const currentMode = newMode || mode;
    setMode(currentMode);
    
    let duration;
    switch (currentMode) {
      case 'pomodoro':
        duration = settings.pomodoro;
        break;
      case 'shortBreak':
        duration = settings.shortBreak;
        break;
      case 'longBreak':
        duration = settings.longBreak;
        break;
    }
    
    setTimeLeft(duration);
    setIsPaused(true);
    setProgress(0);
  };
  
  // Handle timer completion
  const handleTimerComplete = () => {
    // Play notification sound and vibrate
    if (notificationSoundRef.current) {
      notificationSoundRef.current();
    }
    vibrate();
    
    // Show browser notification if permission granted
    if (Notification && Notification.permission === 'granted') {
      new Notification(
        `${mode === 'pomodoro' ? 'Pomodoro completed!' : 'Break time is over!'}`, 
        {
          body: mode === 'pomodoro' 
            ? 'Take a break!' 
            : 'Time to focus!',
          icon: '/icons/icon-192x192.png'
        }
      );
    }
    
    // Handle different mode completions
    if (mode === 'pomodoro') {
      const newCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(newCompletedPomodoros);
      
      // Determine if we should take a long break or short break
      const shouldTakeLongBreak = newCompletedPomodoros % settings.pomodorosUntilLongBreak === 0;
      const nextMode = shouldTakeLongBreak ? 'longBreak' : 'shortBreak';
      
      resetTimer(nextMode);
      if (settings.autoStartBreaks) {
        startTimer();
      }
    } else {
      // Break is over, start a new pomodoro
      resetTimer('pomodoro');
      if (settings.autoStartPomodoros) {
        startTimer();
      }
    }
  };
  
  // Start the timer
  const startTimer = () => {
    setIsPaused(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          handleTimerComplete();
          return 0;
        }
        
        // Update progress bar
        const totalDuration = getCurrentModeDuration();
        const newProgress = ((totalDuration - (prevTime - 1)) / totalDuration) * 100;
        setProgress(newProgress);
        
        return prevTime - 1;
      });
    }, 1000);
  };
  
  // Pause the timer
  const pauseTimer = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  // Toggle play/pause
  const toggleTimer = () => {
    if (isPaused) {
      startTimer();
    } else {
      pauseTimer();
    }
  };
  
  // Skip to next timer session
  const skipToNext = () => {
    let nextMode: TimerMode;
    
    if (mode === 'pomodoro') {
      const newCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(newCompletedPomodoros);
      
      nextMode = (newCompletedPomodoros % settings.pomodorosUntilLongBreak === 0) 
        ? 'longBreak' 
        : 'shortBreak';
    } else {
      nextMode = 'pomodoro';
    }
    
    resetTimer(nextMode);
  };
  
  // Request notification permission
  const requestNotificationPermission = () => {
    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };
  
  // Format time left as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Request notification permission on component mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Update document title with timer
  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - Pomoduo`;
    
    return () => {
      document.title = 'Pomoduo';
    };
  }, [timeLeft]);
  
  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-4">
      <div className="flex justify-center space-x-2 mb-6">
        <Button 
          variant={mode === 'pomodoro' ? 'default' : 'outline'} 
          onClick={() => resetTimer('pomodoro')}
          className="w-28"
        >
          Pomodoro
        </Button>
        <Button 
          variant={mode === 'shortBreak' ? 'default' : 'outline'} 
          onClick={() => resetTimer('shortBreak')}
          className="w-28"
        >
          Short Break
        </Button>
        <Button 
          variant={mode === 'longBreak' ? 'default' : 'outline'} 
          onClick={() => resetTimer('longBreak')}
          className="w-28"
        >
          Long Break
        </Button>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="text-7xl font-bold mb-8">
            {formatTime(timeLeft)}
          </div>
          
          <Progress value={progress} className="w-full h-3 mb-6" />
          
          <div className="flex space-x-4">
            <Button 
              size="lg" 
              onClick={toggleTimer}
              className="w-32 text-lg"
            >
              {isPaused ? 'Start' : 'Pause'}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => resetTimer()}
              className="w-32 text-lg"
            >
              Reset
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={skipToNext}
            className="mt-4"
          >
            Skip to {mode === 'pomodoro' ? 'Break' : 'Pomodoro'}
          </Button>
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Completed Pomodoros: {completedPomodoros}
      </div>
    </div>
  );
}; 