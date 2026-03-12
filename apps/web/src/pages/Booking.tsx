import ArtDecoPattern from "@/components/ArtDecoPattern";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Optionnel mais recommandé pour le "Luxe"

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = "w-full bg-white/[0.03] border-b border-white/10 focus:border-primary/80 px-0 py-4 font-body text-sm text-foreground outline-none transition-all duration-500 placeholder:text-white/20 focus:bg-white/[0.05]";
  const labelStyle = "font-body text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-1 block";

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-light selection:bg-primary/30">
      
      {/* Hero Section - Plus immersive */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
        <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.15] scale-110" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)" />

        <div className="relative z-10 container mx-auto max-w-4xl text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1 border border-primary/30 rounded-full text-[9px] tracking-[0.5em] uppercase text-primary mb-8">
             Exclusive Experience
            </span>
            <h1 className="font-display text-6xl md:text-8xl tracking-tighter text-white mb-8">
              The Reserve
            </h1>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
            <p className="font-body text-sm md:text-base text-white/50 max-w-md mx-auto leading-relaxed tracking-wide">
              Secure your place in the exceptional.
              Each table is a promise of elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section - Épurée et Statutaire */}
      <section className="pb-32 px-6 -mt-20 relative z-20">
        <div className="container mx-auto max-w-2xl">
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/5 p-8 md:p-16 shadow-2xl">
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="mb-8 flex justify-center text-primary italic font-display text-4xl">
                    "See you soon"
                  </div>
                  <p className="font-body text-sm text-white/60 mb-12 max-w-xs mx-auto leading-loose">
                    Your request is in the hands of our maître.
                    A confirmation email will be sent to you.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="group relative overflow-hidden px-10 py-4 border border-white/10 text-[10px] tracking-[0.4em] uppercase transition-all"
                  >
                    <span className="relative z-10 group-hover:text-black transition-colors duration-500">Back</span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="group">
                      <label className={labelStyle}>First Name</label>
                      <input required type="text" className={inputStyle} placeholder="Alexandre" />
                    </div>
                    <div className="group">
                      <label className={labelStyle}>Last Name</label>
                      <input required type="text" className={inputStyle} placeholder="Varnier" />
                    </div>
                    <div className="group">
                      <label className={labelStyle}>Personal Email</label>
                      <input required type="email" className={inputStyle} placeholder="alexandre@luxe.fr" />
                    </div>
                    <div className="group">
                      <label className={labelStyle}>Phone Number</label>
                      <input type="tel" className={inputStyle} placeholder="+33 6 .." />
                    </div>
                    <div className="group">
                      <label className={labelStyle}>Preferred Date</label>
                      <input required type="date" className={inputStyle} />
                    </div>
                    <div className="group">
                      <label className={labelStyle}>Hour</label>
                      <input required type="time" className={inputStyle} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <label className={labelStyle}>Guests</label>
                      <select className={inputStyle}>
                        {[2, 4, 6, 8].map((n) => (
                          <option key={n} value={n} className="bg-[#050505]">{n} People</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelStyle}>Atmosphere</label>
                      <select className={inputStyle}>
                        <option className="bg-[#050505]">Standard Table</option>
                        <option className="bg-[#050505]">Private Lounge</option>
                        <option className="bg-[#050505]">Panoramic View</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className={labelStyle}>Particular Notes</label>
                    <textarea rows={1} className={`${inputStyle} resize-none`} placeholder="Allergies, table preferences..." />
                  </div>

                  <button
                    type="submit"
                    className="w-full relative group py-6 bg-primary text-primary-foreground font-body text-[11px] tracking-[0.5em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)]"
                  >
                    <span className="relative z-10">Confirm the Experience ✅</span>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;