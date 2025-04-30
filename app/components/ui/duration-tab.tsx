"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="relative flex-1 py-5 px-4 sm:px-4 md:px-6 lg:px-10 text-lg max-sm:text-sm font-medium transition-all duration-300 cursor-pointer ease-in-out text-center"
    >
      <span
        className={`z-10 relative ${
          isActive ? "text-black" : "text-[#C9C9C9]"
        }`}
      >
        {duration}
      </span>

      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="active-tab"
            className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-[#ECC578] via-[#FFE8A0] to-[#E0B35A]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}
