import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ArtDecoPattern from "@/components/ArtDecoPattern";

// --- Configuration des pages ---
// Note : Placez vos images dans public/assets/menu/
const pages = [
  { type: "fullImage", image: "/images/Teres_Mar 2026_Drinks Menu_page-0001.jpg", title: "Couverture" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0002.jpg", title: "Signature" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0003.jpg", title: "Éclat d'Or" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0004.jpg", title: "Pureté" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0005.jpg", title: "Minuit" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0006.jpg", title: "Héritage" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0007.jpg", title: "Sérénité" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0008.jpg", title: "Aube" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0009.jpg", title: "Zénith" },
  { type: "content", image: "/images/Teres_Mar 2026_Drinks Menu_page-0010.jpg", title: "Final" },
];

const pageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  }),
};

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Gestion du scroll body
  useEffect(() => {
    document.body.style.overflow = isZoomed ? "hidden" : "unset";
  }, [isZoomed]);

  const goToPage = useCallback((newPage: number) => {
    if (newPage < 0 || newPage >= pages.length) return;
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  }, [currentPage]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToPage(currentPage + 1);
      if (e.key === "ArrowLeft") goToPage(currentPage - 1);
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, goToPage]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) goToPage(currentPage + 1);
    else if (info.offset.x > swipeThreshold) goToPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-200 overflow-x-hidden font-serif">
      
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#070612]" />
        <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.12] scale-110" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl tracking-wide mb-6">Menu</h1>
          <p className="font-sans text-[10px] tracking-[0.8em] uppercase text-primary">2026 Collection</p>
        </div>
      </section>

      <main className="relative w-full max-w-5xl mx-auto px-4 -mt-20 pb-24">
        <div className="relative flex justify-center items-center">
          
          {/* Navigation Desktop (Menu Principal) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-40 px-2 md:-inset-x-20 pointer-events-none">
            <button 
              onClick={() => goToPage(currentPage - 1)} 
              className={`p-4 text-white/20 hover:text-primary pointer-events-auto transition-all ${currentPage === 0 ? "opacity-0 invisible" : "opacity-100"}`}
            >
              <ChevronLeft size={40} />
            </button>
            <button 
              onClick={() => goToPage(currentPage + 1)} 
              className={`p-4 text-white/20 hover:text-primary pointer-events-auto transition-all ${currentPage === pages.length - 1 ? "opacity-0 invisible" : "opacity-100"}`}
            >
              <ChevronRight size={40} />
            </button>
          </div>

          {/* Container Menu */}
          <div
            className="relative bg-[#111] border border-white/10 shadow-2xl overflow-hidden rounded-sm touch-none"
            style={{ aspectRatio: "1 / 1.41", maxHeight: "70vh", width: "100%", maxWidth: "480px" }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                onTap={() => setIsZoomed(true)}
                className="h-full w-full absolute inset-0 cursor-zoom-in bg-[#0c0c0c] p-1 z-20"
              >
                <img
                  src={pages[currentPage].image}
                  alt={pages[currentPage].title}
                  draggable="false"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="mt-12 text-center">
            <div className="text-primary tracking-widest text-xs uppercase">
                {currentPage + 1} / {pages.length}
            </div>
        </footer>
      </main>

      {/* --- Lightbox avec Swipe --- */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            {/* Header Lightbox */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-[1001]">
              <span className="text-primary text-xs tracking-[0.3em] uppercase">
                {pages[currentPage].title} — {currentPage + 1}/{pages.length}
              </span>
              <button className="text-white/50 hover:text-white transition-colors">
                <X size={32} />
              </button>
            </div>

            {/* Zone de contenu Lightbox */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
              
              {/* Navigation Desktop Lightbox */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-[1001] pointer-events-none hidden lg:flex">
                <button 
                  onClick={(e) => { e.stopPropagation(); goToPage(currentPage - 1); }} 
                  className={`p-4 text-white/10 hover:text-primary pointer-events-auto transition-all ${currentPage === 0 ? "invisible" : ""}`}
                >
                  <ChevronLeft size={60} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); goToPage(currentPage + 1); }} 
                  className={`p-4 text-white/10 hover:text-primary pointer-events-auto transition-all ${currentPage === pages.length - 1 ? "invisible" : ""}`}
                >
                  <ChevronRight size={60} />
                </button>
              </div>

              {/* Image avec Swipe */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(e, info) => {
                    const swipeThreshold = 50;
                    if (info.offset.x < -swipeThreshold) goToPage(currentPage + 1);
                    else if (info.offset.x > swipeThreshold) goToPage(currentPage - 1);
                  }}
                  src={pages[currentPage].image}
                  alt="Zoom"
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl cursor-grab active:cursor-grabbing"
                  onClick={(e) => e.stopPropagation()} 
                />
              </AnimatePresence>
            </div>

            {/* Message d'aide Mobile */}
            <div className="absolute bottom-8 text-white/20 text-[10px] uppercase tracking-widest font-sans lg:hidden">
              Swipe to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;