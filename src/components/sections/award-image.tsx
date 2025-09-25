"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AwardImageSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!heroWrapRef.current || !sectionRef.current) return;

    gsap.set(heroWrapRef.current, { transformOrigin: "center center" });

    if (!prefersReducedMotion) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",      
          end: "bottom top+=100",
          scrub: true,           
        },
      });

      tl.to(heroWrapRef.current, { scale: 0.70, ease: "none" }, 0)  
        .to(heroWrapRef.current, { y: 30, ease: "none" }, 0);      
    } else {
      gsap.set(heroWrapRef.current, { scale: 1, y: 0 });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-secondary text-primary-foreground">
      <div className="container pt-20 md:pt-[120px] pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <div className="w-[87px] h-[111px] border-8 border-chart-4" />
            <p className="text-sm text-text-secondary hidden md:block">
              Kategoria: Europa z powietrza
            </p>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-[40px] font-light leading-tight text-text-primary">
              Moje zdjęcie “Wieloryb i kruk”
              <br />
              zajęło I miejsce w Wielkim
              <br />
              Konkursie Fotograficznym
              <br />
              National Geographic
            </h3>
            <p className="text-sm text-text-secondary md:hidden mt-6">
              Kategoria: Europa z powietrza
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div
          ref={heroWrapRef}
          className="
            relative w-full overflow-hidden
            h-[70vh] md:h-screen
            will-change-transform
          "
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85"
            alt="Zdjęcie z drona przedstawiające wieloryba z lodu i ptaka na tle białego lodu i śniegu."
            fill
            priority
            sizes="100vw"
            className="object-cover select-none"
          />
        </div>
      </div>
    </section>
  );
};

export default AwardImageSection;
