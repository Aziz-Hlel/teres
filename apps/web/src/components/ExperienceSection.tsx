import { Wine, Music, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    icon: Wine,
    title: "Exceptional Cocktails",
    description: "Our mixologists create unique elixirs from rare ingredients and premium spirits.",
  },
  {
    icon: Music,
    title: "Sound Atmosphere",
    description: "Refined DJ sets and live performances in an intimate and captivating atmosphere.",
  },
  {
    icon: Sparkles,
    title: "VIP Service",
    description: "Private spaces, personalized service, and impeccable attention to detail.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-36 px-6 bg-[#070619]">
      
      {/* Subtle decorative elements */}

      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[10px] tracking-[0.6em] uppercase text-primary/70 mb-5">
            Discover
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide text-foreground mb-8">
            The Iteros Experience
          </h2>
          <div className="art-deco-line w-32 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="group text-center p-10 md:p-8 lg:p-10 border border-border/50 hover:border-primary/30 transition-all duration-700 bg-card/30 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-8 border border-primary/20 group-hover:border-primary/50 flex items-center justify-center transition-all duration-700 group-hover:shadow-[0_0_20px_hsl(168_76%_46%/0.15)]">
                  <exp.icon className="w-7 h-7 text-primary/70 group-hover:text-primary transition-colors duration-500" />
                </div>
                <h3 className="font-display text-xl tracking-wider text-foreground mb-5">
                  {exp.title}
                </h3>
                <div className="art-deco-line w-10 mx-auto mb-5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
