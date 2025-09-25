"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bike,
  Briefcase,
  Camera,
  Clapperboard,
  Menu,
  Megaphone,
  Music,
  Pause,
  Play,
  Trees,
  UserCheck,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const JakubWencekLogo = () => (
  <svg
    width="170"
    height="24"
    viewBox="0 0 200.7 27.9"
    fill="currentColor"
    aria-label="Jakub Wencek"
  >
    <path d="M67.1,20.1c0,3.6-2.5,6.3-6.6,6.3c-4.1,0-6.6-2.7-6.6-6.3V6.8h4.5v13.3c0,2,1,3.4,2.2,3.4c1.2,0,2.2-1.4,2.2-3.4V6.8h4.5V20.1z M5.5,26.1V6.8h11.4v3.6H10v3h6.4v3.5H10v5.5h7.4v3.6H5.5z M29.1,26.1h-4.5L20,17.4l-4.5,8.7h-4.5l6.9-12.2L11,6.8h4.5l4.5,8.1l4.5-8.1h4.5l-6.9,7.1L29.1,26.1z M34.9,26.1V6.8h4.5v19.4H34.9z M49.8,26.1V6.8h4.5v8.1l4.5-8.1h4.5l-6.9,7.1l6.9,12.2h-4.5l-4.5-8.7L49.8,26.1z M72.8,27.9c-5.5,0-9.2-3.7-9.2-9.1V9.6c0-5.5,3.7-9.1,9.2-9.1c5.5,0,9.2,3.7,9.2,9.1v9.1C82,24.2,78.3,27.9,72.8,27.9z M72.8,4.1c-3.1,0-4.7,2.5-4.7,5.5v9.1c0,3,1.6,5.5,4.7,5.5c3.1,0,4.7-2.5,4.7-5.5V9.6C77.5,6.5,75.9,4.1,72.8,4.1z M85.2,26.1V6.8h4.5v19.4H85.2z M107.4,26.1h-4.5l-9.2-11.4v11.4h-4.5V6.8h4.5l9.2,11.3V6.8h4.5V26.1z M127.3,13.7h-9.3v8.8h-4.5V6.8h13.7v3.6h-9.2v2.7h9.3V13.7z M144.1,26.1h-4.5L135,17.4l-4.5,8.7h-4.5l6.9-12.2l-6.9-7.1h4.5l4.5,8.1l4.5-8.1h4.5l-6.9,7.1L144.1,26.1z M149.9,26.1V6.8h4.5v19.4H149.9z M171.2,26.1l-6.7-9.5c-0.6,0.1-1.2,0.1-1.8,0.1c-3.7,0-5.9-2.3-5.9-5.7V6.8h4.5v4.1c0,1.7,1.1,3,2.4,3c0.6,0,1.2-0.2,1.8-0.5l5.8-8.2h5.4l-7.2,10l7.5,9.3H171.2z M180.7,26.1V0.5h4.5v25.6H180.7z M200.7,13.7h-9.3v8.8h-4.5V6.8h13.7v3.6h-9.2v2.7h9.3V13.7z"></path>
  </svg>
);

const ofertaCiebieItems = [
  {
    title: "Warsztaty fotograficzne",
    href: "/dla-ciebie/warsztaty-fotograficzne",
    icon: <Camera className="h-6 w-6" />,
  },
  {
    title: "Spacery przyrodnicze",
    href: "/dla-ciebie/spacery-przyrodnicze",
    icon: <Trees className="h-6 w-6" />,
  },
  {
    title: "Spacery fotograficzne",
    href: "/dla-ciebie/spacery-fotograficzne",
    icon: <Camera className="h-6 w-6" />,
  },
  {
    title: "Wycieczki rowerowe",
    href: "/dla-ciebie/wycieczki-rowerowe",
    icon: <Bike className="h-6 w-6" />,
  },
  {
    title: "Warsztaty z tworzenia rolek",
    href: "/dla-ciebie/warsztaty-z-rolek",
    icon: <Clapperboard className="h-6 w-6" />,
  },
];

const ofertaFirmItems = [
  {
    title: "Wydarzenia dla firm",
    href: "/dla-firm/wydarzenia-dla-firm",
    icon: <Briefcase className="h-8 w-8" />,
    features: [
      "Leśna integracja",
      "Warsztaty przyrodnicze i fotograficzne",
      "Szkolenia z rolek / reels",
    ],
  },
  {
    title: "Współpraca marketingowa",
    href: "/dla-firm/wspolpraca-marketingowa",
    icon: <Megaphone className="h-8 w-8" />,
    features: [
      "Filmy promocyjne i wideo na social media",
      "Sesje zdjęciowe",
      "Strony www i inne materiały brandingowe",
    ],
  },
  {
    title: "Współpraca influencerska",
    href: "/dla-firm/wspolpraca-influencerska",
    icon: <UserCheck className="h-8 w-8" />,
    features: [
      "Współpraca ambasadorska",
      "Materiały promocyjne",
      "Testy produktów i usług",
    ],
  },
];

export default function Navigation() {
  const [isPlaying, setIsPlaying] = React.useState(true);
  
  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A2F2A] text-white">
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-10">
        <Link href="/" aria-label="Przejdź do strony głównej">
          <JakubWencekLogo />
        </Link>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium uppercase tracking-wider hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
                  OFERTA DLA CIEBIE
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-x-4 gap-y-2 p-6 bg-[#0F1F1C]">
                    {ofertaCiebieItems.map((item) => (
                      <Link key={item.title} href={item.href} className="flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-white/5">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-sm text-gray-400">Sprawdź szczegóły</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium uppercase tracking-wider hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
                  OFERTA DLA FIRM
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-[900px] gap-4 p-6 bg-[#0F1F1C]">
                    {ofertaFirmItems.map((item) => (
                      <Link key={item.title} href={item.href} className="flex w-1/3 flex-col gap-4 rounded-md p-4 transition-colors hover:bg-white/5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                            {item.icon}
                          </div>
                          <h3 className="text-base font-medium text-white leading-tight">{item.title}</h3>
                        </div>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-400">
                          {item.features.map((feature) => (<li key={feature}>{feature}</li>))}
                        </ul>
                        <p className="mt-auto pt-2 text-sm font-medium text-white">Sprawdź szczegóły</p>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/o-mnie" legacyBehavior passHref><NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-sm font-medium uppercase tracking-wider hover:bg-white/10 focus:bg-white/10`}>O MNIE</NavigationMenuLink></Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/sklep" legacyBehavior passHref><NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-sm font-medium uppercase tracking-wider hover:bg-white/10 focus:bg-white/10`}>SKLEP</NavigationMenuLink></Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/kontakt" legacyBehavior passHref><NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-sm font-medium uppercase tracking-wider hover:bg-white/10 focus:bg-white/10`}>KONTAKT</NavigationMenuLink></Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex">
          <a href="#" className="flex items-center gap-3 rounded-full bg-[#f1c40f] py-2 pl-4 pr-2 text-sm font-medium uppercase tracking-wider text-[#0F1F1C]">
            <Music className="h-4 w-4" />
            <span>LEŚNY KONCERT</span>
            <button onClick={togglePlay} className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-colors hover:bg-black/20" aria-label={isPlaying ? "Pauza" : "Graj"}>
              {isPlaying ? <Pause className="h-3 w-3 fill-current text-[#0F1F1C]" /> : <Play className="h-3 w-3 ml-0.5 fill-current text-[#0F1F1C]" />}
            </button>
          </a>
        </div>
        
        <div className="lg:hidden">
          <button className="text-white" aria-label="Otwórz menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}