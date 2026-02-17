"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import ScrollButton from "@/components/layout/ScrollButton";

const heroImage = "/images/hero/hero-main2.png";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background moves at half speed (50% slower than normal scroll)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Text moves at normal speed (100%)
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image - slower scroll */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Mohammad Younass Mohmand"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 mix-blend-multiply" />
      </motion.div>

      {/* Text content - normal scroll speed */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="text-center z-10 px-4"
      >
        {/* Decorative line above */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 0.8 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"
        />

        <motion.h1
          className="first-line"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          Mohammad Younass Mohmand
        </motion.h1>

        <motion.p
          className="subtitle mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          Entrepreneur | Nation Builder | Community Leader
        </motion.p>

        {/* Decorative line below */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ delay: 1.1, duration: 1.2, ease: "easeOut" }}
          className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-48 mx-auto mt-8"
        />
      </motion.div>

      <ScrollButton targetId="about" />
    </section>
  );
}
