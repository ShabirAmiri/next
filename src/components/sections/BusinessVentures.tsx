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
  const wheelDelta = useRef(0);

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

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

      if (isScrolling) return;

      // Accumulate wheel delta with higher threshold
      wheelDelta.current += Math.abs(e.deltaY);

      // Only trigger after accumulating enough scroll (500 pixels for slower response)
      if (wheelDelta.current > 500) {
        isScrolling = true;
        wheelDelta.current = 0;

        if (e.deltaY > 0) {
          setActiveIndex((prev) => Math.min(prev + 1, ventures.length - 1));
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      wheelDelta.current = 0;
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

      if (Math.abs(diff) > 150 && !isScrolling) {
        isScrolling = true;

        e.preventDefault();

        if (diff > 0) {
          setActiveIndex((prev) => Math.min(prev + 1, ventures.length - 1));
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(scrollTimeout);
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
      {/* Slide Number in Top Right */}
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-20">
        <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] text-white/40 font-light font-['Inter']">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(ventures.length).padStart(2, "0")}
        </span>
      </div>

      {/* Section Title - Clean and minimal */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
        <h2 className="font-['Inter'] text-white/20 text-[8px] sm:text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">
          ENTERPRISES Test
        </h2>
      </div>

      {/* Elegant Line Navigation on Left Side */}
      <div className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
        {ventures.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative flex items-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Line indicator */}
            <div
              className={`w-0.5 transition-all duration-500 ${
                index === activeIndex
                  ? "bg-white h-6 sm:h-7 md:h-8"
                  : "bg-white/20 group-hover:bg-white/40 h-4 sm:h-5 md:h-6"
              }`}
            />

            {/* Number that appears on hover */}
            <span className="absolute left-full ml-2 sm:ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] sm:text-[10px] md:text-xs text-white/40 font-['Inter'] tracking-wider">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}

        {/* Small label at bottom */}
        <span className="text-[6px] sm:text-[7px] md:text-[8px] text-white/20 font-['Inter'] tracking-[0.3em] uppercase mt-1 sm:mt-2 rotate-90">
          EXPLORE
        </span>
      </div>

      {/* Arrow Buttons */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-20 hidden md:flex gap-2 sm:gap-3">
        <button
          onClick={prevSlide}
          disabled={activeIndex === 0}
          className={`w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
            activeIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-white/30 hover:bg-white/5"
          }`}
          aria-label="Previous slide"
        >
          <svg
            className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 text-white/60"
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
          className={`w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
            activeIndex === ventures.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-white/30 hover:bg-white/5"
          }`}
          aria-label="Next slide"
        >
          <svg
            className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 text-white/60"
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

      {/* Slides */}
      {ventures.map((venture, index) => (
        <VentureSlide
          key={venture.id}
          venture={venture}
          isActive={index === activeIndex}
          index={index}
        />
      ))}
    </section>
  );
}

interface VentureSlideProps {
  venture: (typeof ventures)[0];
  isActive: boolean;
  index: number;
}

function VentureSlide({ venture, isActive, index }: VentureSlideProps) {
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

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center justify-center h-full max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10 w-full max-w-xl lg:pr-4 xl:pr-8"
            >
              {/* Sector - Clean and minimal */}
              <div className="mb-2 sm:mb-3">
                <span
                  className="font-['Inter'] text-[10px] sm:text-xs tracking-[0.2em] uppercase block font-light"
                  style={{ color: venture.themeColor }}
                >
                  {venture.sector}
                </span>
                <span className="font-['Inter'] text-[8px] sm:text-[10px] text-white/30 tracking-wider uppercase">
                  Est. {venture.established}
                </span>
              </div>

              {/* Title - Clean and professional */}
              <h2 className="font-['Inter'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-2 sm:mb-3 md:mb-4 leading-tight font-light max-w-lg">
                {venture.title}
              </h2>

              {/* Description - Inter for readability */}
              <div className="mb-3 sm:mb-4">
                <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-white/70 leading-relaxed max-w-prose">
                  {venture.description}
                </p>
              </div>

              {/* Stats - Clean monospace */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <span className="font-['Inter'] text-[10px] sm:text-xs text-white/40 tracking-wide">
                  {venture.stats}
                </span>
              </div>

              {/* Learn More - Clean with arrow */}
              <div>
                <Link
                  href={`/ventures/${venture.id}`}
                  className="group inline-flex items-center gap-1 sm:gap-2 transition-colors duration-300"
                  style={{ color: venture.themeColor }}
                >
                  <span className="font-['Inter'] text-xs sm:text-sm tracking-wide">
                    Learn more
                  </span>
                  <span className="text-sm sm:text-base md:text-lg transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isActive
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <div className="absolute inset-0 rounded-lg border border-white/10 z-10" />

                <div className="absolute inset-[2px] rounded-lg overflow-hidden">
                  <Image
                    src={venture.image}
                    alt={venture.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                  />
                </div>

                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `linear-gradient(135deg, ${venture.themeColor} 0%, transparent 100%)`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
