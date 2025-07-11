// components/ui/CompletionAnimation.tsx - Animated completion feedback
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface CompletionAnimationProps {
  show: boolean;
  onComplete?: () => void;
  chapterTitle?: string;
}

export function CompletionAnimation({
  show,
  onComplete,
  chapterTitle,
}: CompletionAnimationProps) {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShowSparkles(true);
      }, 500);

      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-[#ECC578]/20 text-center max-w-md w-full"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative mx-auto w-16 h-16 mb-6"
            >
              <div className="absolute inset-0 bg-[#ECC578]/20 rounded-full"></div>
              <CheckCircle2 className="w-16 h-16 text-[#ECC578] relative z-10" />

              {/* Sparkles */}
              <AnimatePresence>
                {showSparkles && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          x: [0, (i % 2 ? 1 : -1) * 30],
                          y: [0, (i % 3 ? 1 : -1) * 30],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <Sparkles className="w-4 h-4 text-[#FBDDA3]" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                Chapter Complete!
              </h3>
              {chapterTitle && (
                <p className="text-[#FBDDA3] font-medium mb-4">
                  {chapterTitle}
                </p>
              )}
              <p className="text-neutral-400 text-sm">
                Great job! You&apos;re one step closer to mastering your craft.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
