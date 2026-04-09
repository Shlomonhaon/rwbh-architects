"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll-driven SVG Line Drawing Animation
 * Lines are drawn progressively as the user scrolls.
 * Each path's draw progress is tied to scrollYProgress.
 */

function useDrawOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  return { ref, scrollYProgress };
}

interface ScrollPathProps {
  d: string;
  progress: MotionValue<number>;
  delay?: number;
  strokeWidth?: number;
}

function ScrollPath({ d, progress, delay = 0, strokeWidth = 0.5 }: ScrollPathProps) {
  const pathLength = useTransform(progress, [delay, Math.min(delay + 0.4, 1)], [0, 1]);
  const opacity = useTransform(progress, [delay, delay + 0.05], [0, 1]);

  return (
    <motion.path
      d={d}
      style={{ pathLength, opacity }}
      strokeWidth={strokeWidth}
    />
  );
}

function ScrollLine({ x1, y1, x2, y2, progress, delay = 0 }: {
  x1: number; y1: number; x2: number; y2: number;
  progress: MotionValue<number>;
  delay?: number;
}) {
  const pathLength = useTransform(progress, [delay, Math.min(delay + 0.35, 1)], [0, 1]);
  const opacity = useTransform(progress, [delay, delay + 0.05], [0, 1]);

  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      style={{ pathLength, opacity }}
    />
  );
}

function ScrollRect({ x, y, w, h, progress, delay = 0 }: {
  x: number; y: number; w: number; h: number;
  progress: MotionValue<number>;
  delay?: number;
}) {
  const pathLength = useTransform(progress, [delay, Math.min(delay + 0.4, 1)], [0, 1]);
  const opacity = useTransform(progress, [delay, delay + 0.05], [0, 1]);

  return (
    <motion.rect
      x={x} y={y} width={w} height={h}
      style={{ pathLength, opacity }}
    />
  );
}

function ScrollCircle({ cx, cy, r, progress, delay = 0 }: {
  cx: number; cy: number; r: number;
  progress: MotionValue<number>;
  delay?: number;
}) {
  const pathLength = useTransform(progress, [delay, Math.min(delay + 0.4, 1)], [0, 1]);
  const opacity = useTransform(progress, [delay, delay + 0.05], [0, 1]);

  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      style={{ pathLength, opacity }}
    />
  );
}

// ═══════════════════════════════════════════
// FLOOR PLAN — detailed architectural drawing
// ═══════════════════════════════════════════
export function FloorPlan({ className = "" }: { className?: string }) {
  const { ref, scrollYProgress } = useDrawOnScroll();

  return (
    <div ref={ref}>
    <motion.svg
      viewBox="0 0 400 300"
      fill="none"
      stroke="#A16207"
      strokeWidth="0.5"
      className={`opacity-[0.25] ${className}`}
    >
      {/* Outer walls */}
      <ScrollRect x={10} y={10} w={380} h={280} progress={scrollYProgress} delay={0} />
      {/* Interior walls */}
      <ScrollLine x1={200} y1={10} x2={200} y2={290} progress={scrollYProgress} delay={0.1} />
      <ScrollLine x1={10} y1={150} x2={200} y2={150} progress={scrollYProgress} delay={0.15} />
      <ScrollLine x1={200} y1={100} x2={390} y2={100} progress={scrollYProgress} delay={0.2} />
      {/* Rooms */}
      <ScrollRect x={220} y={20} w={60} h={60} progress={scrollYProgress} delay={0.25} />
      <ScrollRect x={310} y={20} w={60} h={60} progress={scrollYProgress} delay={0.3} />
      <ScrollRect x={220} y={120} w={80} h={70} progress={scrollYProgress} delay={0.35} />
      {/* Door arcs */}
      <ScrollPath d="M 200 150 A 30 30 0 0 1 230 120" progress={scrollYProgress} delay={0.4} />
      <ScrollPath d="M 200 100 A 25 25 0 0 0 175 75" progress={scrollYProgress} delay={0.45} />
      {/* Stairs */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ScrollLine key={`stair-${i}`} x1={30} y1={170 + i * 15} x2={90} y2={170 + i * 15} progress={scrollYProgress} delay={0.5 + i * 0.03} />
      ))}
      {/* Dimension lines */}
      <ScrollLine x1={30} y1={30} x2={180} y2={30} progress={scrollYProgress} delay={0.7} />
      <ScrollLine x1={30} y1={25} x2={30} y2={35} progress={scrollYProgress} delay={0.7} />
      <ScrollLine x1={180} y1={25} x2={180} y2={35} progress={scrollYProgress} delay={0.7} />
      {/* Bathroom fixtures */}
      <ScrollRect x={330} y={130} w={25} h={35} progress={scrollYProgress} delay={0.75} />
      <ScrollCircle cx={350} cy={200} r={12} progress={scrollYProgress} delay={0.8} />
      {/* Kitchen counter */}
      <ScrollPath d="M 30 50 L 30 130 L 80 130" progress={scrollYProgress} delay={0.85} />
    </motion.svg>
    </div>
  );
}

