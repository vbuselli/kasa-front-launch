"use client";
import Link from "next/link";

export default function CommunityReferralSection() {
  return (
    <section
      className="py-20 bg-foreground text-white px-12"
      id="community-referral"
    >
      <div className="container mx-auto px-6 lg:flex lg:items-start lg:gap-12 relative">
        <button
          className="absolute z-1 top-0 left-10 -translate-x-1/2 -translate-y-1/2 bg-green-400 hover:bg-green-300 rounded-full shadow-xl flex items-center justify-center transition"
          aria-label="Cómo funciona"
        >
          {/*
          <Image
            src={HowItWorks}
            alt={"Cómo funciona Kasa"}
            className="text-white"
            width={80}
            height={80}
          />
        */}
        </button>

        <div className="lg:w-1/2">
          {/* Image hidden on mobile */}
          <div className="relative mb-8 overflow-hidden">
            <Link href="/">
              <div className="flex items-center lg:w-full">
                <div className="w-full h-auto aspect-video rounded overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/JXJLn48urXY"
                    title="Kasa video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Link>
          </div>
          <blockquote className="text-gray-200 text-2xl">
            &quot;Elegimos proyectos de calidad y accesibles para
            inversionistas&quot;
          </blockquote>
          <p className="mt-4 text-gray-400 leading-relaxed mb-5 lg:mb-0">
            Trabajamos con especialistas en la búsqueda y análisis de
            oportunidades de inversión inmobiliaria para ofrecerte las mejores
            oportunidades de inversión.
          </p>
        </div>

        <div className="lg:w-1/2 space-y-8">
          {/* Community section hidden on mobile */}
          <div className="border border-primary rounded-[30px] p-6 flex-col hidden md:flex">
            <h3 className="text-xl font-semibold mb-2 pb-3 border-b-1 border-white">
              COMUNIDAD
            </h3>
            <p className="text-gray-300 mb-4">
              ¡Estamos creando la primera comunidad de inversión colectiva en
              inmuebles en el Perú! ¿Te sumas?
            </p>
            <Link
              href={"/protected/investments"}
              className="flex justify-center"
            >
              <button className="bg-primary hover:bg-green-400 text-white font-semibold px-6 py-2 rounded-full transition w-8/12 mx-auto">
                Invertir
              </button>
            </Link>
          </div>

          {/* Referrals Card */}
          <div className="border border-primary rounded-[30px] p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2 pb-3 border-b-1 border-white">
              REFERIDOS
            </h3>
            <p className="text-gray-300 mb-4">
              Pronto podrás recibir beneficios al invitar a tus amigos a
              invertir con Kasa.
            </p>
            <div className="flex justify-center">
              <button className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-full transition w-8/12 mx-auto md:text-base text-base">
                <span className="md:text-base text-base">Pronto 👀</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}