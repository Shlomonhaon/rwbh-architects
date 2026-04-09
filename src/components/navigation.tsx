"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./magnetic-button";

const links = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-6 md:px-14 transition-all duration-700 ${
          scrolled
            ? "bg-[#F5F0EB]/95 backdrop-blur-2xl border-b border-[#D6CFC7]/50"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          className={`font-display text-base tracking-[0.5em] transition-colors duration-500 ${
            scrolled ? "text-[#1a1a1a]" : "text-white"
          } hover:text-[#A16207]`}
          data-hover
        >
          RWBH
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <MagneticButton
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`label-micro transition-colors duration-300 py-2 ${
                scrolled
                  ? "!text-[#5a5a5a] hover:!text-[#1a1a1a]"
                  : "!text-white/80 hover:!text-white"
              }`}
            >
              {link.label}
            </MagneticButton>
          ))}
          <MagneticButton className="py-2">
            <a
              href="https://www.instagram.com/rwbh_arch/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`transition-colors duration-300 ${
                scrolled ? "text-[#5a5a5a] hover:text-[#A16207]" : "text-white/80 hover:text-[#D4AF37]"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </MagneticButton>
        </div>

        <button
          className="md:hidden flex flex-col gap-[6px] p-2"
          onClick={toggleMenu}
          aria-label="Menu"
          data-hover
        >
          <motion.span
            className={`block w-6 h-px ${scrolled ? "bg-[#1a1a1a]" : "bg-white"}`}
            animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`block w-6 h-px ${scrolled ? "bg-[#1a1a1a]" : "bg-white"}`}
            animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#F5F0EB] flex flex-col items-center justify-center gap-10"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                onClick={() => scrollTo(link.href)}
                className="font-display text-4xl text-[#1a1a1a] hover:text-[#A16207] transition-colors duration-300"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