// ═══════════════════════════════════════════
// BUILDING ELEVATION — facade with windows
// ═══════════════════════════════════════════
export function BuildingElevation({ className = "" }: { className?: string }) {
  const { ref, scrollYProgress } = useDrawOnScroll();

  return (
    <div ref={ref}>
    <motion.svg
      viewBox="0 0 250 380"
      fill="none"
      stroke="#A16207"
      strokeWidth="0.5"
      className={`opacity-[0.2] ${className}`}
    >
      {/* Building outline */}
      <ScrollRect x={15} y={50} w={220} h={320} progress={scrollYProgress} delay={0} />
      {/* Roof */}
      <ScrollPath d="M 15 50 L 125 10 L 235 50" progress={scrollYProgress} delay={0.1} />
      {/* Windows — 3 rows x 3 cols */}
      {[70, 150, 230].map((y, row) =>
        [35, 100, 170].map((x, col) => (
          <ScrollRect key={`win-${row}-${col}`} x={x} y={y} w={35} h={50} progress={scrollYProgress} delay={0.15 + row * 0.1 + col * 0.05} />
        ))
      )}
      {/* Door */}
      <ScrollRect x={90} y={300} w={70} h={70} progress={scrollYProgress} delay={0.55} />
      <ScrollPath d="M 90 300 L 125 280 L 160 300" progress={scrollYProgress} delay={0.6} />
      {/* Balcony */}
      <ScrollLine x1={35} y1={145} x2={100} y2={145} progress={scrollYProgress} delay={0.65} />
      <ScrollLine x1={35} y1={145} x2={35} y2={155} progress={scrollYProgress} delay={0.65} />
      <ScrollLine x1={100} y1={145} x2={100} y2={155} progress={scrollYProgress} delay={0.65} />
      {/* Ground line */}
      <ScrollLine x1={0} y1={370} x2={250} y2={370} progress={scrollYProgress} delay={0.75} />
    </motion.svg>
    </div>
  );
}

// ═══════════════════════════════════════════
// ARCH DETAIL — Jerusalem stone arch
// ═══════════════════════════════════════════
export function ArchDetail({ className = "" }: { className?: string }) {
  const { ref, scrollYProgress } = useDrawOnScroll();

  return (
    <div ref={ref}>
    <motion.svg
      viewBox="0 0 200 280"
      fill="none"
      stroke="#A16207"
      strokeWidth="0.5"
      className={`opacity-[0.2] ${className}`}
    >
      {/* Outer arch */}
      <ScrollPath d="M 20 260 L 20 90 A 80 80 0 0 1 180 90 L 180 260" progress={scrollYProgress} delay={0} />
      {/* Base line */}
      <ScrollLine x1={20} y1={260} x2={180} y2={260} progress={scrollYProgress} delay={0.15} />
      {/* Inner arch */}
      <ScrollPath d="M 40 260 L 40 100 A 60 60 0 0 1 160 100 L 160 260" progress={scrollYProgress} delay={0.25} />
      {/* Keystone */}
      <ScrollRect x={90} y={55} w={20} h={30} progress={scrollYProgress} delay={0.45} />
      {/* Center axis */}
      <ScrollLine x1={100} y1={260} x2={100} y2={100} progress={scrollYProgress} delay={0.55} />
      {/* Stone blocks */}
      {[120, 160, 200, 240].map((y, i) => (
        <ScrollLine key={`stone-${i}`} x1={20} y1={y} x2={180} y2={y} progress={scrollYProgress} delay={0.6 + i * 0.05} />
      ))}
    </motion.svg>
    </div>
  );
}

