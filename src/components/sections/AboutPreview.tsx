"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

const aboutImage = "/images/hero/about1.png";

export default function AboutPreview() {
  const containerRef = useRef<HTMLElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative h-[50vh] flex items-center bg-black"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-16 items-center h-full"
        >
          {/* Left side - Clean circular image */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              {/* Simple border */}
              <div className="absolute inset-0 rounded-full border border-white/10" />

              {/* Image */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image
                  src={aboutImage}
                  alt="Mohammad Younass Mohmand"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
            </div>
          </motion.div>

          {/* Right side - Clean typography */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.3em] text-white/40 uppercase block"
            >
              About
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-white"
            >
              Mohammad Younass Mohmand
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 max-w-md"
            >
              <p className="text-base text-white/60 leading-relaxed">
                A visionary entrepreneur dedicated to building enterprises that
                create lasting value. Through strategic leadership and
                community-focused initiatives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/biography"
                className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors duration-300 group"
              >
                <span>Read biography</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
