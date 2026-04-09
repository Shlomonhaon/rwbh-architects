"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { MasterPlan } from "@/components/master-plan";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <Preloader key="preloader" onComplete={onComplete} />}
      </AnimatePresence>

      <a
        href="#portfolio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#D4AF37] focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:rounded"
      >
        Skip to content
      </a>

      <CustomCursor />
      <ScrollProgress />
      <div className="noise-overlay" />

      <MasterPlan />
      <Navigation />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
