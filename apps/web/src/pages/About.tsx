import ArtDecoPattern from '@/components/ArtDecoPattern';
import { Wine, Music, Sparkles, Star, Heart, Gem } from 'lucide-react';

const values = [
  {
    icon: Gem,
    title: 'Elegance',
    desc: 'Every detail is designed to provide a refined and memorable experience.',
  },
  {
    icon: Heart,
    title: 'Passion',
    desc: 'Our team puts their heart into creating unique moments.',
  },
  {
    icon: Star,
    title: 'Excellence',
    desc: 'Premium ingredients, impeccable service, an unparalleled atmosphere.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 font-sans relative overflow-x-hidden">
      {/* --- BACKGROUND BLOBS (Inchangés) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#070619] opacity-70 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#070619] opacity-50 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[800px] h-[800px] rounded-full bg-[#070619] opacity-60 blur-[180px]" />
      </div>

      {/* --- HERO SECTION (Strictement identique à votre original) --- */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070619]/50 to-black z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="font-sans text-[12px] tracking-[0.8em] uppercase text-primary mb-6 animate-pulse">
              Our History
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">About Us</h1>

          <p className="max-w-xl mx-auto text-white/50 text-sm md:text-base tracking-[0.2em] uppercase leading-relaxed font-light">
            Born from the vision of creating a space where Art Deco meets modernity, our lounge offers a timeless
            escape.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[#070619]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.5em] uppercase text-primary mb-4">Our Values</p>
            <h2 className="font-display text-4xl tracking-wide text-foreground mb-6">What Drives Us</h2>
            <div className="art-deco-line w-24 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <div
                key={i}
                className="group text-center p-10 md:p-8 lg:p-10 border border-border/50 hover:border-primary/30 transition-all duration-700 bg-card/30 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl tracking-wide text-foreground mb-4">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="font-body text-xs tracking-[0.5em] uppercase text-primary mb-4">Our Team</p>
          <h2 className="font-display text-4xl tracking-wide text-foreground mb-6">The Artisans</h2>
          <div className="art-deco-line w-24 mx-auto mb-10" />
          <p className="font-body text-muted-foreground leading-relaxed">
            Our team is composed of award-winning mixologists, pastry chefs, and passionate professionals who share a
            common goal: to provide you with the best. Each member brings their unique expertise to create the Iteros
            experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
