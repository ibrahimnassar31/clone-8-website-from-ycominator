import Image from 'next/image';
import { TreePine, Camera, Sprout } from 'lucide-react';
import type { ComponentType } from 'react';

interface Testimonial {
  icon: ComponentType<{ className?: string }>;
  text: string;
  author: string;
  role: string;
}

const testimonialsData: Testimonial[] = [
  {
    icon: TreePine,
    text: "Uwielbiam spacery z Kubą. Byłam już kilkukrotnie i na pewno jeszcze skorzystam. Kuba świetnie i rzeczowo przekazuje wiedzę i ciekawostki fotograficzne. A to wszystko w przepięknych okolicznościach przyrody, wśród urokliwych miejsc Rezerwatu Doliny Baryczy. Kuba zaprowadzi Cię też, do tych rzadko uczęszczanych miejsc. Na koniec zawsze przepyszny poczęstunek z lokalnymi niespodziankami.",
    author: "Agnieszka Możdżerz",
    role: "Uczestniczka leśnego spaceru przyrodniczego",
  },
  {
    icon: Camera,
    text: "Serdecznie polecam warsztaty fotograficzne u Kuby! Jest to wyjątkowa okazja na spotkanie się z osobami o podobnych pasjach, rozwinięcie umiejętności fotograficznych, wymiany doświadczeń i spędzenia niezapomnianego czasu blisko dzikiej przyrody :)",
    author: "Iza B.",
    role: "Uczestniczka leśnego spaceru fotograficznego",
  },
  {
    icon: Sprout,
    text: "Uczestniczyliśmy już w trzech spacerach - dwóch turystycznych i jednym fotograficznym. Wszystko jest super zorganizowane, pokazane i ciekawie opowiedziane. Kuba jest zawsze otwarty na rozmowy i pytania, dzięki czemu spacery mają niepowtarzalną atmosferę. Spacery kończą się przepysznym poczęstunkiem - smacznym jedzeniem - także PIZZĄ, kawą parzoną w stylu włoskim i domowym ciastem :)",
    author: "Ola i Tomek",
    role: "Uczestnicy leśnego spaceru przyrodniczego",
  },
];

const TestimonialCard = ({ icon: Icon, text, author, role }: Testimonial) => (
  <div className="bg-card border border-border rounded-lg p-8 h-full flex flex-col">
    <div className="bg-primary w-12 h-12 rounded-md flex items-center justify-center mb-6 shrink-0">
      <Icon className="w-6 h-6 text-primary-foreground" />
    </div>
    <p className="text-secondary-foreground leading-relaxed mb-6 flex-grow">{text}</p>
    <div>
      <p className="font-medium text-foreground">{author}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-[120px]">
      <div className="container">
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
            <figcaption className="mt-6 text-muted-foreground text-base">
              — José Saramago
            </figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <TestimonialCard {...testimonialsData[0]} />
          
          <div className="flex flex-col gap-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/68027c98defab8b51e9f1975_testimonial-grid-4-24.webp"
                alt="Zdjęcie lasu z lotu ptaka"
                width={380}
                height={253}
                className="w-full h-auto object-cover"
              />
            </div>
            <TestimonialCard {...testimonialsData[1]} />
          </div>

          <TestimonialCard {...testimonialsData[2]} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;