"use client";
import Image from "next/image";
import SanMiguel from "@/assets/projects/san-miguel.png";
import HowItWorks from "@/assets/HowItWorks.png";
import Link from "next/link";

export default function CommunityReferralSection() {
  return (
    <section className="py-20 bg-foreground text-white px-12">
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
          <div className="relative mb-8 overflow-hidden inverted-radius-br">
            <Image
              src={SanMiguel}
              alt="Proyecto detalle"
              width={800}
              height={600}
              className="object-cover w-full h-60 shadow-inset"
            />
          </div>
          <blockquote className="text-gray-200 text-2xl">
            “Elegimos proyecto de calidad y accesibles para inversionistas”
          </blockquote>
          <p className="mt-4 text-gray-400 leading-relaxed mb-5 lg:mb-0">
            Trabajamos con especialistas en la búsqueda y análisis de oportunidades de inversión inmobiliaria para ofrecerte las mejores oportunidades de inversión.
          </p>
        </div>

        <div className="lg:w-1/2 space-y-8">
          <div className="border border-primary rounded-[30px] p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2 pb-3 border-b-1 border-white">
              COMUNIDAD
            </h3>
            <p className="text-gray-300 mb-4">
              ¡Estamos creando la primera comunidad de inversión colectiva en inmuebles en el Perú! ¿Te sumas?
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
              Pronto podrás recibir beneficios al invitar a tus amigos a invertir con Kasa.
            </p>
            <div className="flex justify-center">
              <button className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-full transition w-8/12 mx-auto">
                Proximamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
