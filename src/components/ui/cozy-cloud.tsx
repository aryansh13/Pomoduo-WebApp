"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CloudProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  delay?: number;
  duration?: number;
}

export const CozyCloud = ({
  className,
  size = "md",
  color = "#DDBEA9",
  delay = 0,
  duration = 20,
}: CloudProps) => {
  const sizeMap = {
    sm: "w-16 h-6",
    md: "w-24 h-8",
    lg: "w-32 h-10",
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-full opacity-20 z-0",
        sizeMap[size],
        className
      )}
      style={{
        backgroundColor: color,
        filter: "blur(8px)",
      }}
      initial={{ x: "-100%", opacity: 0.1 }}
      animate={{ x: "200%", opacity: 0.2 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}; 