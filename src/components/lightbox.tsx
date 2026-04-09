"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

interface LightboxProps {
  projectKey: string;
  onClose: () => void;
}

export function Lightbox({ projectKey, onClose }: LightboxProps) {
  const project = projects.find((p) => p.key === projectKey);
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Touch swipe support
  const touchStart = useRef(0);

  const goTo = useCallback((i: number) => {
    setDirection(i > idx ? 1 : -1);
    setIdx(i);
  }, [idx]);

  const next = useCallback(() => {
    if (!project) return;
    setDirection(1);
    setIdx((prev) => (prev + 1) % project.images.length);
  }, [project]);

  const prev = useCallback(() => {
    if (!project) return;
    setDirection(-1);
    setIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, next, prev]);

  useEffect(() => {
    const active = thumbsRef.current?.querySelector("[data-active]");
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [idx]);

  if (!project) return null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] bg-[#F5F0EB] flex flex-col overflow-hidden"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 md:py-5 shrink-0 border-b border-[#E0D9D0] bg-[#F5F0EB] z-10">
        <div className="min-w-0 flex-1 mr-3">
          <h3 className="font-display text-lg md:text-xl text-[#1a1a1a] truncate">
            {project.title}
          </h3>
          <p className="text-[11px] md:text-[12px] font-light text-[#888] leading-relaxed mt-0.5 truncate hidden sm:block">
            {project.desc}
          </p>
        </div>
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <span className="text-[11px] md:text-[12px] tracking-[0.2em] text-[#A16207] tabular-nums font-light">
            {idx + 1}/{project.images.length}
          </span>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-[#999] hover:text-[#1a1a1a] transition-colors duration-200 rounded-full hover:bg-[#E8E2DB]"
            aria-label="Close"
            data-hover
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Image — swipe on mobile */}
      <div
        className="flex-1 flex items-center justify-center px-2 md:px-24 py-3 md:py-6 min-h-0 relative bg-[#EDE8E2] overflow-hidden"
        onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = touchStart.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 60) {
            if (diff > 0) next();
            else prev();
          }
        }}
      >
        {/* Nav — hidden on mobile, use swipe instead */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-8 z-10 w-11 h-11 hidden md:flex items-center justify-center text-[#999] hover:text-[#1a1a1a] transition-colors duration-200 bg-white/60 hover:bg-white rounded-full shadow-sm"
          aria-label="Previous"
          data-hover
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>

        <div className="relative w-full h-full flex items-center justify-center mx-0 md:mx-16">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.img
              key={project.images[idx]}
              src={project.images[idx]}
              alt={`${project.title} ${idx + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-sm shadow-lg absolute"
              style={{ maxHeight: "calc(100dvh - 200px)" }}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="absolute right-2 md:right-8 z-10 w-11 h-11 hidden md:flex items-center justify-center text-[#999] hover:text-[#1a1a1a] transition-colors duration-200 bg-white/60 hover:bg-white rounded-full shadow-sm"
          aria-label="Next"
          data-hover
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Thumbnails */}
      <div ref={thumbsRef} className="flex justify-start gap-1.5 md:gap-2 px-3 md:px-10 py-3 md:py-4 overflow-x-auto shrink-0 bg-[#F5F0EB] border-t border-[#E0D9D0] z-10" style={{ minHeight: 72 }}>
        {project.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Thumbnail ${i + 1}`}
            loading="lazy"
            data-active={i === idx ? "" : undefined}
            onClick={() => goTo(i)}
            className={`h-12 w-16 md:h-16 md:w-24 object-cover cursor-pointer transition-all duration-200 shrink-0 rounded-sm ${
              i === idx
                ? "opacity-100 ring-2 ring-[#A16207] shadow-md"
                : "opacity-40 hover:opacity-70"
            }`}
            data-hover
          />
        ))}
      </div>
    </motion.div>
  );
}
