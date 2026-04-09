"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, LineReveal } from "./text-reveal";
import { ParallaxImage } from "./parallax-image";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      className="relative z-[2] py-20 md:py-44 px-6 md:px-14 overflow-hidden"
      id="about"
    >
      <motion.div
        className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none hidden md:block"
        style={{
          background: "radial-gradient(circle, #A16207, transparent 70%)",
          y: bgY,
        }}
      />


      <div
        className="grid grid-cols-1 md:grid-cols-2 items-center max-w-[1300px] mx-auto gap-12 md:gap-[clamp(48px,8vw,140px)]"
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            <motion.div
              className="absolute -top-3 md:-top-5 -left-3 md:-left-5 w-16 md:w-28 h-16 md:h-28 border-t border-l border-[#A16207]/20"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.div
              className="absolute -bottom-3 md:-bottom-5 -right-3 md:-right-5 w-16 md:w-28 h-16 md:h-28 border-b border-r border-[#A16207]/20"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            <ParallaxImage
              src="/images/about/B0020226.jpg"
              alt="Rahel Wahnon Ben Haim — Architect"
              className="aspect-[4/3] md:aspect-[3/4]"
              speed={0.2}
            />
          </div>
          <motion.span
            className="block mt-4 text-[9px] tracking-[0.2em] uppercase text-[#171717]/40 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Photo: Michal Chelbin
          </motion.span>
        </motion.div>

        {/* Text */}
        <div>
          <motion.span
            className="label-micro !text-[#A16207] inline-block mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Architect
          </motion.span>

          <TextReveal
            text="Where heritage meets modern form"
            className="font-display text-[#171717] leading-[1.1]"
            tag="h2"
            delay={0.1}
          />

          <LineReveal delay={0.4} className="w-[60px] my-8 md:my-10" />

          <motion.p
            className="text-[14px] md:text-[15px] font-light text-[#333] leading-[1.9] md:leading-[2] mb-5 md:mb-6 max-w-[520px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Rahel Wahnon Ben Haim, founder of RWBH Architects, is a rarity in
            her profession. Born to an Orthodox Jewish family in Jerusalem, her
            strong bond with her father and her pragmatic demeanor paved the way
            for her chosen profession.
          </motion.p>

          <motion.p
            className="text-[14px] md:text-[15px] font-light text-[#333] leading-[1.9] md:leading-[2] mb-8 md:mb-10 max-w-[520px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Her modus operandi is functional, quality design — one that radiates
            with as much joy as it is fit with organized and purposeful
            principles.
          </motion.p>

          <motion.blockquote
            className="py-5 pl-5 md:pl-6 font-light italic leading-relaxed text-[#A16207]"
            style={{
              borderLeft: "2px solid #A16207",
              fontFamily: "var(--font-serif), Cinzel, Georgia, serif",
              fontSize: "clamp(15px, 2vw, 22px)",
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            &ldquo;For me, art is freedom. I pave an honest path in everything
            that I do. The rest will reveal itself.&rdquo;
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
