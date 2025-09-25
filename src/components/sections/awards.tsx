import React from 'react';

const NationalGeographicLogo = () => (
  <div className="inline-block border-[5px] border-[#f1c40f] px-5 py-4">
    <div className="text-white font-semibold text-base md:text-lg tracking-[0.2em] leading-snug">
      <p>NATIONAL</p>
      <p>GEOGRAPHIC</p>
    </div>
  </div>
);

const AwardsSection = () => {
  return (
    <section className="bg-secondary py-[120px]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-20 gap-y-12 items-center">
          <div className="flex flex-col items-start gap-6">
            <NationalGeographicLogo />
            <p className="text-muted-foreground text-sm">
              Kategoria: Europa z powietrza
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-light leading-snug text-white max-w-xl">
              Moje zdjęcie „Wieloryb i kruk” zajęło I miejsce w Wielkim Konkursie Fotograficznym National Geographic
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;