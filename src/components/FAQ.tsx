"use client";
import Image from "next/image";
import Link from "next/link";
import Check from "@/assets/footer/check.png";
import Files from "@/assets/footer/files.png";
import House from "@/assets/footer/house.png";
import Money from "@/assets/footer/money.png";

const faqs = [
  {
    id: "faq-1",
    icon: Money,
    title: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet",
  },
  {
    id: "faq-2",
    icon: Check,
    title: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet",
  },
  {
    id: "faq-3",
    icon: Files,
    title: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet",
  },
  {
    id: "faq-4",
    icon: House,
    title: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet",
  },
];

export default function FAQSection() {
  return (
    <section className="px-12 relative bg-foreground">
      <div className="container mx-auto px-6 bg-primary py-8 rounded-tr-[30px] rounded-tl-[30px] shadow-inset-full">
        <h2 className="text-center text-3xl font-extrabold text-foreground">
          ¿TIENES PREGUNTAS?
        </h2>
        <p className="text-center text-foreground mb-6 text-lg font-semibold">
          NOSOTROS TE AYUDAMOS
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="flex-shrink-0 w-48 bg-gray-900 text-white rounded-2xl p-6 shadow-hero flex flex-col items-center"
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
              <h3 className="font-semibold mb-2 text-primary uppercase">
                {faq.title}
              </h3>
              <p className="text-sm text-gray-300 text-center">{faq.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/help">
            <button className="bg-gray-900 hover:bg-gray-800 text-primary font-semibold px-16 py-2 rounded-full transition">
              Centro de ayuda
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
