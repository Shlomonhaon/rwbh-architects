"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-[2] bg-[#EDE8E2] py-10 px-6 md:px-14 border-t border-[#D6CFC7]">
      <motion.div
        className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4 max-sm:flex-col max-sm:text-center max-sm:gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-display text-sm tracking-[0.5em] text-[#1a1a1a]/30">
          RWBH
        </span>
        <span className="text-[10px] tracking-[0.15em] text-[#1a1a1a]/25 font-light">
          &copy; 2026 Rahel Wahnon Ben Haim Architects
        </span>
        <span className="text-[10px] tracking-[0.15em] text-[#1a1a1a]/25 font-light">
          Site by Shlomo Nahon
        </span>
      </motion.div>
    </footer>
  );
}
