"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import React, { ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary-dark/90",
        secondary: "bg-accent-light dark:bg-accent-dark text-background-dark dark:text-background-light hover:opacity-90",
        outline: "border border-accent-light dark:border-accent-dark bg-transparent text-foreground shadow-sm hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "size" | "variant" | "children">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animate?: boolean;
  children?: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animate = true, whileTap, whileHover, children, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileTap={animate ? whileTap || { scale: 0.97 } : undefined}
        whileHover={animate ? whileHover || { scale: 1.03 } : undefined}
        {...props}
      >
        {children}
        <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent group-hover:w-full opacity-0 group-hover:opacity-20 transition-all duration-500" />
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 