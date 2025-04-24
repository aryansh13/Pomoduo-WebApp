"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export interface BackgroundGradientProps {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  animate?: boolean;
  size?: "small" | "medium" | "large";
}

export const BackgroundGradient = ({
  className,
  containerClassName,
  children,
  animate = true,
  size = "medium",
}: BackgroundGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [borderRadius, setBorderRadius] = useState("1rem");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      setVisible(true);
      setTimeout(() => {
        setOpacity(1);
      }, 100);
    }
  }, [animate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const handleMouseEnter = () => {
      setOpacity(1);
    };

    const el = containerRef.current;
    if (el && animate) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      el.addEventListener("mouseenter", handleMouseEnter);
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [animate]);

  useEffect(() => {
    if (size === "small") {
      setBorderRadius("0.5rem");
    } else if (size === "medium") {
      setBorderRadius("1rem");
    } else if (size === "large") {
      setBorderRadius("1.5rem");
    }
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-background-light dark:bg-background-dark max-w-xs group isolate overflow-hidden",
        containerClassName
      )}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease-in-out",
        borderRadius: borderRadius,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 z-[-1] transition-all duration-300 opacity-0 group-hover:opacity-100",
          animate ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
        style={{
          backgroundImage: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(221, 190, 169, 0.15) 0%, transparent 50%)`,
          opacity: opacity,
          borderRadius: borderRadius,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "none",
        }}
      />
      <div
        className={cn(
          "relative z-10 bg-background-light dark:bg-background-dark group-hover:bg-opacity-90 dark:group-hover:bg-opacity-90 transition-all duration-300",
          className
        )}
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
}; 