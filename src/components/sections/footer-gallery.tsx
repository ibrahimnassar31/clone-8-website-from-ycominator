import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  href: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  price: string;
}

const products: Product[] = [
  {
    href: "/produkt/mglisty-poranek-w-dolinie-baryczy",
    imgSrc: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    imgAlt: "Plakat Mglisty poranek w Dolinie Baryczy",
    title: "Mglisty poranek w Dolinie Baryczy",
    price: "od 219,00 zł",
  },
  {
    href: "/produkt/las-buczynowy",
    imgSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    imgAlt: "Plakat Las buczynowy",
    title: "Las buczynowy",
    price: "od 219,00 zł",
  },
  {
    href: "/produkt/mglisty-las",
    imgSrc: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    imgAlt: "Plakat Sarny w zimowym lesie",
    title: "Sarny w zimowym lesie",
    price: "od 219,00 zł",
  },
  {
    href: "/produkt/promienie",
    imgSrc: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    imgAlt: "Plakat Promienie we mgle",
    title: "Promienie we mgle",
    price: "od 219,00 zł",
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <Link href={product.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
    <div className="bg-white p-4 transition-transform duration-300 ease-in-out group-hover:scale-105">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={product.imgSrc}
          alt={product.imgAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-lg text-foreground font-medium">{product.title}</h3>
      <p className="text-muted-foreground mt-1">{product.price}</p>
    </div>
  </Link>
);

const FooterGallery = () => {
  return (
    <section className="bg-background py-[120px]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-16">
          <h2 className="font-heading text-[48px] leading-[1.2] font-normal text-foreground">
            Cząstka lasu dla Ciebie
          </h2>
          <Link
            href="/sklep"
            className="relative inline-block pb-1 text-sm font-medium uppercase tracking-wide text-foreground whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            SPRAWDŹ WSZYSTKIE PLAKATY
            <span className="absolute bottom-0 left-0 h-px w-full bg-accent"></span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.href} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterGallery;