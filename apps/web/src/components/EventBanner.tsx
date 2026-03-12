import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  type: "image" | "video";
  src: string;         // Chemin vers l'image Desktop
  mobileSrc?: string;   // Chemin vers l'image Mobile
  title: string;
  subtitle: string;
  date: string;
  tag: string;
}

/**
 * Note : Placez vos images dans le dossier /public/assets/
 * pour pouvoir y accéder directement via des chemins "/assets/..."
 */
const slides: BannerSlide[] = [
  {
    type: "image",
    src: "/event1.jpg",
    mobileSrc: "/Teres_Jan 2026_Industry Monday.jpg",
    title: "DJ Night",
    subtitle: "Exclusive sets & signature cocktails in an electrifying atmosphere",
    date: "Every Friday",
    tag: "Program",
  },
  {
    type: "image",
    src: "/event2.jpg",
    mobileSrc: "/Teres_Jan 2026_Shaken.jpg",
    title: "Ladies Night",
    subtitle: "Exclusive cocktails for ladies — Chic & refined atmosphere",
    date: "Every Wednesday",
    tag: "Event",
  },
  {
    type: "image",
    src: "/event3.jpg",
    mobileSrc: "/Teres_Jan 2026_Stereo4_1.jpg",
    title: "Live Jazz",
    subtitle: "Live jazz evening — Pure elegance",
    date: "Every Saturday",
    tag: "Concert",
  },
];

const EventBanner = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[80vh] md:h-[85vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slide.type === "video" ? (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <picture className="w-full h-full">
              {slide.mobileSrc && (
                <source srcSet={slide.mobileSrc} media="(max-width: 768px)" />
              )}
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
            </picture>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20 md:bg-transparent" />

      {/* Contenu Texte */}
      <div className="absolute inset-0 flex items-end pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <span className="inline-block font-body text-[10px] tracking-[0.3em] uppercase text-primary border border-primary/40 px-3 py-1 mb-6">
                {slide.tag}
              </span>
              <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/70 mb-3">
                {slide.date}
              </p>
              <h2 className="font-display text-4xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-none">
                {slide.title}
              </h2>
              <p className="font-body text-sm md:text-base text-gray-300 max-w-lg leading-relaxed mb-4">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden md:block">
        <button
          onClick={prev}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-500 backdrop-blur-md z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-500 backdrop-blur-md z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-6 md:left-1/2 md:-translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="group py-2">
            <div
              className={`h-[2px] transition-all duration-500 ${
                i === current ? "w-12 bg-primary" : "w-6 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default EventBanner;