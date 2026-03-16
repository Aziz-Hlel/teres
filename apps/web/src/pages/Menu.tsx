import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import ArtDecoPattern from '@/components/ArtDecoPattern';

const pages = [
  { type: 'fullImage', image: '/images/Teres_Mar 2026_Drinks Menu_page-0001.jpg', title: 'Couverture' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0002.jpg', title: 'Signature' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0003.jpg', title: "Éclat d'Or" },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0004.jpg', title: 'Pureté' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0005.jpg', title: 'Minuit' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0006.jpg', title: 'Héritage' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0007.jpg', title: 'Sérénité' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0008.jpg', title: 'Aube' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0009.jpg', title: 'Zénith' },
  { type: 'content', image: '/images/Teres_Mar 2026_Drinks Menu_page-0010.jpg', title: 'Final' },
];

const pageVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } },
  },
  exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.2 } }),
};

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage < 0 || newPage >= pages.length) return;
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
      setScale(1);
    },
    [currentPage],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
      if (e.key === 'ArrowRight') goToPage(currentPage + 1);
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, goToPage]);

  useEffect(() => {
    document.body.style.overflow = isZoomed ? 'hidden' : 'unset';
  }, [isZoomed]);

  const handleDragEnd = (info: PanInfo) => {
    if (scale > 1) return;
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) goToPage(currentPage + 1);
    else if (info.offset.x > swipeThreshold) goToPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-200 overflow-x-hidden font-serif">
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#070612]" />
        <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.12] scale-110" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">Menu</h1>
          <p className="font-sans text-[9px] tracking-[0.8em] uppercase text-[#45cfb6]">Collection 2026</p>
        </div>
      </section>

      <main className="relative w-full max-w-5xl mx-auto px-4 -mt-12 pb-24">
        <div className="relative flex justify-center items-center">
          {/* NAVIGATION DESKTOP : Hidden on Mobile */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between z-40 md:-inset-x-20 pointer-events-none">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className={`p-4 text-white/20 hover:text-[#45cfb6] pointer-events-auto transition-all ${currentPage === 0 ? 'opacity-0 invisible' : 'opacity-100'}`}
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              className={`p-4 text-white/20 hover:text-[#45cfb6] pointer-events-auto transition-all ${currentPage === pages.length - 1 ? 'opacity-0 invisible' : 'opacity-100'}`}
            >
              <ChevronRight size={48} />
            </button>
          </div>

          <div
            className="relative bg-[#111] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-sm touch-none"
            style={{ aspectRatio: '1 / 1.41', maxHeight: '65vh', width: '85%', maxWidth: '420px' }}
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
                onTap={() => setIsZoomed(true)}
                className="h-full w-full absolute inset-0 cursor-zoom-in bg-[#0c0c0c] p-1 z-20"
              >
                <img
                  src={pages[currentPage].image}
                  alt={pages[currentPage].title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <div className="text-[#45cfb6] font-sans tracking-[0.3em] text-[11px] font-bold">
            {currentPage + 1} <span className="text-white/20 mx-1">/</span> {pages.length}
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            {/* Header Lightbox */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-[1010]">
              <span className="text-[#45cfb6] text-[10px] tracking-[0.4em] uppercase font-bold">
                {pages[currentPage].title}
              </span>
              <button onClick={() => setIsZoomed(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={32} />
              </button>
            </div>

            {/* LIGHTBOX ARROWS : Hidden on Mobile (md:flex only) */}
            {scale === 1 && (
              <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 hidden md:flex justify-between z-[1011] pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPage(currentPage - 1);
                  }}
                  className={`p-4 text-white/30 hover:text-[#45cfb6] pointer-events-auto transition-all ${currentPage === 0 ? 'opacity-0 invisible' : 'opacity-100'}`}
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPage(currentPage + 1);
                  }}
                  className={`p-4 text-white/30 hover:text-[#45cfb6] pointer-events-auto transition-all ${currentPage === pages.length - 1 ? 'opacity-0 invisible' : 'opacity-100'}`}
                >
                  <ChevronRight size={48} />
                </button>
              </div>
            )}

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none p-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag={scale === 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (scale === 1 && info.offset.x < -50) goToPage(currentPage + 1);
                    if (scale === 1 && info.offset.x > 50) goToPage(currentPage - 1);
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    drag={scale > 1}
                    dragConstraints={{
                      left: -(scale - 1) * 200,
                      right: (scale - 1) * 200,
                      top: -(scale - 1) * 300,
                      bottom: (scale - 1) * 300,
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setScale(scale > 1 ? 1 : 2.5);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative cursor-move"
                  >
                    <img
                      src={pages[currentPage].image}
                      alt="Zoom"
                      draggable="false"
                      className="max-w-[92vw] max-h-[80vh] object-contain shadow-2xl rounded-sm"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-10 flex flex-col items-center gap-4 z-[1010]">
              <div className="flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setScale(Math.max(1, scale - 0.5));
                  }}
                  className="text-white/50 hover:text-[#45cfb6]"
                >
                  <ZoomOut size={22} />
                </button>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-24 md:w-40 h-1 accent-[#45cfb6] bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setScale(Math.min(4, scale + 0.5));
                  }}
                  className="text-white/50 hover:text-[#45cfb6]"
                >
                  <ZoomIn size={22} />
                </button>
              </div>
              <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase">
                {/* Texte adapté : On ne mentionne plus les flèches sur mobile */}
                <span className="md:inline hidden">Flèches ou </span>Swipe pour naviguer • Double-tap pour zoomer
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
