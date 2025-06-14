"use client";
import Image from "next/image";
import Link from "next/link";
import Check from "@/assets/footer/check.png";
import Files from "@/assets/footer/files.png";
import House from "@/assets/footer/house.png";
import Money from "@/assets/footer/money.png";
import { link } from "fs";

const faqs = [
  {
    id: "faq-1",
    icon: House,
    title: "Empezando en Kasa",
    desc: "Paso a paso: desde registrarte hasta activar tu primera inversión",
    link: "https://intercom.help/inviertekasa/es/collections/13211886-invirtiendo-en-kasa"
  },
  {
    id: "faq-2",
    icon: Money,
    title: "Rentabilidad",
    desc: "Ingresos y seguimiento de tu inversión",
    link: "https://intercom.help/inviertekasa/es/collections/13211915-rentabilidad-e-ingresos"
  },
  {
    id: "faq-3",
    icon: Check,
    title: "Seguridad",
    desc: "Cómo protegemos tu inversión, legalmente y en la práctica",
    link: "https://intercom.help/inviertekasa/es/collections/13211892-seguridad"
  },
  {
    id: "faq-4",
    icon: Files,
    title: "Documentos e impuestos",
    desc: "Lo que necesitas saber sobre impuestos y declaraciones",
    link: "https://intercom.help/inviertekasa/es/collections/13211927-documentos-e-impuestos"
  }
];

export default function FAQSection() {
  return (
    <section className="px-12 relative bg-foreground">
      <div className="container mx-auto px-6 bg-primary py-8 rounded-tr-[30px] rounded-tl-[30px] shadow-inset-full">
        <h2 className="text-center text-3xl font-extrabold text-foreground">
          PREGUNTAS FRECUENTES
        </h2>
        <p className="text-center text-foreground mb-6 text-lg font-semibold">
          NOSOTROS TE AYUDAMOS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {faqs.map((faq) => (
            <Link
              key={faq.id}
              href={faq.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-48 mx-auto bg-gray-900 text-white rounded-2xl p-6 shadow-hero flex flex-col items-center"
            >
              <div className="w-16 h-16 mb-4">
                <Image
                  src={faq.icon}
                  alt={faq.title}
                  width={64}
                  height={64}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-center font-semibold mb-2 text-primary uppercase">
                {faq.title}
              </h3>
              <p className="text-sm text-gray-300 text-center">{faq.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="https://intercom.help/inviertekasa/es/"
            className="bg-gray-900 hover:bg-gray-800 text-primary font-semibold px-16 py-2 rounded-full transition inline-block text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Centro de ayuda
          </Link>
        </div>
      </div>
    </section>
  );
}
