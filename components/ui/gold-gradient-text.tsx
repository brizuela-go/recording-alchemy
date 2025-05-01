"use client";

import React from "react";

interface GoldGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GoldGradientText({
  children,
  className = "",
}: GoldGradientTextProps) {
  return (
    <div
      className={`font-cinzel font-bold uppercase text-transparent bg-clip-text ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #ECC578 0.1%, #FFE8A0 25.98%, #FDDEA1 71.59%, #E0B35A 95.11%)",
      }}
    >
      {children}
    </div>
  );
}
