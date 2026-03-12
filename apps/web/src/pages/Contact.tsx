import React from "react";
import ArtDecoPattern from "@/components/ArtDecoPattern";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const Contact = () => {
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
              <span className="h-[1px] w-8 bg-primary" />
              <span className="font-sans text-[10px] tracking-[0.8em] uppercase text-primary mb-6 animate-pulse">
Concierge Services
              </span>
              <span className="h-[1px] w-8 bg-primary" />
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">
              Contact
            </h1>
            
            <p className="max-w-xl mx-auto text-white/50 text-sm md:text-base tracking-[0.2em] uppercase leading-relaxed font-light">
            "Excellence lies in the details. Entrust us with your most exclusive projects."
            </p>
          </div>
        </section>

      <section className="relative py-24 md:py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            
            {/* Colonne Gauche: Informations (2/5) */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display text-3xl text-white mb-8 tracking-tight">Contact Information</h2>
                <div className="space-y-8">
                  <ContactItem 
                    Icon={MapPin} 
                    title="L'Adresse" 
                    content={<>42 Avenue des Champs-Élysées<br />75008 Paris, France</>} 
                  />
                  <ContactItem 
                    Icon={Clock} 
                    title="Horaires" 
                    content={<>Mardi – Samedi : 19h – 03h<br />Privatisation possible le Lundi</>} 
                  />
                  <ContactItem 
                    Icon={Phone} 
                    title="Ligne Directe" 
                    content="+33 1 42 68 00 00" 
                  />
                  <ContactItem 
                    Icon={Mail} 
                    title="Email" 
                    content="contact@iteros-lounge.fr" 
                  />
                </div>
              </div>

              {/* Socials - Design plus minimaliste */}
              <div className="pt-8 border-t border-white/5">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">Follow the Experience</p>
                <div className="flex gap-6">
                  <SocialLink href="#" Icon={Instagram} />
                  <SocialLink href="#" Icon={Facebook} />
                  <SocialLink href="#" Icon={() => (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.17 8.17 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z"/>
                    </svg>
                  )} />
                </div>
              </div>
            </div>

            {/* Colonne Droite: Formulaire (3/5) - Effet Verre Luxueux */}
            <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 p-8 md:p-12 backdrop-blur-sm relative">
              <div className="absolute -top-[1px] -left-[1px] w-12 h-[1px] bg-primary" />
              <div className="absolute -top-[1px] -left-[1px] w-[1px] h-12 bg-primary" />
              
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <CustomInput label="Nom Complet" placeholder="Jean Dupont" isTextArea={undefined} />
                  <CustomInput label="Adresse Email" type="email" placeholder="jean@excellence.com" isTextArea={undefined} />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-widest uppercase text-primary">Subject of your inquiry</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-4 font-body text-sm text-white focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option className="bg-[#050505]">Table Reservation</option>
                    <option className="bg-[#050505]">Space Privatization</option>
                    <option className="bg-[#050505]">Press Inquiry</option>
                    <option className="bg-[#050505]">Other</option>
                  </select>
                </div>
                <CustomInput label="Message" isTextArea placeholder="How can we elevate your evening?" />
                
                <button className="group relative w-full overflow-hidden border border-primary/50 py-5 transition-all duration-500 hover:border-primary">
                  <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-body text-xs tracking-[0.4em] uppercase text-primary group-hover:text-black transition-colors duration-500">
                    Send Request
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Intégration plus sobre */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5 p-1 bg-white/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.301431!3d48.871936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f41331%3A0xc3f848795906d24a!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Localisation Iteros Lounge"
          />
        </div>
      </section>
    </div>
  );
};

/* Sous-composants pour la propreté du code */

const ContactItem = ({ Icon, title, content }) => (
  <div className="flex gap-6 group">
    <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors duration-500">
      <Icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
    </div>
    <div>
      <h4 className="font-display text-sm uppercase tracking-wider text-white mb-2">{title}</h4>
      <div className="font-body text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
        {content}
      </div>
    </div>
  </div>
);

const SocialLink = ({ href, Icon }) => (
  <a href={href} className="text-slate-500 hover:text-primary transition-colors duration-300">
    <Icon className="w-5 h-5" />
  </a>
);

const CustomInput = ({ label, isTextArea, ...props }) => (
  <div className="space-y-2 group">
    <label className="font-body text-[10px] tracking-widest uppercase text-primary/60 group-focus-within:text-primary transition-colors">
      {label}
    </label>
    {isTextArea ? (
      <textarea 
        rows={4} 
        className="w-full bg-transparent border-b border-white/10 py-2 font-body text-sm text-white focus:border-primary outline-none transition-all resize-none"
        {...props}
      />
    ) : (
      <input 
        className="w-full bg-transparent border-b border-white/10 py-2 font-body text-sm text-white focus:border-primary outline-none transition-all"
        {...props}
      />
    )}
  </div>
);

export default Contact;