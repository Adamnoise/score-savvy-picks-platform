
import { cn } from "@/lib/utils";
import React from "react";

interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: "left" | "right" | "top" | "bottom";
  blurIntensity?: number;
}

export function ProgressiveBlur({
  className,
  direction,
  blurIntensity = 1,
  ...props
}: ProgressiveBlurProps) {
  return (
    <div
      className={cn(className)}
      style={{
        background:
          direction === "left"
            ? `linear-gradient(to right, rgba(var(--background-rgb), 1) 0%, rgba(var(--background-rgb), 0) 100%)`
            : direction === "right"
            ? `linear-gradient(to left, rgba(var(--background-rgb), 1) 0%, rgba(var(--background-rgb), 0) 100%)`
            : direction === "top"
            ? `linear-gradient(to bottom, rgba(var(--background-rgb), 1) 0%, rgba(var(--background-rgb), 0) 100%)`
            : `linear-gradient(to top, rgba(var(--background-rgb), 1) 0%, rgba(var(--background-rgb), 0) 100%)`,
        backdropFilter: `blur(${blurIntensity * 5}px)`,
      }}
      {...props}
    />
  );
}
