// components/ui/ProgressIndicator.tsx - Modern progress icons
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PlayCircle, Eye } from "lucide-react";

interface ProgressIndicatorProps {
  status: "not-started" | "viewed" | "completed";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function ProgressIndicator({
  status,
  size = "md",
  animated = true,
}: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconProps = {
    className: sizeClasses[size],
  };

  const variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  const getIcon = () => {
    switch (status) {
      case "completed":
        return (
          <motion.div
            variants={animated ? variants : undefined}
            initial={animated ? "initial" : undefined}
            animate={animated ? "animate" : undefined}
            className="text-[#ECC578]"
          >
            <CheckCircle2
              {...iconProps}
              className={`${iconProps.className} fill-current`}
            />
          </motion.div>
        );
      case "viewed":
        return (
          <motion.div
            variants={animated ? variants : undefined}
            initial={animated ? "initial" : undefined}
            animate={animated ? "animate" : undefined}
            className="text-[#FBDDA3]"
          >
            <Eye {...iconProps} />
          </motion.div>
        );
      default:
        return (
          <motion.div
            variants={animated ? variants : undefined}
            initial={animated ? "initial" : undefined}
            animate={animated ? "animate" : undefined}
            className="text-neutral-500"
          >
            <PlayCircle {...iconProps} />
          </motion.div>
        );
    }
  };

  return <div className="flex items-center justify-center">{getIcon()}</div>;
}
