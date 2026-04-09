"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const heroImages = [
  "/images/projects/schneller-estate/shif-35-scaled.jpg",
  "/images/projects/bayit-vegan/Abuav12303-scaled.jpg",
  "/images/projects/haturim-01/Haturim17668-scaled.jpg",
  "/images/projects/schneller-estate/shif-67-scaled.jpg",
  "/images/projects/haturim-02/Haturim18509-scaled.jpg",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-[2] min-h-screen flex flex-col md:flex-row"
      id="hero"
    >
      {/* Text */}
      <motion.div
        className="relative z-[2] w-full md:w-[48%] bg-[#F5F0EB] flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-0 order-2 md:order-1"
      >
        <div className="max-w-[500px] w-full">
          <motion.span
            className="label-micro !text-[#A16207] inline-block mb-6 md:mb-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Architecture &amp; Interior Design
          </motion.span>

          <div className="overflow-hidden mb-1 md:mb-2">
            <motion.h1
              className="font-display text-[#1a1a1a] leading-[0.95] tracking-[0.02em]"
              style={{ fontSize: "clamp(40px, 7vw, 90px)" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Rahel
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1 md:mb-2">
            <motion.h1
              className="font-display text-[#1a1a1a] leading-[0.95] tracking-[0.02em]"
              style={{ fontSize: "clamp(40px, 7vw, 90px)" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Wahnon
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6 md:mb-8">
            <motion.h1
              className="font-display text-[#A16207] leading-[0.95] tracking-[0.02em]"
              style={{ fontSize: "clamp(40px, 7vw, 90px)" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Ben Haim
            </motion.h1>
          </div>

          <motion.div
            className="h-px bg-gradient-to-r from-[#A16207] to-transparent mb-6 md:mb-8"
            style={{ width: 80 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p
            className="text-base md:text-lg font-light text-[#555] leading-relaxed max-w-[380px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Luxury living spaces, meticulously crafted in Jerusalem
          </motion.p>

          <motion.div
            className="mt-8 md:mt-12 flex items-center gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            <a
              href="#portfolio"
              className="label-micro !text-[11px] md:!text-[12px] !text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:!text-[#A16207] hover:border-[#A16207] transition-colors duration-300 py-2"
              data-hover
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="label-micro !text-[11px] md:!text-[12px] !text-[#999] hover:!text-[#A16207] transition-colors duration-300 py-2"
              data-hover
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Image slideshow */}
      <div className="relative w-full md:w-[52%] h-[45vh] md:h-screen overflow-hidden order-1 md:order-2">
        {heroImages.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt="RWBH Architecture"
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              opacity: i === currentImg ? 1 : 0,
              scale: i === currentImg ? 1 : 1.05,
            }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ scale: imgScale }}
          />
        ))}

        <div className="absolute inset-0 bg-[#1a1a1a]/10 pointer-events-none" />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              className="flex items-center justify-center"
              style={{ minHeight: 44, minWidth: 44, background: "none" }}
              aria-label={`Image ${i + 1}`}
              data-hover
            >
              <span className={`block h-[3px] rounded-full transition-all duration-500 ${
                i === currentImg ? "w-8 bg-[#D4AF37]" : "w-3 bg-white/30"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
