"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 800;

    // Safety: force complete after 2s no matter what
    const safety = setTimeout(onComplete, 2000);

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
      else {
        clearTimeout(safety);
        setTimeout(onComplete, 200);
      }
    };
    requestAnimationFrame(tick);

    return () => clearTimeout(safety);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-[#F5F0EB] flex items-center justify-center flex-col gap-6"
        exit={{ y: "-100%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
      >
        <motion.span
          className="font-display text-[#1a1a1a]/40 text-sm tracking-[0.5em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          RWBH Architects
        </motion.span>

        <div className="w-[120px] h-px bg-[#D6CFC7] relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#A16207]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
