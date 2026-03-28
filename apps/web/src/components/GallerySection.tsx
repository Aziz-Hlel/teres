import { motion } from 'framer-motion';
import ArtDecoPattern from './ArtDecoPattern';

// Structure de données enrichie avec des images
const galleryItems = [
  { title: 'Dimmed Atmosphere', img: '/galler1.jpg' },
  { title: 'Starlit Terrace', img: '/galler6.jpg' },
  { title: 'Black Marble Bar', img: '/galler2.jpg' },
  { title: 'Emerald Velvet', img: '/galler3.webp' },
  { title: 'Art DDeco Chandeliers', img: '/galler4.jpg' },
  { title: 'VIP Space', img: '/galler5.jpg' },
];

const GallerySection = () => {
  return (
    <section id="galerie" className="relative py-36 px-6 overflow-hidden bg-[#070619]">
      {/* Background & Patterns */}
      <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" />
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[10px] tracking-[0.6em] uppercase text-primary/70 mb-4">Atmosphere</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide text-white mb-8">Our World</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Image avec zoom au hover */}
              <motion.img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />

              {/* Overlay Gradient (Toujours visible pour le contraste, s'intensifie au hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

              {/* Contenu textuel et éléments de design */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                {/* Petit losange décoratif */}
                <div className="w-8 h-8 mb-4 border border-primary/40 rotate-45 flex items-center justify-center transition-all duration-700 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                  <div className="w-1.5 h-1.5 bg-primary/40 group-hover:bg-primary transition-colors" />
                </div>

                <p className="font-display text-lg tracking-widest text-white/90 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </p>

                {/* Ligne qui apparaît au hover */}
                <div className="w-0 group-hover:w-12 h-[1px] bg-primary mt-4 transition-all duration-700" />
              </div>

              {/* Bordure intérieure stylisée (effet cadre photo) */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
