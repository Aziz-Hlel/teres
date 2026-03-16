import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#000000] via-[#0D1F1E] via-60% to-[#23423E] pt-28 pb-12 px-6 overflow-hidden">
      {/* 1. ÉLÉMENT DE LUXE : Le Halo Lumineux */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center mb-24">
          {/* COL GAUCHE : Navigation Minimaliste */}
          <div className="hidden md:flex flex-col gap-4 text-[15px] tracking-[0.3em] uppercase text-muted-foreground/40 font-light">
            <a href="#concept" className="hover:text-primary transition-colors duration-500">
              The Concept
            </a>
            <a href="#menu" className="hover:text-primary transition-colors duration-500">
              Menu & Cocktails
            </a>
            <a href="#privatisation" className="hover:text-primary transition-colors duration-500">
              Private Booking
            </a>
          </div>

          {/* COL CENTRE : Identité Signature */}
          <div className="flex flex-col items-center">
            <div className="relative mb-8 group cursor-default">
              <img
                src="/logo ter.png"
                alt="'terǝs Logo"
                className="h-16 md:h-20 w-auto opacity-90 transition-all duration-1000 hover:opacity-100 object-contain"
              />
              {/* Ligne de soulignement animée */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary/50 transition-all duration-1000 group-hover:w-full" />
            </div>
            <p className="text-[11px] tracking-[0.6em] uppercase text-primary/70 font-medium ml-[0.6em]">
              Lounge & Bar — Bahrain
            </p>
          </div>

          {/* COL DROITE : Contact & Réservation */}
          <div className="flex flex-col md:items-end gap-4 text-[15px] tracking-[0.3em] uppercase text-muted-foreground/40 font-light">
            <p className="text-white/60">Manama</p>
            <p>bahrain</p>
            <a href="tel:+33100000000" className="hover:text-primary transition-colors">
              01 23 45 67 89
            </a>
          </div>
        </div>

        {/* SECTION RÉSEAUX AVEC EFFET "GOLDEN GLOW" */}
        <div className="flex justify-center gap-12 mb-20">
          <SocialLink href="#" icon={<Instagram size={20} />} />
          <SocialLink href="#" icon={<TikTokIcon />} />
          <SocialLink href="#" icon={<Facebook size={20} />} />
        </div>

        {/* FOOTER BAR : Copyright & Mentions */}
        <div className="pt-10 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/20">
            © 2026 ITEROS. Excellence & Volupté.
          </span>
          <div className="flex gap-8 text-[9px] tracking-[0.2em] uppercase text-muted-foreground/40">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Composant Social avec animation de survol Premium
const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    className="relative group p-4 border border-white/[0.05] rounded-full transition-all duration-500 hover:border-primary/40 hover:bg-primary/[0.02]"
  >
    <div className="text-muted-foreground/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    {/* Petit point lumineux au survol */}
    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-opacity duration-500" />
  </a>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.17 8.17 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
  </svg>
);

export default Footer;
