"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "16",
  ry = "16",
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: any;
  [key: string]: any;
}) => {
  return (
    <Component
      className={cn("relative p-[1px] overflow-hidden", containerClassName)}
      {...otherProps}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          borderClassName
        )}
      >
        <svg
          width="100%"
          height="100%"
        >
          <rect
            pathLength="100"
            stroke="url(#gradient)"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
            className="origin-center transition-transform animate-spin"
            style={{
              rotate: "0deg",
              animation: `spin ${duration}ms linear infinite`,
            }}
          />
          <defs>
            <linearGradient id="gradient">
              <stop stopColor="#FF6347" />
              <stop offset="0.5" stopColor="#DDBEA9" />
              <stop offset="1" stopColor="#D1483B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.div
        className={cn("relative", className)}
        style={{
          borderRadius: "inherit",
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
}; 