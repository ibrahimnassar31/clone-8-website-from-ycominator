"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  speed: number;
}

const imageAssets = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a119362e543c2508032e2_jakub-wencek-2-4.webp",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a1193d74be1f71b8a26f4_jakub-wencek-8-6.webp",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a1193aaf97a9a3c5d2a86_jakub-wencek-1-11.webp",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a11936a9b5a3846735d88_jakub-wencek-6-9.webp",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a1193aaf97a9a3c5d2a7e_jakub-wencek-10-5.webp",
];

const FloatingGallery: React.FC = () => {
  const imagesData: ImageData[] = useMemo(
    () => [
      {
        src: imageAssets[0],
        alt: "Jeleń leżący na trawie w słońcu",
        width: 460,
        height: 306,
        position: { top: "8vh", left: "8vw" },
        speed: 0.12,
      },
      {
        src: imageAssets[1],
        alt: "Zbliżenie na ważkę siedzącą na liściu paproci",
        width: 370,
        height: 463,
        position: { top: "18vh", right: "12vw" },
        speed: 0.18,
      },
      {
        src: imageAssets[2],
        alt: "Stado koni we mgle o wschodzie słońca",
        width: 500,
        height: 333,
        position: { top: "60vh", left: "4vw" },
        speed: -0.12,
      },
      {
        src: imageAssets[3],
        alt: "Słońce prześwitujące przez pnie drzew w lesie",
        width: 320,
        height: 480,
        position: { top: "75vh", right: "8vw" },
        speed: 0.10,
      },
      {
        src: imageAssets[4],
        alt: "Jeleń stojący w lesie w promieniach słońca",
        width: 340,
        height: 510,
        position: { top: "110vh", left: "calc(50% - 170px)" },
        speed: -0.08,
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const floatAnims = useRef<Array<gsap.core.Animation | null>>([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((el, index) => {
        if (!el) return;

        // Initial setup with enhanced styling
        gsap.set(el, {
          opacity: 0,
          scale: 0.9,
          y: index % 2 === 0 ? 100 : -100, // Alternate initial direction
          transformOrigin: "center center",
          willChange: "transform, opacity, box-shadow",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        });

        if (!prefersReducedMotion) {
          // Scroll-driven timeline
          const floatDistance = 400; // Increased for more dramatic movement
          const extraParallax = imagesData[index].speed * 250;
          const totalY = (index % 2 === 0 ? -1 : 1) * (floatDistance + Math.abs(extraParallax));

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=15%",
              end: "top top+=15%",
              scrub: 0.8,
              toggleActions: "play pause resume pause",
            },
          });

          // Smooth reveal and float
          tl.to(el, {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 0.25,
          })
            .to(
              el,
              {
                y: totalY,
                ease: "none",
                duration: 1,
              },
              0
            )
            .to(
              el,
              {
                opacity: 0.2,
                scale: 0.94,
                ease: "none",
                duration: 0.3,
              },
              0.7
            );

          // Continuous bidirectional floating
          const jitterX = 10 + Math.random() * 12; // 10~22px
          const jitterY = 8 + Math.random() * 10;  // 8~18px
          const jitterDur = 3 + Math.random() * 2; // 3~5s
          const floatDirection = index % 2 === 0 ? 1 : -1;

          floatAnims.current[index] = gsap.to(el, {
            x: `+=${(Math.random() > 0.5 ? 1 : -1) * jitterX}`,
            y: `+=${floatDirection * jitterY}`,
            duration: jitterDur,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          // Hover effects
          const handleMouseEnter = () => {
            gsap.to(el, {
              scale: 1.05,
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              duration: 0.4,
              ease: "power3.out",
            });
            floatAnims.current[index]?.pause();
          };

          const handleMouseLeave = () => {
            gsap.to(el, {
              scale: 1,
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              duration: 0.4,
              ease: "power3.out",
            });
            floatAnims.current[index]?.play();
          };

          el.addEventListener("mouseenter", handleMouseEnter);
          el.addEventListener("mouseleave", handleMouseLeave);

          cleanups.push(() => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mouseleave", handleMouseLeave);
          });

          tl.eventCallback("onStart", () => { floatAnims.current[index]?.play(); });
          tl.eventCallback("onReverseComplete", () => { floatAnims.current[index]?.pause(); });
        } else {
          // Reduced motion: static reveal
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });

      // Enhanced background parallax
      if (sectionRef.current && !prefersReducedMotion) {
        gsap.to(sectionRef.current, {
          backgroundPosition: "50% 120%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      cleanups.forEach(clean => clean());
    };
  }, [imagesData]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0f1f1b] h-[240vh] overflow-hidden"
      aria-label="Galeria zdjęć przyrodniczych"
    >
      {/* Enhanced layered background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background: `
            radial-gradient(800px 400px at 20% 15%, rgba(255,255,255,0.1), transparent 60%),
            radial-gradient(600px 300px at 80% 85%, rgba(64,224,208,0.05), transparent 70%)
          `,
        }}
      />
      {imagesData.map((img, index) => (
        <div
          key={img.src}
          ref={(el) => { imageRefs.current[index] = el; }}
          className="absolute rounded-2xl overflow-hidden border border-[#2a3a36]/50 backdrop-blur-sm transition-all duration-300"
          style={{
            ...img.position,
            width: `${img.width}px`,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="w-full h-auto object-cover pointer-events-none select-none"
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </section>
  );
};

export default FloatingGallery;