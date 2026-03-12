import { motion } from "framer-motion";
import ArtDecoPattern from "./ArtDecoPattern";


const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Background pattern */}

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px] animate-[pulse_12s_ease-in-out_infinite_2s]" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0D1F1E] via-60% to-[#23423E]" />
      <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-40" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-primary/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
    

        <motion.div
          className="art-deco-line w-40 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        <motion.p
          className="font-body text-[10px] md:text-xs tracking-[0.6em] uppercase text-primary/70 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Bahrain - Manama
        </motion.p>

        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] text-foreground text-glow mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          'terǝs
        </motion.h1>

        <motion.p
          className="font-display text-base md:text-lg tracking-[0.5em] uppercase text-primary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Lounge & Bar
        </motion.p>

        <motion.p
          className="font-body text-muted-foreground text-sm md:text-base tracking-wider max-w-md mx-auto mb-14 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          A unique sensory experience in a refined Art Deco setting
        </motion.p>

        <motion.div
          className="art-deco-line w-24 mx-auto mb-14"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        />

        <motion.a
          href="/booking"
          className="hidden md:inline-block font-body text-xs tracking-[0.3em] uppercase px-6 py-2.5 border border-white text-white hover:bg-white hover:text-primary-foreground transition-all duration-300 rounded-full"     
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(168 76% 46% / 0.3)" }}
        >
          Book a Table
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-5 h-8 border border-primary/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-primary/50 rounded-full mt-1.5"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
