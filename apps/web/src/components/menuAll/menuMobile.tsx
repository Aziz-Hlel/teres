'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';

const ArtDecoPattern = ({ className }: { className?: string }) => (
  <div
    className={className}
    style={{ backgroundImage: 'radial-gradient(circle, #45cfb6 1px, transparent 1px)', backgroundSize: '20px 20px' }}
  />
);

const pages = [
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0001.jpg', title: 'Couverture' },
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0002.jpg', title: 'Signature' },
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0003.jpg', title: "Éclat d'Or" },
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0004.jpg', title: 'Pureté' },
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0005.jpg', title: 'Minuit' },
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0006.jpg', title: 'Héritage' },
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0007.jpg', title: 'Sérénité' },
  { image: '/images/Teres_Mar 2026_Drinks Menu_page-0008.jpg', title: 'Aube' },
];

const MenuAll = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);

  // Utilisation d'un état pour la position du drag afin de reset au changement de page
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setScale(1);
      setDragPos({ x: 0, y: 0 });
    }
  }, [isZoomed]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!isZoomed) return;
    const delta = e.deltaY * -0.005; // Sensibilité plus douce
    const newScale = Math.min(Math.max(1, scale + delta), 4);
    setScale(newScale);
    if (newScale === 1) setDragPos({ x: 0, y: 0 });
  };

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-200 overflow-x-hidden font-serif">
      <style>{`
        .menu-swiper { padding-top: 2rem; padding-bottom: 4rem !important; }
        .menu-swiper .swiper-slide { width: 300px; transition: filter 0.4s; }
        @media (min-width: 768px) { .menu-swiper .swiper-slide { width: 400px; } }
        .menu-swiper .swiper-slide:not(.swiper-slide-active) { filter: blur(2px) grayscale(50%); opacity: 0.6; }
        .swiper-pagination-bullet { background: #45cfb6 !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { opacity: 1; transform: scale(1.2); }
      `}</style>

      {/* Hero Header */}
      <section className="relative h-[25vh] flex flex-col items-center justify-center overflow-hidden">
        <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.08] scale-110" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-7xl tracking-[0.2em] text-white mb-3 mt-10 uppercase font-light">Menu</h1>
          <div className="flex items-center gap-4 justify-center">
            <div className="h-[1px] w-8 bg-[#45cfb6]/50" />
            <p className="font-sans text-[10px] tracking-[0.6em] uppercase text-[#45cfb6]">Collection 2026</p>
            <div className="h-[1px] w-8 bg-[#45cfb6]/50" />
          </div>
        </motion.div>
      </section>

      {/* Main Gallery */}
      <main className="relative w-full max-w-7xl mx-auto px-4 pb-20">
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={pages.map((page) => ({ src: page.image }))}
          plugins={[Zoom, Fullscreen]}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
          animation={{ fade: 300, swipe: 100 }}
        />
        <Swiper
          modules={[Pagination, Keyboard, Navigation, EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          speed={600}
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 200, modifier: 1, slideShadows: true }}
          pagination={{ clickable: true }}
          className="menu-swiper"
        >
          {pages.map((page, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ y: -10 }}
                className="relative bg-[#111] border border-white/5 shadow-2xl rounded-sm overflow-hidden cursor-zoom-in"
                style={{ aspectRatio: '1 / 1.41' }}
                onClick={() => {
                  setIndex(index);
                  setOpen(true);
                }}
              >
                <img src={page.image} alt={page.title} className="w-full h-full object-cover" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* Lightbox / Zoom Mode */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#050505]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
            onWheel={handleWheel}
          >
            {/* Header */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-[1010]">
              <div className="flex flex-col">
                <span className="text-[#45cfb6] text-[10px] tracking-[0.5em] uppercase font-bold">Teres Mar 2026</span>
                <span className="text-white/40 text-[9px] uppercase tracking-widest">{pages[currentPage].title}</span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="text-white/40 hover:text-white p-3 rounded-full bg-white/5"
              >
                <X size={24} />
              </button>
            </div>

            {/* Viewer */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <Swiper
                initialSlide={currentPage}
                slidesPerView={1}
                centeredSlides={true}
                allowTouchMove={scale === 1} // Important : permet de slider seulement si non zoomé
                onSlideChange={(swiper) => {
                  setCurrentPage(swiper.activeIndex);
                  setScale(1);
                  setDragPos({ x: 0, y: 0 });
                }}
                className="w-full h-full"
              >
                {pages.map((page, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center overflow-hidden">
                    <motion.div
                      drag={scale > 1}
                      // Calcul dynamique des limites pour permettre de voir toute l'image
                      dragConstraints={{
                        left: -500 * (scale - 1),
                        right: 500 * (scale - 1),
                        top: -500 * (scale - 1),
                        bottom: 500 * (scale - 1),
                      }}
                      dragElastic={0.1}
                      animate={{ scale: scale, x: dragPos.x, y: dragPos.y }}
                      onDoubleClick={() => {
                        if (scale > 1) {
                          setScale(1);
                          setDragPos({ x: 0, y: 0 });
                        } else {
                          setScale(2.5);
                        }
                      }}
                      className="relative flex items-center justify-center touch-none"
                    >
                      <img
                        src={page.image}
                        alt={page.title}
                        className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl pointer-events-none"
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 flex flex-col items-center gap-4 z-[1010] w-full px-6">
              <div className="flex items-center gap-6 bg-zinc-900/90 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                <button
                  onClick={() => setScale(Math.max(1, scale - 0.5))}
                  className="text-white/60 hover:text-[#45cfb6]"
                >
                  <ZoomOut size={20} />
                </button>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-24 md:w-40 accent-[#45cfb6] cursor-pointer"
                />
                <button
                  onClick={() => setScale(Math.min(4, scale + 0.5))}
                  className="text-white/60 hover:text-[#45cfb6]"
                >
                  <ZoomIn size={20} />
                </button>
                <div className="w-[1px] h-4 bg-white/10" />
                <button
                  onClick={() => {
                    setScale(1);
                    setDragPos({ x: 0, y: 0 });
                  }}
                  className={scale > 1 ? 'text-[#45cfb6]' : 'text-white/10'}
                >
                  <RotateCcw size={18} />
                </button>
              </div>
              <p className="text-white/30 text-[9px] tracking-widest uppercase">
                {scale > 1 ? 'Glissez pour explorer la page' : 'Pincez ou Double-cliquez pour zoomer'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuAll;
