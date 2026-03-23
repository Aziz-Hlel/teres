import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import ArtDecoPattern from '@/components/ArtDecoPattern';
import FoodV2 from '@/components/foodV2/FoodV2';

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

const Menu2 = () => {
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
    <div className="h-screen   text-zinc-200 overflow-x-hidden font-serif bg-[#070612]">
      <section className="relative h-[25dvh] flex items-center justify-center overflow-hidden ">
        <div className="absolute inset-0 bg-[#070612]" />
        <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.12] scale-110" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">Menu</h1>
          <p className="font-sans text-[9px] tracking-[0.8em] uppercase text-[#45cfb6]">Collection 2026</p>
        </div>
      </section>

      <main className="relative w-full h-[75dvh]  mx-auto    pb-24 overflow-hidden">
        <div className="relative w-full flex justify-center items-center overflow-hidden">
          <div className="absolute inset-0 bg-[#070612] overflow-hidden" />
          <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.12] scale-110" />

          <FoodV2 />
        </div>
      </main>
    </div>
  );
};

export default Menu2;
