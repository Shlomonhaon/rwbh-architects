"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { TextReveal, LineReveal } from "./text-reveal";
import { Lightbox } from "./lightbox";

export function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
  const [lightboxProject, setLightboxProject] = useState<string | null>(null);
  const [items, setItems] = useState<Project[]>(projects);

  // Virtual Loop: move items that scroll off-screen to the other end
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { draggingRef.current = isDragging; }, [isDragging]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId: number;

    const scroll = () => {
      if (!pausedRef.current && !draggingRef.current && track) {
        track.scrollLeft += 0.5;
      }

      // Virtual loop: when first child scrolls out of view, move it to end
      if (track && track.children.length > 0) {
        const firstChild = track.children[0] as HTMLElement;
        const gap = 40; // gap between items (gap-10 = 2.5rem ≈ 40px)
        if (firstChild && track.scrollLeft > firstChild.offsetWidth + gap) {
          track.scrollLeft -= firstChild.offsetWidth + gap;
          // Move first item to end in DOM
          track.appendChild(firstChild);
          // Sync React state
          setItems((prev) => {
            const next = [...prev];
            const first = next.shift()!;
            next.push(first);
            return next;
          });
        }
      }

      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { isDown: true, startX: e.pageX - track.offsetLeft, scrollLeft: track.scrollLeft, moved: false };
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    dragState.current.isDown = false;
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.current.isDown) return;
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const d = x - dragState.current.startX;
    if (Math.abs(d) > 5) dragState.current.moved = true;
    track.scrollLeft = dragState.current.scrollLeft - d * 1.5;
  }, []);

  return (
    <>
      <section
        className="relative z-[2] py-32 md:py-44 overflow-hidden"
        id="portfolio"
      >
        <div className="text-center mb-20 md:mb-28 px-6">
          <motion.span
            className="label-micro !text-[#A16207] inline-block mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Works
          </motion.span>

          <TextReveal
            text="Portfolio"
            className="font-display text-[#1a1a1a] tracking-[0.08em] uppercase"
            tag="h2"
            delay={0.1}
          />

          <LineReveal delay={0.3} className="w-[60px] mx-auto mt-8" />
        </div>

        <div
          ref={trackRef}
          className={`portfolio-track flex gap-10 overflow-x-auto px-6 md:px-14 pb-8 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => { handleMouseUp(); setIsPaused(false); }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
        >
          {items.map((project, i) => (
            <PortfolioCard
              key={project.key}
              project={project}
              index={i}
              isHovered={hoveredIdx === i}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
              onClick={() => { if (!dragState.current.moved) setLightboxProject(project.key); }}
            />
          ))}
        </div>
      </section>

      {lightboxProject && (
        <Lightbox projectKey={lightboxProject} onClose={() => setLightboxProject(null)} />
      )}
    </>
  );
}

function PortfolioCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  // Pick a preview image that's different from the thumbnail
  const previewImage = project.images.find((img) => img !== project.thumbnail) || project.images[0];

  return (
    <motion.div
      className="shrink-0 group relative"
      style={{ width: "clamp(240px, 28vw, 360px)" }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div onClick={onClick} data-hover>
        <motion.div
          className="aspect-[4/5] mb-5 overflow-hidden relative rounded-sm"
          animate={{
            scale: isHovered ? 1.02 : 1,
            boxShadow: isHovered
              ? "0 20px 60px rgba(161,98,7,0.12)"
              : "0 4px 20px rgba(0,0,0,0.06)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? "scale(1.08)" : "scale(1)",
            }}
          />
          <img
            src={previewImage}
            alt={`${project.title} preview`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scale(1)" : "scale(1.08)",
            }}
          />

          <div
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 40%)",
              opacity: isHovered ? 1 : 0,
            }}
          />

          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute bottom-4 right-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-[11px] tracking-[0.15em] text-[#D4AF37] flex items-center gap-1">
                  Open
                  <ArrowRight size={11} strokeWidth={2} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <span className="label-micro !text-[#A16207] !text-[10px] block mb-3">
          {project.category}
        </span>
        <h3 className="font-display text-[#1a1a1a] mb-3" style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}>
          {project.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-[#888] group-hover:text-[#A16207] transition-all duration-300">
          View Project
          <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-2" />
        </span>
      </div>
    </motion.div>
  );
}
