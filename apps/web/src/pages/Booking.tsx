import ArtDecoPattern from '@/components/ArtDecoPattern';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Axios } from '@/lib/axios';
import { BookingRequest, bookingRequestSchema } from '@repo/contracts/schemas/email/bookingRequest';

/* ─────────────────────────────────────────────
   Wine‑Box Lid SVG (purely decorative)
───────────────────────────────────────────── */
const WineBoxLid = () => (
  <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
    {/* wood grain lines */}
    {[10, 20, 30, 40, 50, 60, 70].map((y) => (
      <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,210,100,0.07)" strokeWidth="1" />
    ))}
    {/* border */}
    <rect x="1" y="1" width="318" height="78" rx="2" stroke="rgba(255,210,100,0.25)" strokeWidth="1.5" fill="none" />
    {/* inner border */}
    <rect x="8" y="8" width="304" height="64" rx="1" stroke="rgba(255,210,100,0.12)" strokeWidth="1" fill="none" />
    {/* center crest */}
    <text
      x="160"
      y="36"
      textAnchor="middle"
      fontSize="12"
      letterSpacing="6"
      fill="rgba(255,210,100,0.5)"
      fontFamily="serif"
      fontStyle="italic"
    >
      THE RESERVE
    </text>
    <line x1="60" y1="42" x2="260" y2="42" stroke="rgba(255,210,100,0.2)" strokeWidth="0.5" />

    {/* corner ornaments */}
    {[
      [16, 16],
      [304, 16],
      [16, 64],
      [304, 64],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill="rgba(255,210,100,0.3)" />
    ))}
  </svg>
);

