import ArtDecoPattern from '@/components/ArtDecoPattern';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Axios } from '@/lib/axios';
import { BookingRequest, bookingRequestSchema } from '@repo/contracts/schemas/email/bookingRequest';

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);

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
    mutationFn: async (data: BookingRequest) => {
      return Axios.post('/email/booking', data);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const onSubmit = (data: BookingRequest) => {
    mutation.mutate(data);
  };

  const inputStyle =
    'w-full bg-white/[0.03] border-b border-white/10 focus:border-primary/80 px-0 py-4 font-body text-sm text-foreground outline-none transition-all duration-500 placeholder:text-white/20 focus:bg-white/[0.05]';

  const labelStyle = 'font-body text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-1 block';

  const errorStyle = 'text-[11px] text-red-400 pt-1';

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-light selection:bg-primary/30">
      {/* HERO (unchanged) */}

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
        <ArtDecoPattern className="absolute inset-0 w-full h-full opacity-[0.15] scale-110" />

        <div className="relative z-10 container mx-auto max-w-4xl text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="inline-block px-4 py-1 border border-primary/30 rounded-full text-[9px] tracking-[0.5em] uppercase text-primary mb-8">
              Exclusive Experience
            </span>

            <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">
              The Reserve
            </h1>

            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />

            <p className="font-body text-sm md:text-base text-white/50 max-w-md mx-auto leading-relaxed tracking-wide">
              Secure your place in the exceptional. Each table is a promise of elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORM */}

      <section className="pb-32 px-6 -mt-20 relative z-20">
        <div className="container mx-auto max-w-2xl">
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/5 p-8 md:p-16 shadow-2xl">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <div className="mb-8 flex justify-center text-primary italic font-display text-4xl">
                    "See you soon"
                  </div>

                  <p className="font-body text-sm text-white/60 mb-12 max-w-xs mx-auto leading-loose">
                    Your request is in the hands of our maître. A confirmation email will be sent to you.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="group relative overflow-hidden px-10 py-4 border border-white/10 text-[10px] tracking-[0.4em] uppercase transition-all"
                  >
                    Back
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
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

                    <div>
                      <label className={labelStyle}>Preferred Date</label>
                      <input {...register('date')} type="date" className={inputStyle} />
                      {errors.date && <p className={errorStyle}>{errors.date.message}</p>}
                    </div>

                    <div>
                      <label className={labelStyle}>Hour</label>
                      <input {...register('time')} type="time" className={inputStyle} />
                      {errors.time && <p className={errorStyle}>{errors.time.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                      <select {...register('atmosphere')} className={inputStyle}>
                        <option className="bg-[#050505]">Standard Table</option>
                        <option className="bg-[#050505]">Private Lounge</option>
                        <option className="bg-[#050505]">Panoramic View</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>Particular Notes</label>
                    <textarea
                      {...register('notes')}
                      rows={1}
                      className={`${inputStyle} resize-none`}
                      placeholder="Allergies, table preferences..."
                    />
                    {errors.notes && <p className={errorStyle}>{errors.notes.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full relative group py-6 bg-primary text-primary-foreground font-body text-[11px] tracking-[0.5em] uppercase overflow-hidden transition-all duration-500 disabled:opacity-50"
                  >
                    {mutation.isPending ? 'Submitting...' : 'Confirm the Experience ✅'}
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
