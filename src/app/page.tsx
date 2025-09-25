import Navigation from '@/components/sections/navigation';
import CookieBanner from '@/components/sections/cookie-banner';
import Hero from '@/components/sections/hero';
import HeroVideo from '@/components/sections/hero-video';
import FloatingGallery from '@/components/sections/floating-gallery';
import NatureDiscovery from '@/components/sections/nature-discovery';
import TestimonialsSection from '@/components/sections/testimonials';
import NatureBeautySection from '@/components/sections/nature-beauty';
import AwardsSection from '@/components/sections/awards';
import AwardImageSection from '@/components/sections/award-image';
import FooterGallery from '@/components/sections/footer-gallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A2F2A]">
      <Navigation />
      <CookieBanner />
      
      <div className="relative">
        <Hero />
        <HeroVideo />
        <FloatingGallery />
        <NatureDiscovery />
        <TestimonialsSection />
        <NatureBeautySection />
        <AwardsSection />
        <AwardImageSection />
        <FooterGallery />
      </div>
    </main>
  );
}