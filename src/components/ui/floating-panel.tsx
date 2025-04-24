"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BackgroundGradient } from "./background-gradient";

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  delay?: number;
}

export const FloatingPanel = ({
  children,
  className,
  containerClassName,
  delay = 0
}: FloatingPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={cn("animate-float", containerClassName)}
    >
      <BackgroundGradient className={className}>
        {children}
      </BackgroundGradient>
    </motion.div>
  );
}; 