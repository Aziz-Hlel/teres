import React, { useEffect, useState } from 'react';
import { Clock, Calendar, Star, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { EventResponse } from '@repo/contracts/schemas/events/eventResponse';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Axios } from '@/lib/axios';
// Types pour la structure des données
interface Event {
  desc: string;

  image: string;
  category: string;
}

const upcomingEvents: Event[] = [
  {
    category: 'LIVE MUSIC',
    desc: 'A gentle introduction. Live acoustic performance in a soft, dimmed atmosphere. 🎶',
    image: '/images/STERE.jpg',
  },
  {
    category: 'COCKTAILS',
    desc: 'Feminine elegance. An exclusive evening driven by our resident DJ and bold mixology creations. 🎧',

    image: '/images/Teres_Feb 2026_Friday 1.jpg',
  },
  {
    category: 'WORKSHOP',
    desc: 'Become the alchemist of your evenings. An exclusive immersion into the secrets of crafting our signature elixirs.',

    image: '/images/Teres_Feb 2026_Industry.jpg',
  },
  {
    category: 'ELECTRONIC',
    desc: 'Pure energy. Join Julian Mesa and our guests for an immersive and powerful electronic session. ⚡',

    image: '/images/Teres_Feb 2026_She by Teres_Post (2).jpg',
  },
  {
    category: 'CLUBBING',
    desc: 'A gathering for purists. A hypnotic sonic journey to celebrate the start of the weekend. 🎵',

    image: '/images/Teres_Feb 2026_Sip & Paint.jpg',
  },
  {
    category: 'PRESTIGE',
    desc: 'The pinnacle of the week. Vintage champagne, formal attire, and artistic performances beneath our gilded decor. 🥂',

    image: '/images/Teres_Nov 2025_Stereo DEC 25_Post_V1 (1).jpg',
  },
  {
    category: 'RELAX',
    desc: 'Finish the week in style with a selection of rare whiskies and a relaxing musical panorama.',

    image: '/images/Teres_Jan 2026_Shaken.jpg',
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null);

  useEffect(() => {
    Axios.get('/events/all')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 font-sans relative overflow-x-hidden">
      {/* --- BACKGROUND BLOBS (Inchangés) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#070619] opacity-70 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#070619] opacity-50 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[800px] h-[800px] rounded-full bg-[#070619] opacity-60 blur-[180px]" />
      </div>

      <div className="relative z-10">
        {/* --- HERO SECTION (Strictement identique à votre original) --- */}
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070619]/50 to-black z-10" />

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="h-[1px] w-8 bg-primary" />
              <span className="font-sans text-[10px] tracking-[0.8em] uppercase text-primary mb-6 animate-pulse">
                Weekly Experiences
              </span>
              <span className="h-[1px] w-8 bg-primary" />
            </div>

            <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">
              Exclusive Events
            </h1>

            <p className="max-w-xl mx-auto text-white/50 text-sm md:text-base tracking-[0.2em] uppercase leading-relaxed font-light">
              An exclusive curation of suspended moments, from dusk till dawn.
            </p>
          </div>
        </section>

        {/* --- GRID D'ÉVÉNEMENTS (Côte à côte) --- */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative bg-[#070619] overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 35,
                stretch: 0,
                depth: 160,
                modifier: 1,
                slideShadows: true,
              }}
              // Supprimé : pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              modules={[EffectCoverflow, Autoplay]} // Supprimé : Pagination
              className="!overflow-visible" // Retiré : pb-20 (plus besoin d'espace en bas)
            >
              {events.map((event, i) => (
                <SwiperSlide key={i} className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]">
                  <div
                    onClick={() => setSelectedEvent(event)}
                    className="group cursor-pointer relative bg-[#070619]/30 border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 shadow-2xl"
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={event.thumbnail.url}
                        className="object-cover w-full h-full transition-transform duration-[2s] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center">
                        <div className="p-4 rounded-full bg-white text-black scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                          <ArrowRight size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* --- CTA FOOTER (Inchangé) --- */}
        <section className="py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-black">
          <div className="container mx-auto px-6 text-center">
            <h4 className="text-2xl font-serif mb-8 text-white/80 italic">A particular request?</h4>
            <button className="px-12 py-5 bg-white text-black text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-primary hover:text-white transition-all duration-500">
              Privatize the Teres
            </button>
          </div>
        </section>
      </div>

      {/* --- POP-UP MODAL (Affiche la description au clic) --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Fond flou qui ferme au clic */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedEvent(null)}
          />

          <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
            {/* Bouton Fermer */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white z-50 p-2"
            >
              <X size={24} />
            </button>

            {/* Image dans le pop-up */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto">
              <img src={selectedEvent.thumbnail.url} className="w-full h-full object-cover" />
            </div>

            {/* Détails dans le pop-up */}
            <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
              <p className="text-white/60 leading-relaxed font-light mb-8">{selectedEvent.description}</p>

              <div className="flex items-center gap-6 mb-8 text-white/40">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-primary/60" />
                  <span className="text-[10px] uppercase tracking-widest">Reservation</span>
                </div>
              </div>

              <a
                href="/booking"
                className="w-full py-4 bg-white text-black text-center text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-primary hover:text-white transition-all duration-300"
              >
                Confirm Experience
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
