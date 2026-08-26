"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ScrollUnveil({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(60);
  const [scale, setScale] = useState(0.97);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mediaQuery.matches);
    
    if (mediaQuery.matches) {
      setOpacity(1);
      setTranslateY(0);
      setScale(1);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start revealing when the top of the container enters the bottom of the viewport
      // Fully revealed when the top of the container is 30% from the bottom of the viewport (or 70% from the top)
      const start = viewportHeight;
      const end = viewportHeight * 0.5;

      const current = rect.top;

      if (current >= start) {
        setOpacity(0);
        setTranslateY(60);
        setScale(0.97);
      } else if (current <= end) {
        setOpacity(1);
        setTranslateY(0);
        setScale(1);
      } else {
        const total = start - end;
        const progress = (start - current) / total;
        
        setOpacity(progress);
        setTranslateY(Math.round(60 * (1 - progress)));
        setScale(Number((0.97 + 0.03 * progress).toFixed(3)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={
        isReduced
          ? {}
          : {
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              willChange: "opacity, transform",
            }
      }
      className="w-full"
    >
      {children}
    </div>
  );
}
