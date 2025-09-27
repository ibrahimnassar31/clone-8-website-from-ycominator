"use client";

import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, Bike, Camera, Bird, Fish, Leaf } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Workshop {
  badge: string;
  badgeColor: string;
  date: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  icon: React.ReactElement;
  href: string;
}

const workshopData: Workshop[] = [
  {
    badge: "4 WOLNE MIEJSCA",
    badgeColor: "bg-[#A166FF]",
    date: "14 września 2025",
    title: "Spacer fotograficzny",
    subtitle: "(Dni Karpia)- woda i las",
    imageUrl:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/682dda15af4758219fb0432a_event-cover--spacer-fotograficzny-1-15.webp?",
    icon: <Bike className="h-5 w-5" />,
    href: "#",
  },
  {
    badge: "BRAK MIEJSC",
    badgeColor: "bg-[#7A7A7A]",
    date: "26-28 września 2025",
    title: "Warsztaty fotograficzne",
    subtitle: "(rykowisko)",
    imageUrl:
      "https://images.unsplash.com/photo-1600521605615-a8d3a23d8262?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <Camera className="h-5 w-5" />,
    href: "#",
  },
  {
    badge: "8 WOLNYCH MIEJSC",
    badgeColor: "bg-[#CBACFF]",
    date: "5 października 2025",
    title: "Spacer przyrodniczy",
    subtitle: "(Dni Karpia) - zmiany klimatu na przykładzie Doliny Baryczy",
    imageUrl:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/683072c9e045382e4a7533d1_event-cover--spacer-przyrodniczy-3-17.webp?",
    icon: <Bike className="h-5 w-5" />,
    href: "#",
  },
  // New workshops focused on animals and nature
  {
    badge: "6 WOLNYCH MIEJSC",
    badgeColor: "bg-[#4CAF50]",
    date: "12 października 2025",
    title: "Obserwacje ptaków",
    subtitle: "(Jesienne migracje w Dolinie Baryczy)",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb&fm=webp",
    icon: <Bird className="h-5 w-5" />,
    href: "#",
  },
{
  badge: "3 WOLNE MIEJSCA",
  badgeColor: "bg-[#2196F3]",
  date: "19 października 2025",
  title: "Spotkanie z wilkami",
  subtitle: "(Wyprawa w góry - obserwacja wilków w ich naturalnym środowisku)",
  imageUrl:
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  icon: <Fish className="h-5 w-5" />,
  href: "#",
},
{
  badge: "10 WOLNYCH MIEJSC",
  badgeColor: "bg-[#FF9800]",
  date: "2 listopada 2025",
  title: "Ptaki o świcie",
  subtitle: "(Poranna obserwacja ptaków w rezerwacie przyrody)",
  imageUrl:
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  icon: <Leaf className="h-5 w-5" />,
  href: "#",
},


];

interface WorkshopCardProps {
  workshop: Workshop;
  index: number;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, index }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !bgRef.current || !buttonRef.current) return;

    // Initial setup
    gsap.set(cardRef.current, { y: 50, opacity: 0 });
    gsap.set(bgRef.current, { scale: 1 });

    // ScrollTrigger entrance animation
    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Hover timeline
    const tl = gsap.timeline({ paused: true });
    tl.to(bgRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(
        cardRef.current,
        {
          y: -20,
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          duration: 0.4,
          ease: "power3.out",
        },
        0
      )
      .fromTo(
        buttonRef.current,
        {
          scale: 1,
          backgroundColor: "#3b82f6",
        },
        {
          scale: 1.05,
          backgroundColor: "#2563eb",
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0.2
      );

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    cardRef.current.addEventListener("mouseenter", handleMouseEnter);
    cardRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cardRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, [workshop, index]);

  return (
    <a
      ref={cardRef}
      href={workshop.href}
      className="group relative flex flex-col justify-end rounded-xl overflow-hidden shadow-lg h-[500px] text-white p-6 bg-gradient-to-t from-black/80 to-transparent hover:shadow-2xl transition-all duration-300"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${workshop.imageUrl})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[rgba(26,47,42,0.95)] via-[rgba(26,47,42,0.6)] to-transparent"
        aria-hidden="true"
      />

      <div className="absolute top-6 left-6 z-10">
        <span
          className={`inline-block text-xs font-medium py-1 px-3 rounded-full ${workshop.badgeColor} text-white shadow-lg`}
        >
          {workshop.badge}
        </span>
      </div>

      <div className="relative z-10 space-y-4 flex-1 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <Calendar className="w-4 h-4" />
          <span>{workshop.date}</span>
        </div>
        <h3 className="text-2xl font-medium leading-snug text-white">
          {workshop.title}
          <br />
          <span className="text-gray-300">{workshop.subtitle}</span>
        </h3>
        <div className="mt-4 flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white uppercase text-sm font-medium py-4 px-6 rounded-lg transition-all duration-300">
          <span className="flex items-center gap-2">
            {workshop.icon}
            <span>SPRAWDŹ SZCZEGÓŁY</span>
          </span>
        </div>
      </div>
    </a>
  );
};

const NatureDiscovery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navPrevRef = useRef<HTMLButtonElement>(null);
  const navNextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Section entrance
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
      },
    });

    // Navigation buttons hover
    [navPrevRef.current, navNextRef.current].forEach((btn) => {
      if (!btn) return;

      const tl = gsap.timeline({ paused: true });
      tl.to(btn, {
        scale: 1.1,
        boxShadow: "0 8px 25px rgba(255,255,255,0.2)",
        duration: 0.3,
        ease: "power2.out",
      });

      btn.addEventListener("mouseenter", () => tl.play());
      btn.addEventListener("mouseleave", () => tl.reverse());
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-secondary py-[120px] relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/10 to-purple-900/20" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex justify-between items-start mb-12">
          <h2 className="text-5xl lg:text-6xl font-light text-white leading-tight">
            Mój świat to natura
            <br />
            Odkryjmy ją w Dolinie Baryczy
          </h2>
          <div className="hidden lg:flex items-center gap-4">
            <button
              ref={navPrevRef}
              aria-label="Previous"
              className="w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              ref={navNextRef}
              aria-label="Next"
              className="w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {workshopData.map((workshop, index) => (
            <WorkshopCard key={`${workshop.title}-${workshop.date}`} workshop={workshop} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NatureDiscovery;