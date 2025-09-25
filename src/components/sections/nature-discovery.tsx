"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Calendar, Bike, Camera } from "lucide-react";

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
      "https://cdn.prod.website-files.com/67f8ad61468e1d34eea4f54a/68037bce48c26786c5f78a7c_event-cover--warsztaty-fotograficzne-1-16.webp",
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
];

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => (
  <a
    href={workshop.href}
    className="group relative flex flex-col justify-end rounded-xl overflow-hidden shadow-lg h-[500px] text-white p-6"
  >
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
      style={{ backgroundImage: `url(${workshop.imageUrl})` }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 bg-gradient-to-t from-[rgba(26,47,42,0.9)] via-[rgba(26,47,42,0.4)] to-transparent"
      aria-hidden="true"
    />

    <div className="absolute top-6 left-6">
      <span
        className={`inline-block text-xs font-medium py-1 px-3 rounded-full ${workshop.badgeColor} text-white`}
      >
        {workshop.badge}
      </span>
    </div>

    <div className="relative z-10 space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <Calendar className="w-4 h-4" />
        <span>{workshop.date}</span>
      </div>
      <h3 className="text-2xl font-medium leading-snug">
        {workshop.title}
        <br />
        {workshop.subtitle}
      </h3>
      <div className="mt-4 flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground uppercase text-sm font-medium py-4 px-6 rounded-lg transition-colors hover:bg-primary/90">
        {workshop.icon}
        <span>SPRAWDŹ SZCZEGÓŁY</span>
      </div>
    </div>
  </a>
);

const NatureDiscovery = () => (
  <section className="bg-secondary py-[120px]">
    <div className="container mx-auto">
      <div className="flex justify-between items-start mb-12">
        <h2 className="text-5xl font-light text-white leading-tight">
          Mój świat to natura
          <br />
          Odkryjmy ją w Dolinie Baryczy
        </h2>
        <div className="hidden lg:flex items-center gap-4">
          <button
            aria-label="Previous"
            className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-card hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            aria-label="Next"
            className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-card hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshopData.map((workshop) => (
          <WorkshopCard key={workshop.title + workshop.subtitle} workshop={workshop} />
        ))}
      </div>
    </div>
  </section>
);

export default NatureDiscovery;