// ═══════════════════════════════════════════
// COMPASS ROSE — orientation mark
// ═══════════════════════════════════════════
export function CompassRose({ className = "" }: { className?: string }) {
  const { ref, scrollYProgress } = useDrawOnScroll();

  return (
    <div ref={ref}>
    <motion.svg
      viewBox="0 0 140 140"
      fill="none"
      stroke="#A16207"
      strokeWidth="0.5"
      className={`opacity-[0.18] ${className}`}
    >
      <ScrollCircle cx={70} cy={70} r={58} progress={scrollYProgress} delay={0} />
      <ScrollCircle cx={70} cy={70} r={50} progress={scrollYProgress} delay={0.1} />
      <ScrollLine x1={70} y1={12} x2={70} y2={128} progress={scrollYProgress} delay={0.2} />
      <ScrollLine x1={12} y1={70} x2={128} y2={70} progress={scrollYProgress} delay={0.3} />
      {/* Diagonal lines */}
      <ScrollLine x1={28} y1={28} x2={112} y2={112} progress={scrollYProgress} delay={0.4} />
      <ScrollLine x1={112} y1={28} x2={28} y2={112} progress={scrollYProgress} delay={0.45} />
      {/* North arrow */}
      <ScrollPath d="M 70 18 L 78 58 L 70 70 L 62 58 Z" progress={scrollYProgress} delay={0.55} />
    </motion.svg>
    </div>
  );
}

// ═══════════════════════════════════════════
// GRID CONSTRUCTION — structural grid
// ═══════════════════════════════════════════
export function GridConstruction({ className = "" }: { className?: string }) {
  const { ref, scrollYProgress } = useDrawOnScroll();

  return (
    <div ref={ref}>
    <motion.svg
      viewBox="0 0 280 280"
      fill="none"
      stroke="#A16207"
      strokeWidth="0.3"
      className={`opacity-[0.15] ${className}`}
    >
      {[0, 40, 80, 120, 160, 200, 240, 280].map((pos, i) => (
        <g key={i}>
          <ScrollLine x1={pos} y1={0} x2={pos} y2={280} progress={scrollYProgress} delay={i * 0.05} />
          <ScrollLine x1={0} y1={pos} x2={280} y2={pos} progress={scrollYProgress} delay={i * 0.05 + 0.02} />
        </g>
      ))}
      <ScrollCircle cx={140} cy={140} r={80} progress={scrollYProgress} delay={0.5} />
      <ScrollCircle cx={140} cy={140} r={40} progress={scrollYProgress} delay={0.6} />
    </motion.svg>
    </div>
  );
}

// ═══════════════════════════════════════════
// STAIRCASE — section view
// ═══════════════════════════════════════════
export function Staircase({ className = "" }: { className?: string }) {
  const { ref, scrollYProgress } = useDrawOnScroll();

  return (
    <div ref={ref}>
    <motion.svg
      viewBox="0 0 160 300"
      fill="none"
      stroke="#A16207"
      strokeWidth="0.4"
      className={`opacity-[0.18] ${className}`}
    >
      <ScrollRect x={10} y={10} w={140} h={280} progress={scrollYProgress} delay={0} />
      {Array.from({ length: 12 }, (_, i) => (
        <ScrollLine key={i} x1={10} y1={30 + i * 22} x2={150} y2={30 + i * 22} progress={scrollYProgress} delay={0.1 + i * 0.05} />
      ))}
      {/* Handrail */}
      <ScrollPath d="M 80 10 L 80 290" progress={scrollYProgress} delay={0.75} strokeWidth={0.3} />
      {/* Arrow */}
      <ScrollPath d="M 75 20 L 80 10 L 85 20" progress={scrollYProgress} delay={0.85} />
    </motion.svg>
    </div>
  );
}
