
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";

interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  speedOnHover?: number;
  direction?: "left" | "right";
  gap?: number;
}

export function InfiniteSlider({
  children,
  speed = 30,
  speedOnHover = 0,
  direction = "left",
  gap = 16,
  className,
  ...props
}: InfiniteSliderProps) {
  const [hovering, setHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [loopInstances, setLoopInstances] = useState(1);

  useEffect(() => {
    const calculateWidth = () => {
      if (contentRef.current && trackRef.current) {
        const containerWidth = trackRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const instances = Math.max(2, Math.ceil((containerWidth * 2) / contentWidth));
        setLoopInstances(instances);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [children]);

  return (
    <div
      ref={trackRef}
      className={cn("flex overflow-hidden", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        ref={contentRef}
        style={{
          gap: `${gap}px`,
          animationDuration: `${
            hovering ? speedOnHover * 1000 : speed * 1000
          }ms`,
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationPlayState: speedOnHover === 0 && hovering ? "paused" : "running",
        }}
        className="flex animate-slide items-center"
      >
        {Array(loopInstances)
          .fill(0)
          .map((_, i) => (
            <React.Fragment key={i}>{children}</React.Fragment>
          ))}
      </div>
    </div>
  );
}
