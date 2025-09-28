"use client";

import Image from "next/image";
import { TreePine, Camera, Sprout } from "lucide-react";
import type { ComponentType, CSSProperties, MouseEvent } from "react";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Tilt3D({
  children,
  className,
  intensity = 12, 
  glare = true,
  aggressive = true, 
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  aggressive?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<CSSProperties>({ opacity: 0 });
  const [isHover, setIsHover] = useState(false);
  const rAF = useRef<number | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // [-1, 1]
    const py = (y / rect.height) * 2 - 1;

    const max = intensity;
    const rotX = -(py * max);
    const rotY = px * max;

    const zBoost = aggressive ? 40 : 20;
    const scale = aggressive ? 1.035 : 1.015;

    const next: CSSProperties = {
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${zBoost}px) scale(${scale})`,
    };

    if (glare) {
      const angle = Math.atan2(py, px) * (180 / Math.PI);
      const dist = Math.sqrt(px * px + py * py);
      setGlareStyle({
        opacity: Math.min(0.4, dist + 0.05),
        background: `radial-gradient(400px 400px at ${x}px ${y}px, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)`,
        transform: `rotate(${angle}deg)`,
      });
    }

    if (rAF.current) cancelAnimationFrame(rAF.current);
    rAF.current = requestAnimationFrame(() => setStyle(next));
  };

  const handleEnter = () => {
    setIsHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
    });
    setGlareStyle({ opacity: 0 });
  };

  useEffect(() => {
    return () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, []);

  if (prefersReduced) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`
        relative ${className ?? ""} group
        will-change-transform
        transition-transform duration-200 ease-out
      `}
      style={style}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(99,102,241,0.35) 50%, rgba(249,115,22,0.35))",
          filter: "blur(8px)",
        }}
      />
      {glare && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-150`}
          style={{
            mixBlendMode: "screen",
            opacity: isHover ? glareStyle.opacity : 0,
            background: isHover ? glareStyle.background : undefined,
          }}
        />
      )}

      <div
        className={`
          relative rounded-2xl bg-card border border-border overflow-hidden
          backdrop-blur-sm
          transition-[box-shadow,transform] duration-300
          ${isHover ? "shadow-[0_30px_80px_rgba(0,0,0,0.35)]" : "shadow-none"}
        `}
        style={{
          transform: isHover ? "translateZ(1px)" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface Testimonial {
  icon: ComponentType<{ className?: string }>;
  text: string;
  author: string;
  role: string;
}

const testimonialsData: Testimonial[] = [
  {
    icon: TreePine,
    text:
      "Uwielbiam spacery z Kubą. Byłam już kilkukrotnie i na pewno jeszcze skorzystam. Kuba świetnie i rzeczowo przekazuje wiedzę i ciekawostki fotograficzne...",
    author: "Agnieszka Możdżerz",
    role: "Uczestniczka leśnego spaceru przyrodniczego",
  },
  {
    icon: Camera,
    text:
      "Serdecznie polecam warsztaty fotograficzne u Kuby! Jest to wyjątkowa okazja na spotkanie się z osobami o podobnych pasjach...",
    author: "Iza B.",
    role: "Uczestniczka leśnego spaceru fotograficznego",
  },
  {
    icon: Sprout,
    text:
      "Uczestniczyliśmy już w trzech spacerach - dwóch turystycznych i jednym fotograficznym. Wszystko jest super zorganizowane...",
    author: "Ola i Tomek",
    role: "Uczestnicy leśnego spaceru przyrodniczego",
  },
];

const TestimonialCard = ({ icon: Icon, text, author, role }: Testimonial) => (
  <div className="rounded-2xl p-8 h-full flex flex-col">
    <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center mb-6 shrink-0 ring-1 ring-primary/40">
      <Icon className="w-6 h-6 text-primary-foreground" />
    </div>
    <p className="text-secondary-foreground leading-relaxed mb-6 flex-grow">{text}</p>
    <div className="border-t border-border pt-4">
      <p className="font-medium text-foreground">{author}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </div>
);


export default function TestimonialsSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (cardsRef.current.length) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        stagger: 0.18,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0]?.parentElement?.parentElement,
          start: "top 80%",
          once: true,
        },
      });
    }
  }, []);

  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) cardsRef.current[idx] = el;
  };

  return (
    <section className="bg-background py-[120px]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="font-heading text-5xl font-normal text-foreground mb-12">
            Spacery, warsztaty i wycieczki
            <br />
            w oczach uczestników
          </h2>
          <figure>
            <blockquote className="text-3xl lg:text-4xl font-light italic text-secondary-foreground leading-snug">
              “Każdy ma tak świat, jaki potrzebuje. I widzi go oczyma potrzebników”
            </blockquote>
            <figcaption className="mt-6 text-muted-foreground text-base">— José Saramago</figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="flex flex-col gap-6 h-full">
            <div ref={el => setCardRef(el, 0)}>
              <Tilt3D className="rounded-2xl">
                <TestimonialCard {...testimonialsData[0]} />
              </Tilt3D>
            </div>
            <div ref={el => setCardRef(el, 1)}>
              <Tilt3D className="rounded-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Malowniczy las o wschodzie słońca"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Tilt3D>
            </div>
            <div ref={el => setCardRef(el, 2)}>
              <Tilt3D className="rounded-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Dzika natura w lesie"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Tilt3D>
            </div>
          </div>

          <div className="flex flex-col gap-6 h-full">
            <div ref={el => setCardRef(el, 3)}>
              <Tilt3D className="rounded-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Górski krajobraz"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Tilt3D>
            </div>
            <div ref={el => setCardRef(el, 4)}>
              <Tilt3D className="rounded-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Zielona dolina"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Tilt3D>
            </div>
            <div ref={el => setCardRef(el, 5)}>
              <Tilt3D className="rounded-2xl">
                <TestimonialCard {...testimonialsData[1]} />
              </Tilt3D>
            </div>
          </div>

          <div className="flex flex-col gap-6 h-full">
            <div ref={el => setCardRef(el, 6)}>
              <Tilt3D className="rounded-2xl">
                <TestimonialCard {...testimonialsData[2]} />
              </Tilt3D>
            </div>
            <div ref={el => setCardRef(el, 7)}>
              <Tilt3D className="rounded-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Stado jeleni w porannym świetle"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Tilt3D>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
