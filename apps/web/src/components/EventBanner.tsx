import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface BannerSlide {
  type: 'image' | 'video';
  src: string;
  mobileSrc?: string;
  title: string;
  subtitle: string;
  date: string;
  tag: string;
}

const slides: BannerSlide[] = [
  {
    type: 'image',
    src: '/images/Teres_Feb 2026_Industry.jpg',
    mobileSrc: '/images/friday.jpg',
    title: 'Ladies Night',
    subtitle: 'Exclusive cocktails for ladies — Chic & refined atmosphere',
    date: 'Every Wednesday',
    tag: 'Event',
  },
  {
    type: 'video',
    src: '/video/EL FUEGO.mp4',
    mobileSrc: '/images/friday.jpg',
    title: 'DJ Night',
    subtitle: 'Exclusive sets & signature cocktails in an electrifying atmosphere',
    date: 'Every Friday',
    tag: 'Program',
  },
  {
    type: 'image',
    src: '/images/friday.jpg',
    mobileSrc: '/images/friday.jpg',
    title: 'Live Jazz',
    subtitle: 'Live jazz evening — Pure elegance',
    date: 'Every Saturday',
    tag: 'Concert',
  },
  {
    type: 'video',
    src: '/video/Sip.mp4',
    mobileSrc: '/images/friday.jpg',
    title: 'Live Jazz',
    subtitle: 'Live jazz evening — Pure elegance',
    date: 'Every Saturday',
    tag: 'Concert',
  },
  {
    type: 'image',
    src: '/images/Teres_Jan 2026_Shaken.jpg',
    mobileSrc: '/images/friday.jpg',
    title: 'Live Jazz',
    subtitle: 'Live jazz evening — Pure elegance',
    date: 'Every Saturday',
    tag: 'Concert',
  },
];

const EventBanner = () => {
  return (
    <section className="relative w-full py-16 bg-black overflow-hidden">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        speed={600}
        spaceBetween={24}
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 150,
          modifier: 1, // ← clé du problème : 2 → 1
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!w-[320px] md:!w-[420px] aspect-[9/14] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500"
          >
            <div className="absolute inset-0 w-full h-full">
              {slide.type === 'video' ? (
                <video src={slide.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <picture>
                  {slide.mobileSrc && <source srcSet={slide.mobileSrc} media="(max-width: 768px)" />}
                  <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
                </picture>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 z-10">
              <div className="mb-6">
                <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 bg-black/20 backdrop-blur-sm">
                  {slide.tag}
                </span>
              </div>

              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/60 mb-2 font-light">
                {slide.date}
              </p>

              <h2 className="font-serif text-4xl md:text-5xl text-white mb-3 tracking-tight leading-[1.1]">
                {slide.title}
              </h2>

              <p className="text-sm md:text-base text-gray-300 max-w-[280px] leading-relaxed font-light italic">
                {slide.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default EventBanner;
