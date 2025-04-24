'use client';

import { Timer } from "../components/Timer";
import Todo from "../components/Todo";
import ThemeToggle from "../components/ThemeToggle";
import { Spotlight } from "../components/ui/spotlight";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { CozyCloud } from "../components/ui/cozy-cloud";
import { useState, useEffect } from "react";
import { Book, Coffee, Music, Lamp } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // This ensures hydration mismatch is avoided
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      <Spotlight
        className="hidden lg:block -top-40 left-0 right-0 h-[200%] pointer-events-none z-0"
        fill="white"
      />
      
      {/* Decorative clouds - only show on larger devices */}
      <div className="hidden sm:block">
        <CozyCloud className="top-20 left-0" size="lg" delay={2} />
        <CozyCloud className="top-40 left-1/4" size="md" delay={5} />
        <CozyCloud className="top-60 right-10" size="sm" delay={8} />
        <CozyCloud className="bottom-20 right-1/3" size="lg" delay={12} />
      </div>
      
      <header className="w-full py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center border-b border-accent-light/20 dark:border-accent-dark/20 z-10 relative">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-primary dark:text-primary-dark font-fun">
            Pomoduo
          </h1>
          <div className="ml-2 sm:ml-4 hidden xs:block">
            <TypewriterEffect
              words={[{ text: "Study With Me", className: "font-fun" }]}
              className="text-xs sm:text-sm font-light"
            />
          </div>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        {/* Left side - Study Room Visual */}
        <div className="flex-1 py-6 px-4 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-accent-light/20 dark:border-accent-dark/20 relative">
          {/* Decorative elements - hide on small mobile */}
          <div className="hidden sm:block">
            <Coffee className="absolute top-12 left-12 text-accent-light/40 animate-float" size={24} />
            <Book className="absolute bottom-12 left-24 text-accent-light/40 animate-pulse-slow" size={24} />
            <Music className="absolute top-24 right-12 text-accent-light/40 animate-wiggle" size={24} />
            <Lamp className="absolute bottom-24 right-24 text-primary/30 animate-pulse-slow" size={24} />
          </div>
          
          <Timer />
          
          <div className="text-center w-full max-w-md mt-6 sm:mt-8 px-2">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-fun">
              Focus for 25 minutes, then take a 5-minute break. Stay cozy and productive! ☕
            </p>
          </div>
        </div>

        {/* Right side - Todo List */}
        <div className="flex-1 py-6 px-4 sm:p-8 flex flex-col items-center">
          <Todo />
        </div>
      </div>

      <footer className="w-full py-2 sm:py-3 px-4 sm:px-6 border-t border-accent-light/20 dark:border-accent-dark/20 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 relative z-10 font-fun">
        Pomoduo v1.0.0 - Study With Me
      </footer>
    </main>
  );
}
