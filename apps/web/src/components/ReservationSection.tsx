import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ReservationSection = () => {
  return (
    <section id="reservation" className="relative py-36 px-6 bg-card/20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[10px] tracking-[0.6em] uppercase text-primary/70 mb-5">Join Us</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide text-foreground mb-8">
            Book a Table
          </h2>
          <div className="art-deco-line w-32 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {[
              { icon: MapPin, title: 'Address', text: '42 Avenue des Champs-Élysées\n75008 Paris, France' },
              { icon: Clock, title: 'Hours', text: 'Tuesday – Saturday : 7pm – 3am\nSunday – Monday : Closed' },
              { icon: Phone, title: 'Contact', text: '+33 1 42 68 00 00\ncontact@iteros-lounge.fr' },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="w-12 h-12 border border-primary/20 group-hover:border-primary/40 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:shadow-[0_0_15px_hsl(168_76%_46%/0.1)]">
                  <info.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1 tracking-wide">{info.title}</h3>
                  <p className="font-body text-sm text-muted-foreground/70 whitespace-pre-line">{info.text}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-2.5 block">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-card/30 border border-border/40 focus:border-primary/50 px-5 py-3.5 font-body text-sm text-foreground outline-none transition-all duration-500 focus:shadow-[0_0_15px_hsl(168_76%_46%/0.1)]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-2.5 block">
                Date
              </label>
              <input
                type="date"
                className="w-full bg-card/30 border border-border/40 focus:border-primary/50 px-5 py-3.5 font-body text-sm text-foreground outline-none transition-all duration-500 focus:shadow-[0_0_15px_hsl(168_76%_46%/0.1)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-2.5 block">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full bg-card/30 border border-border/40 focus:border-primary/50 px-5 py-3.5 font-body text-sm text-foreground outline-none transition-all duration-500 focus:shadow-[0_0_15px_hsl(168_76%_46%/0.1)]"
                />
              </div>
              <div>
                <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-2.5 block">
                  Guests
                </label>
                <select className="w-full bg-card/30 border border-border/40 focus:border-primary/50 px-5 py-3.5 font-body text-sm text-foreground outline-none transition-all duration-500 focus:shadow-[0_0_15px_hsl(168_76%_46%/0.1)]">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full font-body text-[10px] tracking-[0.4em] uppercase px-8 py-5 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-700 mt-4"
              whileHover={{ boxShadow: '0 0 30px hsl(168 76% 46% / 0.25)' }}
            >
              Confirm Reservation
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
