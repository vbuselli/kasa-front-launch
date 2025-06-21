"use client";
import React from "react";
import backup from "@/assets/why-kasa/backup.png";
import fractions from "@/assets/why-kasa/fractions.png";
import inversion from "@/assets/why-kasa/inversion.png";
import withoutCredits from "@/assets/why-kasa/without-credits.png";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    Icon: withoutCredits,
    title: "Sin créditos ni papeleos para ti",
    desc: "Realiza tu inversión sin el temor de préstamos o endeudamiento.",
  },
  {
    Icon: fractions,
    title: "Vende tus fracciones en cualquier momento",
    desc: "Obtén liquidez al vender tus participaciones cuando lo necesites.",
  },
  {
    Icon: backup,
    title: "INVERSIÓN CON RESPALDO LEGAL",
    desc: "Tu inversión cuenta con marco jurídico que protege tus derechos.",
  },
  {
    Icon: inversion,
    title: "Diversifica tu inversión",
    desc: "Reunimos la inversión de varias personas para adquirir cada propiedad.",
  },
];

export default function WhyKasaSection() {
  return (
    <section className="mt-10 py-16 bg-foreground text-white rounded-tr-[55px] rounded-tl-[55px]">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-2xl md:text-2xl text-[20px] font-bold uppercase">
          ¿Por qué sí te puedes sentir como{" "}
          <span className="text-primary">en Kasa?</span>
        </h2>
        <p className="text-white-400 mt-2 text-lg md:text-lg text-[16px]">
          Inversiones simples, accesibles y sin miedo a endeudarte
        </p>
      </div>
      
      {/* Mobile Layout - Vertical Stack */}
      <div className="container mx-auto px-6 flex flex-col gap-6 sm:hidden">
        {features.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center gap-4"
          >
            <div>
              <Image
                src={Icon}
                alt={title}
                width={60}
                height={60}
                className="w-[60px] h-[60px]"
              />
            </div>
            <div>
              <h3 className="text-xs uppercase font-bold mb-2 text-white">
                {title}
              </h3>
              <p className="text-sm leading-snug text-white-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout - Grid */}
      <div className="container mx-auto px-12 hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="relative bg-background text-center text-gray-900 px-4 py-8 rounded-[30px]
              shadow-inset flex flex-col items-center justify-start gap-5"
          >
            <div className="mb-4">
              <Image
                src={Icon}
                alt={title}
                width={100}
                height={100}
                className="mx-auto w-[100px] h-[100px]"
              />
            </div>
            <div className="flex-none h-fit">
              <h3 className="text-base leading-5 uppercase font-bold mb-2">
                {title}
              </h3>
              <p className="text-sm leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/protected/investments" className="flex justify-center mt-6">
        <button className="bg-secondary hover:bg-yellow-300 text-white text-lg md:text-lg text-[16px] uppercase font-semibold px-12 py-2 rounded-[30px] mt-4 inline-block cursor-pointer">
          Empezar a invertir
        </button>
      </Link>
    </section>
  );
}