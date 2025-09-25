import Image from "next/image";

const NatureBeautySection = () => {
  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[1200px] px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex items-center lg:order-2">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d4d68227-125d-4c53-9c79-423c03134ff9-jakubwencek-pl/assets/images/682ebe80fcf375f76441a101_jakub-wencek-about-2-26.webp?"
              alt="Artistic photo of tree branches looking towards the sky"
              width={590}
              height={740}
              className="h-auto w-full rounded-lg"
            />
          </div>
          <div className="flex items-center lg:order-1">
            <h2 className="text-5xl font-normal leading-[1.2] text-foreground">
              Uchwycam piękno przyrody w słowach, obrazach i filmach
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NatureBeautySection;