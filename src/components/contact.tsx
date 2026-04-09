"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section className="relative z-[2] py-20 md:py-44 px-6 md:px-14" id="contact">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-12 md:gap-20 items-center">

        {/* Left */}
        <div className="text-center md:text-left">
          <motion.span
            className="label-micro !text-[#A16207] inline-block mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.span>

          <motion.h2
            className="font-display text-[#1a1a1a] leading-[1.05] mb-8"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Contact
            <br />
            <span className="text-[#A16207]">Us</span>
          </motion.h2>

          <motion.a
            href="mailto:office@rwbh.co.il"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white text-[11px] tracking-[0.3em] uppercase font-light hover:bg-[#A16207] transition-colors duration-300 min-h-[48px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            data-hover
          >
            Send a Message
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </motion.a>
        </div>

        {/* Divider — horizontal on mobile, vertical on desktop */}
        <motion.div
          className="w-full md:w-px h-px md:h-full bg-[#D6CFC7]"
          initial={{ scaleX: 0, scaleY: 0 }}
          whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Right */}
        <div className="flex flex-col gap-8 md:gap-10">
          {[
            { label: "Studio", content: "62 Harav Shim'on Agasi St\nJerusalem, Israel" },
            { label: "Phone", content: "(+972) 02-579-3975", href: "tel:+97225793975" },
            { label: "Email", content: "office@rwbh.co.il", href: "mailto:office@rwbh.co.il" },
            { label: "Instagram", content: "@rwbh_arch", href: "https://www.instagram.com/rwbh_arch/" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            >
              <span className="label-micro !text-[10px] !text-[#A16207] block mb-2">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-display text-[16px] md:text-[18px] text-[#1a1a1a] hover:text-[#A16207] transition-colors duration-300 whitespace-pre-line min-h-[44px] inline-flex items-center"
                  data-hover
                >
                  {item.content}
                </a>
              ) : (
                <p className="font-display text-[16px] md:text-[18px] text-[#1a1a1a] whitespace-pre-line">
                  {item.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
