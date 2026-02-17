"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ventures = [
  {
    id: 1,
    title: "Shadab Zafar Development Company",
    sector: "REAL ESTATE",
    established: "2002",
    image: "/images/ventures/real-estate.jpg",
    themeColor: "#f59e0b",
    description:
      "First private residential project in Kabul, pioneering urban development in Afghanistan. Established benchmark for modern real estate development and inspired subsequent urban development projects across the region.",
    stats: "15+ Projects · 2,500+ Families",
  },
  {
    id: 2,
    title: "Mohmand Hospital",
    sector: "HEALTHCARE",
    established: "2010",
    image: "/images/ventures/healthcare.jpg",
    themeColor: "#0ea5e9",
    description:
      "Started with 20 beds and grew into a 200-bed advanced healthcare facility providing comprehensive medical services with modern equipment. Committed to offering free healthcare for those in need, serving thousands of patients annually.",
    stats: "50,000+ Patients · 300+ Staff",
  },
  {
    id: 3,
    title: "Kandahar Fresh Produce Market & Cold Storage",
    sector: "AGRICULTURE",
    established: "2013",
    image: "/images/ventures/agriculture.jpg",
    themeColor: "#22c55e",
    description:
      "Revolutionizing Afghanistan's agricultural sector with advanced cold storage facilities and modern market infrastructure. Creating sustainable livelihoods while strengthening national food supply chains and reducing post-harvest losses.",
    stats: "5,000+ Farmers · 50K tons Capacity",
  },
  {
    id: 4,
    title: "Wazir Mohammad Gul Khan Mohmand High School",
    sector: "EDUCATION",
    established: "2010",
    image: "/images/ventures/education.jpg",
    themeColor: "#f97316",
    description:
      "Self-funded private school providing completely free, quality education to over 1,300 students. Offering modern educational facilities, qualified teachers, and opportunities for Afghanistan's future generations to excel academically and personally.",
    stats: "1,300+ Students · 800+ Graduates",
  },
  {
    id: 5,
    title: "Afghanistan Business and Investment Foundation",
    sector: "ECONOMIC DEVELOPMENT",
    established: "2025",
    image: "/images/ventures/economic.jpg",
    themeColor: "#a855f7",
    description:
      "Driving economic growth through entrepreneurship promotion, investor support, and business development initiatives. Creating an enabling environment for investments across multiple sectors to foster sustainable economic development in Afghanistan.",
    stats: "25+ Startups · $50M+ Investment",
  },
];

export default function BusinessVentures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= 0;

      if (!isInView) return;

      // Allow scroll up when at first slide
      if (activeIndex === 0 && e.deltaY < 0) {
        return; // Let browser handle - scroll to about section
      }

      // Allow scroll down when at last slide
      if (activeIndex === ventures.length - 1 && e.deltaY > 0) {
        return; // Let browser handle - scroll to next section
      }

      e.preventDefault();

      if (e.deltaY > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, ventures.length - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= 0;

      if (!isInView) return;

      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      // Allow scroll up when at first slide
      if (activeIndex === 0 && diff < 0) {
        return; // Let browser handle
      }

      // Allow scroll down when at last slide
      if (activeIndex === ventures.length - 1 && diff > 0) {
        return; // Let browser handle
      }

      if (Math.abs(diff) > 20) {
        e.preventDefault();

        if (diff > 0) {
          setActiveIndex((prev) => Math.min(prev + 1, ventures.length - 1));
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(prev + 1, ventures.length - 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section
      id="ventures"
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* Section Title */}
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/40 uppercase block mb-1 md:mb-2">
          Building Excellence
        </span>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white">
          Business Ventures
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-20 md:w-32 mx-auto mt-2 md:mt-3" />
      </div>

      {/* Clean Dot Navigation - Mobile & Desktop */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3">
        {ventures.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-white scale-125"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] md:text-xs text-white/60 whitespace-nowrap">
              {index + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Clean Arrow Buttons - Hidden on mobile, visible on desktop */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex gap-3">
        <button
          onClick={prevSlide}
          disabled={activeIndex === 0}
          className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
            activeIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-white/30 hover:bg-white/5"
          }`}
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          disabled={activeIndex === ventures.length - 1}
          className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
            activeIndex === ventures.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-white/30 hover:bg-white/5"
          }`}
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Slide Counter - Simplified for mobile */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden z-20">
        <span className="text-[10px] tracking-[0.2em] text-white/40">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(ventures.length).padStart(2, "0")}
        </span>
      </div>

      {/* Slides */}
      {ventures.map((venture, index) => (
        <VentureSlide
          key={venture.id}
          venture={venture}
          isActive={index === activeIndex}
        />
      ))}
    </section>
  );
}

interface VentureSlideProps {
  venture: (typeof ventures)[0];
  isActive: boolean;
}

function VentureSlide({ venture, isActive }: VentureSlideProps) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.05,
        filter: isActive ? "blur(0px)" : "blur(8px)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div className="relative h-full w-full overflow-hidden bg-black">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

        {/* Theme color glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${venture.themeColor} 0%, transparent 70%)`,
          }}
        />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full">
          <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto text-center md:text-left md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-center md:text-left md:max-w-none">
            {/* Left Content - Centered on mobile, left on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10 mb-8 md:mb-0"
            >
              <span
                className="text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 md:mb-3"
                style={{ color: venture.themeColor }}
              >
                {venture.sector} · Est. {venture.established}
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-3 md:mb-4 leading-tight">
                {venture.title}
              </h2>

              <div className="max-w-md mx-auto md:mx-0 mb-4 md:mb-6">
                <p className="text-xs sm:text-sm md:text-base text-white/60 leading-relaxed">
                  {venture.description}
                </p>
              </div>

              <div className="mb-4 md:mb-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono">
                  {venture.stats}
                </span>
              </div>

              <div>
                <Link
                  href={`/ventures/${venture.id}`}
                  className="inline-flex items-center text-xs md:text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                  style={{ color: venture.themeColor }}
                >
                  <span>Learn More</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Right Image - Below text on mobile, right on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isActive
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full max-w-sm mx-auto md:max-w-none h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 rounded-lg border border-white/10 z-10" />

              <div className="absolute inset-[2px] rounded-lg overflow-hidden">
                <Image
                  src={venture.image}
                  alt={venture.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 35vw"
                />
              </div>

              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(135deg, ${venture.themeColor} 0%, transparent 100%)`,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
