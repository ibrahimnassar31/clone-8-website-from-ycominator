"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localStorage.getItem("cookie_consent_jw") !== "true") {
        setIsVisible(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.setItem("cookie_consent_jw", "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-[99] pb-[15px] px-[15px]">
      <div className="max-w-7xl mx-auto bg-[#162c25] rounded-[15px] py-[11.5px] pr-[11.5px] pl-[15px] flex items-center justify-between flex-wrap gap-y-3 gap-x-6">
        <p className="text-white text-[10.7px] leading-tight">
          Używamy plików cookie. Sprawdź&nbsp;
          <Link href="/polityka-prywatnosci" className="underline hover:no-underline">
            Politykę Prywatności
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="#"
            onClick={handleConsent}
            className="bg-transparent border border-white/50 text-white text-[11.5px] font-medium leading-[1.1] py-[6.5px] px-3 rounded-full hover:bg-white hover:text-[#162c25] transition-colors"
          >
            Odrzuć wszystkie
          </a>
          <a
            href="#"
            onClick={handleConsent}
            className="bg-primary text-primary-foreground text-[11.5px] font-medium leading-[1.1] py-[6.5px] px-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Akceptuj wszystkie
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;