import HeroSection from "@/components/HeroSection";
import EventBanner from "@/components/EventBanner";
import ExperienceSection from "@/components/ExperienceSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ReservationSection from "@/components/ReservationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ExperienceSection />
        <EventBanner />
      <GallerySection />
    
    </div>
  );
};

export default Index;
