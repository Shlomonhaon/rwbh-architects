"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MasterPlan() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Prepare all paths — hidden via dashoffset
    const allPaths = svg.querySelectorAll("path, circle, ellipse");
    allPaths.forEach((el) => {
      const geo = el as SVGGeometryElement;
      try {
        const len = geo.getTotalLength();
        geo.style.strokeDasharray = `${len}`;
        geo.style.strokeDashoffset = `${len}`;
      } catch {
        geo.style.strokeDasharray = "2000";
        geo.style.strokeDashoffset = "2000";
      }
    });

    // GPU acceleration hint
    svg.querySelectorAll("[data-section]").forEach((s) => {
      (s as HTMLElement).style.willChange = "filter, opacity";
    });

    // Parallax — SVG moves opposite to scroll at -8%
    gsap.to(svg, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Section ranges with 22% overlap
    const sections = [
      { idx: 0, start: 0, end: 34 },
      { idx: 1, start: 22, end: 56 },
      { idx: 2, start: 44, end: 78 },
      { idx: 3, start: 66, end: 100 },
    ];

    sections.forEach((sec) => {
      const g = svg.querySelector(`[data-section="${sec.idx}"]`);
      if (!g) return;

      const outer = g.querySelectorAll(".s-outer");
      const inner = g.querySelectorAll(".s-inner");
      const detail = g.querySelectorAll(".detail");
      const annotation = g.querySelectorAll(".annotation");

      // Timeline with scrub: 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: `${sec.start}% top`,
          end: `${sec.end}% top`,
          scrub: 1,

          // Bell curve focus — sin(π) for smooth in/out
          onUpdate: (self) => {
            const p = self.progress;
            const intensity = Math.sin(p * Math.PI);
            gsap.to(g, {
              opacity: 0.06 + 0.44 * intensity,
              filter: `blur(${(1 - intensity) * 2}px) saturate(${0.3 + 0.7 * intensity})`,
              duration: 0.1,
              overwrite: "auto",
            });
          },
        },
      });

      // Hierarchical stagger: shell → interior → furniture → dimensions
      if (outer.length) tl.to(outer, { strokeDashoffset: 0, ease: "none", stagger: 0.02 }, 0);
      if (inner.length) tl.to(inner, { strokeDashoffset: 0, ease: "none", stagger: 0.04 }, 0.04);
      if (detail.length) tl.to(detail, { strokeDashoffset: 0, ease: "none", stagger: 0.06 }, 0.08);
      if (annotation.length) tl.to(annotation, { strokeDashoffset: 0, ease: "none", stagger: 0.08 }, 0.12);
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none" style={{ overflow: "hidden" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1920 4000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#8B7355"
        preserveAspectRatio="xMinYMin meet"
        style={{ width: "100%", height: "auto", minHeight: "400vh" }}
      >
        <defs>
          <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="3" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* ═══ SECTION 1: SITE PLAN (0-1000) ═══ */}
        <g data-section="0" opacity="0.06" filter="url(#rough)">
          <path className="s-outer" d="M 120 100 L 1800 100 L 1800 1000 L 120 1000 Z" strokeWidth="2" />
          <path className="s-outer" d="M 0 550 L 1920 550" strokeWidth="2.5" />
          <path className="s-outer" d="M 280 180 L 720 180 L 720 500 L 280 500 Z" strokeWidth="2" />
          <path className="s-outer" d="M 1100 180 L 1450 180 L 1450 400 L 1100 400 Z" strokeWidth="2" />

          <path className="s-inner" d="M 960 550 L 960 180" strokeWidth="1.5" />
          <path className="s-inner" d="M 420 180 L 420 500" strokeWidth="1.5" />
          <path className="s-inner" d="M 280 340 L 720 340" strokeWidth="1.5" />
          <path className="s-inner" d="M 540 180 L 540 340" strokeWidth="1.5" />
          <path className="s-inner" d="M 620 340 L 620 500" strokeWidth="1.5" />
          <path className="s-inner" d="M 1280 180 L 1280 400" strokeWidth="1.5" />
          <path className="s-inner" d="M 1100 290 L 1280 290" strokeWidth="1.5" />

          <path className="detail" d="M 420 340 A 35 35 0 0 1 455 305" strokeWidth="0.8" />
          <path className="detail" d="M 540 500 A 30 30 0 0 0 510 470" strokeWidth="0.8" />
          <path className="detail" d="M 310 210 L 400 210 M 310 230 L 400 230 M 310 250 L 400 250 M 310 270 L 400 270 M 310 290 L 400 290 M 310 310 L 400 310" strokeWidth="0.6" />
          <circle className="detail" cx="1380" cy="230" r="18" strokeWidth="0.7" />
          <path className="detail" d="M 800 620 L 1120 620 L 1120 850 A 55 55 0 0 1 1065 905 L 855 905 A 55 55 0 0 1 800 850 Z" strokeWidth="1" />
          <path className="detail" d="M 825 645 L 1095 645 L 1095 835 A 42 42 0 0 1 1053 877 L 867 877 A 42 42 0 0 1 825 835 Z" strokeWidth="0.5" />
          <circle className="detail" cx="180" cy="720" r="45" strokeWidth="0.6" />
          <circle className="detail" cx="180" cy="720" r="28" strokeWidth="0.35" />
          <circle className="detail" cx="350" cy="680" r="35" strokeWidth="0.6" />
          <circle className="detail" cx="520" cy="750" r="40" strokeWidth="0.6" />
          <circle className="detail" cx="1620" cy="270" r="50" strokeWidth="0.6" />
          <circle className="detail" cx="1720" cy="400" r="38" strokeWidth="0.6" />
          <path className="detail" d="M 1280 590 L 1720 590 L 1720 820 L 1280 820 Z" strokeWidth="0.8" />
          <path className="detail" d="M 1370 590 L 1370 820 M 1460 590 L 1460 820 M 1550 590 L 1550 820 M 1640 590 L 1640 820" strokeWidth="0.5" />

          <path className="annotation" d="M 280 150 L 720 150" strokeWidth="0.4" strokeDasharray="4 4" />
          <path className="annotation" d="M 280 145 L 280 155 M 720 145 L 720 155" strokeWidth="0.4" />
          <path className="annotation" d="M 120 100 L 120 1000 M 480 100 L 480 1000 M 840 100 L 840 1000 M 1200 100 L 1200 1000 M 1560 100 L 1560 1000" strokeWidth="0.15" strokeDasharray="3 12" />
          <path className="annotation" d="M 0 570 L 1920 570" strokeWidth="0.4" strokeDasharray="25 12" />
          <circle className="annotation" cx="1760" cy="160" r="55" strokeWidth="0.4" />
          <circle className="annotation" cx="1760" cy="160" r="46" strokeWidth="0.3" />
          <path className="annotation" d="M 1760 105 L 1760 215 M 1705 160 L 1815 160" strokeWidth="0.4" />
          <path className="annotation" d="M 1760 110 L 1770 148 L 1760 160 L 1750 148 Z" strokeWidth="0.4" />
        </g>

        {/* ═══ SECTION 2: FLOOR PLAN (1000-2000) ═══ */}
        <g data-section="1" opacity="0.06" filter="url(#rough)">
          <path className="s-outer" d="M 180 1100 L 1740 1100 L 1740 1900 L 180 1900 Z" strokeWidth="2.5" />

          <path className="s-inner" d="M 760 1100 L 760 1900" strokeWidth="1.5" />
          <path className="s-inner" d="M 1260 1100 L 1260 1900" strokeWidth="1.5" />
          <path className="s-inner" d="M 180 1500 L 760 1500" strokeWidth="1.5" />
          <path className="s-inner" d="M 760 1400 L 1260 1400" strokeWidth="1.5" />
          <path className="s-inner" d="M 1260 1500 L 1740 1500" strokeWidth="1.5" />

          <path className="detail" d="M 260 1180 L 680 1180 L 680 1220 L 260 1220 Z" strokeWidth="0.8" />
          <path className="detail" d="M 260 1180 L 260 1380 L 305 1380 L 305 1220" strokeWidth="0.8" />
          <path className="detail" d="M 680 1180 L 680 1380 L 635 1380 L 635 1220" strokeWidth="0.8" />
          <path className="detail" d="M 400 1260 L 540 1260 L 540 1350 L 400 1350 Z" strokeWidth="0.8" />
          <path className="detail" d="M 260 1550 L 260 1850 L 380 1850" strokeWidth="0.8" />
          <circle className="detail" cx="310" cy="1600" r="16" strokeWidth="0.8" />
          <circle className="detail" cx="355" cy="1600" r="16" strokeWidth="0.8" />
          <path className="detail" d="M 440 1600 L 660 1600 L 660 1700 L 440 1700 Z" strokeWidth="0.8" />
          <path className="detail" d="M 840 1180 L 1160 1180 L 1160 1340 L 840 1340 Z" strokeWidth="0.8" />
          <path className="detail" d="M 840 1480 L 1160 1480 L 1160 1640 L 840 1640 Z" strokeWidth="0.8" />
          <path className="detail" d="M 1340 1180 L 1640 1180 L 1640 1340 L 1340 1340 Z" strokeWidth="0.8" />
          <circle className="detail" cx="1490" cy="1260" r="35" strokeWidth="0.8" />
          <path className="detail" d="M 760 1500 A 45 45 0 0 1 805 1455" strokeWidth="0.8" />
          <path className="detail" d="M 1260 1400 A 40 40 0 0 0 1220 1360" strokeWidth="0.8" />
          <path className="detail" d="M 1340 1550 L 1540 1550 L 1540 1850 L 1340 1850 Z" strokeWidth="0.8" />
          <path className="detail" d="M 1340 1585 L 1540 1585 M 1340 1620 L 1540 1620 M 1340 1655 L 1540 1655 M 1340 1690 L 1540 1690 M 1340 1725 L 1540 1725 M 1340 1760 L 1540 1760 M 1340 1795 L 1540 1795 M 1340 1830 L 1540 1830" strokeWidth="0.4" />

          <path className="annotation" d="M 180 1070 L 760 1070" strokeWidth="0.4" strokeDasharray="4 4" />
          <path className="annotation" d="M 150 1100 L 150 1900" strokeWidth="0.4" strokeDasharray="4 4" />
        </g>

        {/* ═══ SECTION 3: ELEVATION (2000-3000) ═══ */}
        <g data-section="2" opacity="0.06" filter="url(#rough)">
          <path className="s-outer" d="M 80 2800 L 1840 2800" strokeWidth="2.5" />
          <path className="s-outer" d="M 280 2250 L 280 2800 L 1640 2800 L 1640 2250" strokeWidth="2.5" />
          <path className="s-outer" d="M 260 2250 L 960 2050 L 1660 2250" strokeWidth="2" />

          <path className="detail" d="M 360 2300 L 520 2300 L 520 2440 L 360 2440 Z" strokeWidth="0.8" />
          <path className="detail" d="M 440 2300 L 440 2440" strokeWidth="0.4" />
          <path className="detail" d="M 620 2300 L 780 2300 L 780 2440 L 620 2440 Z" strokeWidth="0.8" />
          <path className="detail" d="M 700 2300 L 700 2440" strokeWidth="0.4" />
          <path className="detail" d="M 1140 2300 L 1300 2300 L 1300 2440 L 1140 2440 Z" strokeWidth="0.8" />
          <path className="detail" d="M 1400 2300 L 1560 2300 L 1560 2440 L 1400 2440 Z" strokeWidth="0.8" />
          <path className="detail" d="M 360 2520 L 520 2520 L 520 2660 L 360 2660 Z" strokeWidth="0.8" />
          <path className="detail" d="M 620 2520 L 780 2520 L 780 2660 L 620 2660 Z" strokeWidth="0.8" />
          <path className="detail" d="M 1140 2520 L 1300 2520 L 1300 2660 L 1140 2660 Z" strokeWidth="0.8" />
          <path className="detail" d="M 1400 2520 L 1560 2520 L 1560 2660 L 1400 2660 Z" strokeWidth="0.8" />
          <path className="detail" d="M 850 2550 L 1070 2550 L 1070 2800 L 850 2800 Z" strokeWidth="1" />
          <path className="detail" d="M 850 2550 A 110 90 0 0 1 1070 2550" strokeWidth="0.8" />
          <path className="detail" d="M 850 2800 L 830 2835 L 1090 2835 L 1070 2800" strokeWidth="0.8" />
          <path className="detail" d="M 360 2490 L 780 2490" strokeWidth="0.8" />
          <path className="detail" d="M 360 2490 L 360 2510 M 470 2490 L 470 2510 M 580 2490 L 580 2510 M 690 2490 L 690 2510 M 780 2490 L 780 2510" strokeWidth="0.8" />
          <path className="detail" d="M 1520 2100 L 1520 2050 L 1580 2050 L 1580 2100" strokeWidth="0.8" />

          <path className="annotation" d="M 960 2050 L 960 2250" strokeWidth="0.4" strokeDasharray="8 5" />
          <path className="annotation" d="M 240 2250 L 240 2800" strokeWidth="0.4" strokeDasharray="4 4" />
        </g>

        {/* ═══ SECTION 4: CROSS SECTION (3000-4000) ═══ */}
        <g data-section="3" opacity="0.06" filter="url(#rough)">
          <path className="s-outer" d="M 260 3200 L 960 3050 L 1660 3200" strokeWidth="2" />
          <path className="s-outer" d="M 280 3200 L 1640 3200" strokeWidth="2" />
          <path className="s-outer" d="M 280 3200 L 280 3750" strokeWidth="2.5" />
          <path className="s-outer" d="M 1640 3200 L 1640 3750" strokeWidth="2.5" />
          <path className="s-outer" d="M 80 3750 L 1840 3750" strokeWidth="2.5" />

          <path className="s-inner" d="M 280 3500 L 1640 3500" strokeWidth="1.5" />
          <path className="s-inner" d="M 700 3200 L 700 3750" strokeWidth="1.5" />
          <path className="s-inner" d="M 1200 3200 L 1200 3750" strokeWidth="1.5" />

          <path className="detail" d="M 280 3200 L 280 3180 L 700 3180 L 700 3200" strokeWidth="0.8" />
          <path className="detail" d="M 700 3200 L 700 3180 L 1200 3180 L 1200 3200" strokeWidth="0.8" />
          <path className="detail" d="M 1200 3200 L 1200 3180 L 1640 3180 L 1640 3200" strokeWidth="0.8" />
          <path className="detail" d="M 380 3650 L 620 3650 L 620 3700 L 380 3700 Z" strokeWidth="0.8" />
          <path className="detail" d="M 800 3600 L 1100 3600 L 1100 3700 L 800 3700 Z" strokeWidth="0.8" />
          <path className="detail" d="M 1300 3500 L 1360 3500 L 1360 3460 L 1420 3460 L 1420 3420 L 1480 3420 L 1480 3380 L 1540 3380 L 1540 3340 L 1600 3340 L 1600 3200" strokeWidth="1" />

          <path className="annotation" d="M 280 3750 L 280 3800 L 1640 3800 L 1640 3750" strokeWidth="0.4" strokeDasharray="6 3" />
          <path className="annotation" d="M 230 3750 L 230 3200" strokeWidth="0.4" strokeDasharray="4 6" />
          <path className="annotation" d="M 225 3750 L 235 3750 M 225 3500 L 235 3500 M 225 3200 L 235 3200" strokeWidth="0.4" />
        </g>
      </svg>
    </div>
  );
}
