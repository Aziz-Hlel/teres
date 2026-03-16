import React, { useEffect, useState, useMemo } from 'react';
import { Clock, Calendar, Star, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Axios } from '@/lib/axios';
import { EventResponse } from '@repo/contracts/schemas/events/eventResponse';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const EventsPage = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);

  // 1. Fetch des données
  useEffect(() => {
    Axios.get('/events/all')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  // 2. Génération des 7 prochains jours
  const calendarDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
  }, []);

  // 3. Filtrage des événements (Calendrier)
  const filteredEvents = useMemo(() => {
    return events.filter((event) => event.type === 'WEEKLY');
    if (!filterDate) return events;
  }, [events, filterDate]);

  // 4. Sélection des événements exclusifs (ex: catégorie 'Exclusive' ou 3 derniers)
  const exclusiveEvents = useMemo(() => {
    return events.slice(0, 3); // Vous pouvez remplacer par .filter(e => e.category === 'Exclusive')
  }, [events]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 font-sans relative overflow-x-hidden">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#070619] opacity-70 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[800px] h-[800px] rounded-full bg-[#070619] opacity-60 blur-[180px]" />
      </div>

      <div className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
          <div className="relative z-20 text-center px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="font-sans text-[12px] tracking-[0.8em] uppercase text-primary">Weekly Experiences</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl tracking-wide text-foreground mb-6 text-glow">
              The Calendar
            </h1>
          </div>
        </section>

        {/* --- CALENDAR NAVIGATION --- */}
        <section className="py-12 bg-black/50 sticky top-0 z-40 backdrop-blur-md border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-nowrap md:justify-center gap-4 overflow-x-auto pb-4 no-scrollbar">
              <button
                onClick={() => setFilterDate(null)}
                className={`px-8 py-4 border transition-all duration-500 text-[10px] tracking-[0.3em] uppercase min-w-max ${
                  !filterDate
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-white/10 text-white/40 hover:border-white/30'
                }`}
              >
                All Events
              </button>

              {calendarDays.map((date) => {
                const dateISO = date.toISOString().split('T')[0];
                const isSelected = filterDate === dateISO;
                return (
                  <button
                    key={dateISO}
                    onClick={() => setFilterDate(dateISO)}
                    className={`flex flex-col items-center min-w-[80px] py-3 border transition-all duration-500 ${
                      isSelected ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[9px] text-white/40 uppercase mb-1">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className={`text-xl font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>
                      {date.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- MAIN EVENTS SWIPER --- */}
        <section className="py-20 px-4 relative bg-[#070619]">
          <div className="container mx-auto max-w-7xl">
            {filteredEvents.length > 0 ? (
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={filteredEvents.length > 2}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                modules={[EffectCoverflow, Autoplay]}
                className="!overflow-visible"
              >
                {filteredEvents.map((event) => (
                  <SwiperSlide key={event.id} className="w-[280px] sm:w-[350px] md:w-[450px]">
                    <div
                      onClick={() => setSelectedEvent(event)}
                      className="group cursor-pointer relative bg-black border border-white/5 overflow-hidden transition-all duration-700 hover:border-primary/50"
                    >
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <div className="absolute top-6 left-6 z-30 bg-black/80 backdrop-blur-md border border-white/10 p-3 text-center min-w-[60px]">
                          <span className="block text-primary text-[10px] font-bold uppercase tracking-tighter">
                            {new Date().toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className="block text-white text-2xl font-light">{event.day}</span>
                        </div>

                        <img
                          src={event.thumbnail.url}
                          className="object-cover w-full h-full transition-transform duration-[3s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2">{event.type}</p>
                          {/* <h3 className="text-2xl font-light tracking-wide">{event.title}</h3> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/10">
                <p className="text-white/30 uppercase tracking-[0.5em] text-sm italic">
                  No events scheduled for this date
                </p>
              </div>
            )}
          </div>
        </section>

        {/* --- NEW: EXCLUSIVE EVENTS GRID --- */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-primary text-[10px] tracking-[0.5em] uppercase mb-4">Signature Series</h2>
                <h3 className="text-4xl md:text-5xl font-light tracking-tight uppercase leading-tight">
                  Exclusive Events
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {exclusiveEvents.map((event, index) => (
                <div
                  key={`exclusive-${event.id}`}
                  onClick={() => setSelectedEvent(event)}
                  className="group relative h-[550px] overflow-hidden border border-white/5 bg-neutral-900/20 cursor-pointer"
                >
                  <img
                    src={event.thumbnail.url}
                    // alt={event.title}
                    className="absolute inset-0 w-full h-full group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4 flex items-center gap-2">
                      <Star size={12} className="text-primary fill-primary" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-primary">Limited Entry</span>
                    </div>
                    <h4 className="text-2xl font-light mb-4 group-hover:text-primary transition-colors">
                      {/* {event.title} */}
                    </h4>
                    <div className="h-[1px] w-full bg-white/10 mb-6 group-hover:bg-primary/50 transition-all duration-500" />

                    <button className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase group/btn">
                      Explore Experience
                      <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>

                  <span className="absolute top-8 right-8 text-white/5 font-bold text-6xl italic group-hover:text-primary/10 transition-colors">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA FOOTER --- */}
        <section className="py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-black">
          <div className="container mx-auto px-6 text-center">
            <h4 className="text-2xl font-serif mb-8 text-white/80 italic tracking-widest">Planning a private event?</h4>
            <button className="px-12 py-5 bg-white text-black text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-primary hover:text-white transition-all duration-500">
              Privatize Teres
            </button>
          </div>
        </section>
      </div>

      {/* --- MODAL --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedEvent(null)} />
          <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white z-50 transition-colors"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="w-full md:w-1/2 h-[40vh] md:h-auto">
              <img src={selectedEvent.thumbnail.url} className="w-full h-full object-cover" alt="Detail" />
            </div>

            <div className="p-8 md:p-16 w-full md:w-1/2 flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-4 text-primary text-[10px] tracking-[0.4em] uppercase">
                <Calendar size={14} />
                <span>{selectedEvent.day}</span>
              </div>

              {/* <h2 className="text-4xl font-light mb-6 tracking-tight">{selectedEvent.title}</h2> */}
              <p className="text-white/60 leading-relaxed font-light mb-10 text-lg">{selectedEvent.description}</p>

              <a
                href="/booking"
                className="w-full py-5 bg-primary text-black text-center text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white transition-all duration-500"
              >
                Book This Experience
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
