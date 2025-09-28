
'use client'
import Image from "next/image";
import DirectionAwareButton from "../DirectionAwareButton";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NatureBeautySection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !imageRef.current || !buttonRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: false,
        once: true,
      },
    });

    tl.from(headingRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 1.1,
      ease: "power3.out",
    });

    tl.from(imageRef.current, {
      opacity: 0,
      x: 80,
      rotate: 8,
      duration: 1.2,
      ease: "power3.out",
    }, "-=0.7");

    tl.from(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(2)",
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          repeat: 1,
          yoyo: true,
          duration: 0.3,
          ease: "power1.inOut",
        });
      },
    }, "-=0.5");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="py-[120px]" ref={sectionRef}>
      <div className="mx-auto max-w-[1200px] px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex items-center lg:order-2" ref={imageRef}>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/682ebe80fcf375f76441a101_jakub-wencek-about-2-26.webp?"
              alt="Artistic photo of tree branches looking towards the sky"
              width={590}
              height={740}
              className="h-auto w-full rounded-lg"
            />
          </div>
          <div className="flex items-center lg:order-1">
            <h2 className="text-5xl font-normal leading-[1.2] text-foreground" ref={headingRef}>
              Uchwycam piękno przyrody w słowach, obrazach i filmach
              Od ponad 10 lat łączę pracę leśnika z pasją do fotografii i filmowania, tworząc materiały przyrodnicze i edukacyjne.
            </h2>
          </div>
        </div>
        <div className="mt-12 flex justify-center lg:justify-start" ref={buttonRef}>
          <DirectionAwareButton text="Poznaj moją ofertę" className="bg-secondary-foreground hover:bg-secondary-foreground/90" />
        </div>
      </div>
    </section>
  );
};

export default NatureBeautySection;