/* ─────────────────────────────────────────────
   Wine‑Bottle SVG
───────────────────────────────────────────── */
const WineBottle = () => (
  <svg viewBox="0 0 60 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-32 mx-auto">
    {/* neck */}
    <rect x="24" y="5" width="12" height="35" rx="4" fill="rgba(80,40,20,0.9)" />
    {/* capsule */}
    <rect x="23" y="5" width="14" height="10" rx="3" fill="rgba(180,30,30,0.8)" />
    {/* cork */}
    <rect x="27" y="3" width="6" height="5" rx="1" fill="rgba(210,170,100,0.9)" />
    {/* body */}
    <path
      d="M18 38 Q12 50 12 80 L12 130 Q12 145 30 145 Q48 145 48 130 L48 80 Q48 50 42 38 Z"
      fill="rgba(60,30,10,0.95)"
    />
    {/* label */}
    <rect
      x="16"
      y="75"
      width="28"
      height="42"
      rx="2"
      fill="rgba(240,225,180,0.15)"
      stroke="rgba(255,210,100,0.3)"
      strokeWidth="0.5"
    />
    <text
      x="30"
      y="92"
      textAnchor="middle"
      fontSize="4"
      fill="rgba(255,210,100,0.6)"
      fontFamily="serif"
      letterSpacing="1"
    >
      THE
    </text>
    <text
      x="30"
      y="101"
      textAnchor="middle"
      fontSize="5"
      fill="rgba(255,210,100,0.8)"
      fontFamily="serif"
      fontStyle="italic"
    >
      Reserve
    </text>
    <line x1="18" y1="106" x2="42" y2="106" stroke="rgba(255,210,100,0.2)" strokeWidth="0.5" />
    <text
      x="30"
      y="113"
      textAnchor="middle"
      fontSize="3.5"
      fill="rgba(255,210,100,0.4)"
      fontFamily="serif"
      letterSpacing="1"
    >
      2026
    </text>
    {/* shine */}
    <path d="M20 50 Q18 80 18 110" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const Booking = () => {
  const [phase, setPhase] = useState<'box' | 'opening' | 'form'>('box');
  const [submitted, setSubmitted] = useState(false);

  const handleOpenBox = () => {
    setPhase('opening');
    setTimeout(() => setPhase('form'), 1400);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingRequest>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      atmosphere: 'Standard Table',
      notes: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingRequest) => Axios.post('/email/booking', data),
    onSuccess: () => setSubmitted(true),
  });

  const onSubmit = (data: BookingRequest) => mutation.mutate(data);

  const inputStyle =
    'w-full bg-transparent border-b border-white/10 focus:border-primary/80 px-0 py-2 font-body text-xs text-foreground outline-none transition-all duration-500 placeholder:text-white/15';
  const labelStyle = 'font-body text-[9px] tracking-[0.3em] uppercase text-primary/50 mb-0.5 block';
  const errorStyle = 'text-[11px] text-red-400 pt-1';

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-light selection:bg-primary/30 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* ── PHASE: BOX ── */}
        {(phase === 'box' || phase === 'opening') && (
          <motion.div
            key="box-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 flex items-center justify-center"
          >
            {/* subtle ambient bg */}
            <div className="absolute inset-0 bg-gradient-radial from-[#1a0a00] via-[#0a0500] to-[#050505]" />
            <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.08]" />

            {/* faint vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* ── THE BOX ── */}
              <motion.div
                className="relative cursor-pointer select-none"
                onClick={phase === 'box' ? handleOpenBox : undefined}
                whileHover={phase === 'box' ? { scale: 1.015 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* glow under box */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-8 bg-primary/20 blur-2xl rounded-full" />

                {/* box body */}
                <motion.div
                  className="relative w-80 overflow-hidden shadow-2xl"
                  style={{
                    background: 'linear-gradient(160deg, #2a1500 0%, #1a0d00 40%, #0f0700 100%)',
                    border: '1px solid rgba(255,180,60,0.15)',
                    borderRadius: '3px',
                  }}
                >
                  {/* wood grain texture overlay */}
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
                    }}
                  />

                  {/* LID — rotates open */}
                  <motion.div
                    className="relative z-20 w-full"
                    style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                    animate={
                      phase === 'opening' ? { rotateX: -130, y: -10, opacity: 0.2 } : { rotateX: 0, y: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <div className="py-4 px-4">
                      <WineBoxLid />
                    </div>
                    {/* lid bottom edge shadow */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  </motion.div>

                  {/* BOX INTERIOR — bottles appear when opening */}
                  <motion.div
                    className="px-6 pb-8 pt-4 flex items-end justify-center gap-4"
                    animate={phase === 'opening' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {/* tissue paper shred decoration */}
                    <div className="absolute top-[80px] inset-x-0 h-8 overflow-hidden pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-6 w-8 opacity-20"
                          style={{
                            left: `${i * 9}%`,
                            top: `${Math.sin(i) * 4}px`,
                            background: 'rgba(255,210,100,0.4)',
                            borderRadius: '1px',
                            transform: `rotate(${(i % 3) * 8 - 8}deg)`,
                          }}
                        />
                      ))}
                    </div>

                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 0 }}
                        animate={phase === 'opening' ? { y: [-4, 0, -2, 0][i] ?? 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                      >
                        <WineBottle />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA row — only in idle state */}
                  <AnimatePresence>
                    {phase === 'box' && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="px-8 pb-8 text-center"
                      >
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />
                        <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/50 mb-3">
                          Open to Reserve
                        </p>
                        <motion.div
                          className="w-4 h-4 border border-primary/40 rounded-full mx-auto flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* label beneath box */}
              {phase === 'box' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-10 font-body text-[10px] tracking-[0.5em] uppercase text-white/20"
                >
                  Click to unveil your experience
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* ── PHASE: FORM ── */}
        {phase === 'form' && (
          <motion.div
            key="form-scene"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
          >
            {/* HERO */}
            <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
              <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.15] scale-110" />

              <div className="relative z-10 container mx-auto max-w-4xl text-center px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                  <span className="inline-block px-3 sm:px-4 py-1 border border-primary/30 rounded-full text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-primary mb-5 sm:mb-8">
                    Exclusive Experience
                  </span>
                  <h1 className="font-display text-3xl sm:text-5xl md:text-6xl tracking-wide text-foreground mb-4 sm:mb-6 text-glow">
                    The Reserve
                  </h1>
                  <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-5 sm:mb-8" />
                  <p className="font-body text-xs sm:text-sm md:text-base text-white/50 max-w-xs sm:max-w-md mx-auto leading-relaxed tracking-wide px-2">
                    Secure your place in the exceptional. Each table is a promise of elegance.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* FORM */}
            <section className="pb-16 sm:pb-32 px-4 sm:px-6 -mt-10 sm:-mt-20 relative z-20">
              <div className="container mx-auto max-w-2xl">
                <div className="backdrop-blur-xl bg-white/[0.02] border border-white/5 p-5 sm:p-8 md:p-16 shadow-2xl">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 sm:py-12"
                      >
                        <div className="mb-6 sm:mb-8 flex justify-center text-primary italic font-display text-3xl sm:text-4xl">
                          "See you soon"
                        </div>
                        <p className="font-body text-sm text-white/60 mb-10 sm:mb-12 max-w-xs mx-auto leading-loose">
                          Your request is in the hands of our maître. A confirmation email will be sent to you.
                        </p>
                        <button
                          onClick={() => {
                            setSubmitted(false);
                            setPhase('box');
                          }}
                          className="group relative overflow-hidden px-8 sm:px-10 py-4 border border-white/10 text-[10px] tracking-[0.4em] uppercase transition-all"
                        >
                          Back
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 sm:space-y-8"
                      >
                        {/* Name row — side by side even on mobile (short fields) */}
                        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-6 sm:gap-y-8">
                          <div>
                            <label className={labelStyle}>First Name</label>
                            <input {...register('firstName')} className={inputStyle} placeholder="Alexandre" />
                            {errors.firstName && <p className={errorStyle}>{errors.firstName.message}</p>}
                          </div>
                          <div>
                            <label className={labelStyle}>Last Name</label>
                            <input {...register('lastName')} className={inputStyle} placeholder="Varnier" />
                            {errors.lastName && <p className={errorStyle}>{errors.lastName.message}</p>}
                          </div>
                        </div>

                        {/* Email & Phone — stacked on mobile, 2-col on md */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8">
                          <div>
                            <label className={labelStyle}>Personal Email</label>
                            <input
                              {...register('email')}
                              type="email"
                              className={inputStyle}
                              placeholder="alexandre@luxe.fr"
                            />
                            {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
                          </div>
                          <div>
                            <label className={labelStyle}>Phone Number</label>
                            <input {...register('phone')} type="tel" className={inputStyle} placeholder="+33 6 .." />
                            {errors.phone && <p className={errorStyle}>{errors.phone.message}</p>}
                          </div>
                        </div>

                        {/* Date & Time — side by side on all screens */}
                        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-6 sm:gap-y-8">
                          <div>
                            <label className={labelStyle}>Preferred Date</label>
                            <input {...register('date')} type="date" className={`${inputStyle} text-xs sm:text-sm`} />
                            {errors.date && <p className={errorStyle}>{errors.date.message}</p>}
                          </div>
                          <div>
                            <label className={labelStyle}>Hour</label>
                            <input {...register('time')} type="time" className={`${inputStyle} text-xs sm:text-sm`} />
                            {errors.time && <p className={errorStyle}>{errors.time.message}</p>}
                          </div>
                        </div>

                        {/* Guests & Atmosphere — side by side on all screens */}
                        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12">
                          <div>
                            <label className={labelStyle}>Guests</label>
                            <select {...register('guests')} className={inputStyle}>
                              {['2', '4', '6', '8'].map((n) => (
                                <option key={n} value={n} className="bg-[#050505]">
                                  {n} People
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelStyle}>Atmosphere</label>
                            <select {...register('atmosphere')} className={`${inputStyle} text-xs sm:text-sm`}>
                              <option className="bg-[#050505]">Standard Table</option>
                              <option className="bg-[#050505]">Private Lounge</option>
                              <option className="bg-[#050505]">Panoramic View</option>
                            </select>
                          </div>
                        </div>

                        {/* Notes — full width */}
                        <div>
                          <label className={labelStyle}>Particular Notes</label>
                          <textarea
                            {...register('notes')}
                            rows={2}
                            className={`${inputStyle} resize-none`}
                            placeholder="Allergies, table preferences..."
                          />
                          {errors.notes && <p className={errorStyle}>{errors.notes.message}</p>}
                        </div>

                        <button
                          type="submit"
                          disabled={mutation.isPending}
                          className="w-full relative group py-5 sm:py-6 bg-primary text-primary-foreground font-body text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.5em] uppercase overflow-hidden transition-all duration-500 disabled:opacity-50"
                        >
                          {mutation.isPending ? 'Submitting...' : 'Confirm the Experience ✅'}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking;
