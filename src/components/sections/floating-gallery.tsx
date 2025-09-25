"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";

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
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a119362e543c2508032e2_jakub-wencek-2-4.webp?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a1193d74be1f71b8a26f4_jakub-wencek-8-6.webp?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a1193aaf97a9a3c5d2a86_jakub-wencek-1-11.webp?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a11936a9b5a3846735d88_jakub-wencek-6-9.webp?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/680a1193aaf97a9a3c5d2a7e_jakub-wencek-10-5.webp?",
];

const FloatingGallery = () => {
  const imagesData: ImageData[] = useMemo(
    () => [
      {
        src: imageAssets[0],
        alt: "Jeleń leżący na trawie w słońcu",
        width: 440,
        height: 293,
        position: { top: "10vh", left: "10vw" },
        speed: 0.1,
      },
      {
        src: imageAssets[1],
        alt: "Zbliżenie na ważkę siedzącą na liściu paproci",
        width: 350,
        height: 438,
        position: { top: "20vh", right: "15vw" },
        speed: 0.15,
      },
      {
        src: imageAssets[2],
        alt: "Stado koni we mgle o wschodzie słońca",
        width: 480,
        height: 320,
        position: { top: "65vh", left: "5vw" },
        speed: -0.1,
      },
      {
        src: imageAssets[3],
        alt: "Słońce prześwitujące przez pnie drzew w lesie",
        width: 300,
        height: 450,
        position: { top: "80vh", right: "10vw" },
        speed: 0.08,
      },
      {
        src: imageAssets[4],
        alt: "Jeleń stojący w lesie w promieniach słońca",
        width: 320,
        height: 480,
        position: { top: "120vh", left: "calc(50% - 160px)" },
        speed: -0.05,
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const sectionTop = sectionEl.offsetTop;

      imageRefs.current.forEach((el, index) => {
        if (el) {
          const speed = imagesData[index].speed;
          const movement = (scrollY - sectionTop) * speed;
          el.style.transform = `translateY(${movement}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call to position correctly

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imagesData]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#1A2F2A] h-[180vh] overflow-hidden"
      aria-label="Galeria zdjęć przyrodniczych"
    >
      {imagesData.map((img, index) => (
        <div
          key={img.src}
          ref={(el) => (imageRefs.current[index] = el)}
          className="absolute shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden will-change-transform"
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
            className="w-full h-auto object-cover pointer-events-none"
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </section>
  );
};

export default FloatingGallery;