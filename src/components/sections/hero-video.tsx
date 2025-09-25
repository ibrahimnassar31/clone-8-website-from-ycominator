import React from 'react';

const HeroVideo = () => {
  return (
    <section>
      <div className="w-full h-auto">
        <video
          className="w-full h-full object-cover"
          src="https://cdn.ficturo.pl/jakubwencek-vid-hero.mp4"
           poster="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/685bc4ca30bd2eb94783a146_f2581a8af1a8b4364a665f72362942ef_jakubwencek-vid-hero-placeholder-3.webp?"
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HeroVideo;