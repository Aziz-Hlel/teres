import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { InquirySubjectEnum } from '@repo/contracts/schemas/email/InquirySubjectEnum';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { SendContactUsRequest, sendContactUsRequestSchema } from '@repo/contracts/schemas/email/sendContactUsRequest';
import { Axios } from '@/lib/axios';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendContactUsRequest>({
    resolver: zodResolver(sendContactUsRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      inquirySubject: InquirySubjectEnum.OTHER,
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SendContactUsRequest) => {
      return Axios.post('/email/contact-us', data);
    },
  });

  const onSubmit = (data: SendContactUsRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 font-sans relative overflow-x-hidden">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#070619] opacity-70 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#070619] opacity-50 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[800px] h-[800px] rounded-full bg-[#070619] opacity-60 blur-[180px]" />
      </div>

      {/* HERO */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070619]/50 to-black z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="font-sans text-[12px] tracking-[0.8em] uppercase text-primary mb-6 animate-pulse">
              Concierge Services
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">Contact</h1>

          <p className="max-w-xl mx-auto text-white/50 text-sm md:text-base tracking-[0.2em] uppercase leading-relaxed font-light">
            "Excellence lies in the details. Entrust us with your most exclusive projects."
          </p>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display text-3xl text-white mb-8 tracking-tight">Contact Information</h2>

                <div className="space-y-8">
                  <ContactItem
                    Icon={MapPin}
                    title="L'Adresse"
                    content={
                      <>
                        42 Avenue des Champs-Élysées
                        <br />
                        75008 Paris, France
                      </>
                    }
                  />

                  <ContactItem
                    Icon={Clock}
                    title="Horaires"
                    content={
                      <>
                        Mardi – Samedi : 19h – 03h
                        <br />
                        Privatisation possible le Lundi
                      </>
                    }
                  />

                  <ContactItem Icon={Phone} title="Ligne Directe" content="+33 1 42 68 00 00" />
                  <ContactItem Icon={Mail} title="Email" content="contact@iteros-lounge.fr" />
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">Follow the Experience</p>

                <div className="flex gap-6">
                  <SocialLink href="#" Icon={Instagram} />
                  <SocialLink href="#" Icon={Facebook} />
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 p-8 md:p-12 backdrop-blur-sm relative">
              <div className="absolute -top-[1px] -left-[1px] w-12 h-[1px] bg-primary" />
              <div className="absolute -top-[1px] -left-[1px] w-[1px] h-12 bg-primary" />

              <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-8">
                  <CustomInput
                    label="Nom Complet"
                    placeholder="Jean Dupont"
                    register={register('name')}
                    error={errors.name?.message}
                    isTextArea={false}
                  />

                  <CustomInput
                    label="Adresse Email"
                    type="email"
                    placeholder="jean@excellence.com"
                    register={register('email')}
                    error={errors.email?.message}
                    isTextArea={false}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-widest uppercase text-primary">
                    Subject of your inquiry
                  </label>

                  <select
                    {...register('inquirySubject')}
                    className="w-full bg-transparent border-b border-white/10 py-4 font-body text-sm text-white focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-[#050505]" value={InquirySubjectEnum.TABLE_RESERVATION}>
                      {InquirySubjectEnum.TABLE_RESERVATION}
                    </option>
                    <option className="bg-[#050505]" value={InquirySubjectEnum.SPACE_PRIVATIZATION}>
                      {InquirySubjectEnum.SPACE_PRIVATIZATION}
                    </option>
                    <option className="bg-[#050505]" value={InquirySubjectEnum.PRESS_INQUIRY}>
                      {InquirySubjectEnum.PRESS_INQUIRY}
                    </option>
                    <option className="bg-[#050505]" value={InquirySubjectEnum.OTHER}>
                      {InquirySubjectEnum.OTHER}
                    </option>
                  </select>

                  {errors.inquirySubject && <p className="text-xs text-red-400">{errors.inquirySubject.message}</p>}
                </div>

                <CustomInput
                  label="Message"
                  isTextArea
                  placeholder="How can we elevate your evening?"
                  register={register('message')}
                  error={errors.message?.message}
                />

                <button
                  disabled={mutation.isPending}
                  className="group relative w-full overflow-hidden border border-primary/50 py-5 transition-all duration-500 hover:border-primary disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />

                  <span className="relative z-10 font-body text-xs tracking-[0.4em] uppercase text-primary group-hover:text-black transition-colors duration-500">
                    {mutation.isPending ? 'Sending...' : 'Send Request'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* Sub Components */

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

const CustomInput = ({ label, isTextArea, register, error, ...props }) => (
  <div className="space-y-2 group">
    <label className="font-body text-[10px] tracking-widest uppercase text-primary/60 group-focus-within:text-primary transition-colors">
      {label}
    </label>

    {isTextArea ? (
      <textarea
        rows={4}
        {...register}
        className="w-full bg-transparent border-b border-white/10 py-2 font-body text-sm text-white focus:border-primary outline-none transition-all resize-none"
        {...props}
      />
    ) : (
      <input
        {...register}
        className="w-full bg-transparent border-b border-white/10 py-2 font-body text-sm text-white focus:border-primary outline-none transition-all"
        {...props}
      />
    )}

    {error && <p className="pt-1 text-[11px] text-red-400 tracking-wide">{error}</p>}
  </div>
);

export default Contact;
