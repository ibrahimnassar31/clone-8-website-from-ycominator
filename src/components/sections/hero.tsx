
'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Video, Bike, Leaf } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const iconLinks = [
  { icon: Camera, href: "/dla-ciebie/warsztaty-fotograficzne", label: "Warsztaty fotograficzne" },
  { icon: Video, href: "/dla-ciebie/warsztaty-z-rolek", label: "Warsztaty z rolek / reels" },
  { icon: Bike, href: "/dla-ciebie/wycieczki-rowerowe", label: "Wycieczki rowerowe" },
  { icon: Leaf, href: "/dla-ciebie/spacery-przyrodnicze", label: "Spacery przyrodnicze" },
];

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const heading = headingRef.current;
      const text = heading.innerText;
      const words = text.split(' ');
      heading.innerHTML = words
        .map(word => `<span class="hero-word">${word}</span>`)
        .join(' ');
      const wordEls = heading.querySelectorAll('.hero-word');
      gsap.from(wordEls, {
        opacity: 0,
        y: 80,
        rotateX: -90,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (iconsRef.current) {
      gsap.from(iconsRef.current.children, {
        opacity: 0,
        y: 60,
        scale: 0.8,
        stagger: 0.12,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5,
      });
      Array.from(iconsRef.current.children).forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.15, rotate: 8, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
        });
      });
    }

    if (profileRef.current) {
      gsap.from(profileRef.current, {
        opacity: 0,
        y: 60,
        rotate: -180,
        scale: 0.7,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
      });
    }

    if (bioRef.current) {
      gsap.from(bioRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.1,
      });
    }
  }, []);

  return (
    <section className="bg-background relative text-text-primary">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="pt-[120px] pb-[160px]">
          <div className="h-hero-top">
            <h1
              ref={headingRef}
              className="font-hero text-[72px] leading-[1.1] font-light tracking-[-1px] text-text-primary"
            >
              Odkryj naturę<br />
              z nowej perspektywy
            </h1>
          </div>
          <div className="h-hero-bottom mt-20 flex flex-wrap justify-between items-center gap-8">
            <div ref={iconsRef} className="flex items-center gap-4">
              {iconLinks.map((item, index) => (
                <Link href={item.href} key={index} aria-label={item.label}>
                  <div className="w-[72px] h-[72px] bg-accent rounded-[20px] flex items-center justify-center transition-transform duration-300 ease-in-out">
                    <item.icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <Link href="/o-mnie" aria-label="Poznaj mnie">
                <div ref={profileRef} className="relative w-[100px] h-[100px] flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-chart-4"></div>
                  <div className="absolute inset-[3px] bg-background rounded-full flex items-center justify-center">
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/icons/67f914237c33779271c93a9f_jakub-wencek--circle-1.png?"
                      alt="Ilustracja Jakuba Wencka"
                      width={94}
                      height={94}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              </Link>
              <p
                ref={bioRef}
                className="font-body text-base text-text-secondary max-w-[400px]"
              >
                Nazywam się Jakub Wencek - jako leśnik i miłośnik
                fotografii uchwycam piękno przyrody, opowiadając jej
                niezwykłe historie poprzez zdjęcia i filmy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;