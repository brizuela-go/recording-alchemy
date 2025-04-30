"use client";

import React from "react";

interface DurationTabProps {
  duration: string;
  isActive: boolean;
  onClick: () => void;
}

export default function DurationTab({
  duration,
  isActive,
  onClick,
}: DurationTabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-5 px-4 sm:px-4 md:px-6 lg:px-10 text-lg font-medium transition-all duration-300 cursor-pointer ease-in-out ${
        isActive
          ? "bg-gradient-to-r from-[#ECC578] via-[#FFE8A0] to-[#E0B35A] text-black "
          : "text-[#C9C9C9] hover:bg-white/5"
      }`}
    >
      {duration}
    </button>
  );
}
