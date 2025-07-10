"use client";
import Image from "next/image";
import HowItWorks from "@/assets/HowItWorks.png";
import Link from "next/link";
import SanLuis from "@/assets/projects/san-luis.png";
import blur1 from "@/assets/projects/image.png";
import blur2 from "@/assets/projects/image (1).png";
import blur3 from "@/assets/projects/image (2).png";
import SanMiguel from "@/assets/projects/san-miguel.png";
import Surquillo from "@/assets/projects/surquillo.png";
import PuebloLibre from "@/assets/projects/pueblo-libre.png";
import Masonry from "react-masonry-css";
import MasonryCard from "./MasonryCard";
import { useState } from "react";

const cards = [
  {
    id: "san-luis",
    title: "Depa Los Negocios - Surquillo",
    bought: 50,
    img: SanMiguel,
  },
  {
    id: "pueblo-libre",
    title: "Proximamente...",
    bought: 0,
    img: blur3,
  },
  {
    id: "surquillo",
    title: "Proximamente...",
    bought: 0,
    img: blur1,
  },
  {
    id: "san-miguel",
    title: "Proximamente...",
    bought: 0,
    img: blur2,
  },
];

const breakpointColumnsObj = {
  default: 2,
  1200: 2,
  800: 2,
  600: 1,
};

const imagesSizes: { [i: number]: string } = {
  0: "h-65",
  1: "h-48",
  2: "h-70",
  3: "h-87",
};

export default function Hero() {
  const [showModal, setShowModal] = useState(false);


  return (
    <section className="relative bg-foreground text-white px-8 pb-8 pt-4 lg:pt-0 rounded-bl-3xl overflow-hidden rounded-tl-[30px] rounded-br-[30px] shadow-hero">
      <div className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[50%_50%] lg:gap-0 items-center pt-3 lg:pt-0">
        <div className="space-y-6 pr-6">
          <p className="uppercase text-[20px] lg:text-2xl font-bold text-white font-montserrat">
            BIENVENIDO <br className="hidden lg:block" />{" "}
            <span
              className="text-green-400"
              style={{
                animation: "fadeInOut 3s ease-in-out infinite",
                animationName: "fadeInOut",
              }}
            >
              A KASA
            </span>
            <style>{`
              @keyframes fadeInOut {
              0% { opacity: 1; }
              50% { opacity: 0; }
              100% { opacity: 1; }
              }
        `}</style>
          </p>
          <div>
            <h1 className="text-[35px] lg:text-[48px] font-extrabold leading-tight">
              <span className="lg:hidden">
                Invierte en inmuebles <span>😎</span>
                <br />
                desde S/2,000
              </span>
              <span className="hidden lg:block">
                Invierte en inmuebles
                <br />
                desde S/2,000 <span>😎</span>
              </span>
            </h1>
            <p className="text-[22px] text-gray-300">
              Fácil, sin bancos ni papeleos
            </p>
          </div>
          <p className="text-base lg:text-[22px] mb-2 lg:mb-6">
            Compra{" "}
            <span className="text-green-400 font-semibold">
              fracciones de propiedades
            </span>{" "}
            y{" "}
            <span className="text-green-400 font-semibold">
              recibe ingresos cada mes
            </span>{" "}
            por alquiler, mientras tu inversión crece con la valorización del
            depa.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:w-full gap-4">
            <Link href="/protected/investments">
              <button className="bg-secondary hover:bg-yellow-300 text-white text-[16px] uppercase font-semibold px-10 py-3 rounded-[20px] mt-4 inline-block cursor-pointer w-full sm:w-auto">
                EMPEZAR AHORA
              </button>
            </Link>

            <button
              className="border border-green-500 hover:bg-green-500 text-white text-[16px] uppercase font-semibold px-6 py-3 rounded-[20px] justify-center mt-4 inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto"
              onClick={() => setShowModal(true)}
            >

              <p>¿CÓMO FUNCIONA?</p>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                  <polygon points="10,8 16,12 10,16" fill="white" />
                </svg>

              </div>
            </button>
          </div>

        </div>

        <div className="relative mt-2">
          <Masonry
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            breakpointCols={breakpointColumnsObj}
          >
            {/* Show all cards but hide blur cards on mobile with CSS */}
            {cards.map((card, i) => {
              const heightClass = imagesSizes[i];
              const isBlurCard = card.title.includes("Proximamente");
              return (
                <Link
                  key={card.id}
                  href={`/protected/investments`}
                  className={`group block relative rounded-[30px] overflow-hidden shadow-lg ring-2 ring-transparent hover:ring-blue-500 transition ${isBlurCard ? "hidden lg:block" : ""
                    }`}
                >
                  <MasonryCard heightClass={heightClass} {...card} />
                </Link>
              );
            })}
          </Masonry>

          {/* Modal Trigger Button */}
          {/* <button
            className="absolute top-0 right-0 lg:top-1/2 lg:left-0 lg:right-auto lg:-translate-x-1/2 -translate-y-1/2 bg-green-400 hover:bg-green-300 rounded-full shadow-xl flex items-center justify-center transition cursor-pointer"
            aria-label="Cómo funciona"
            onClick={() => setShowModal(true)}
          >
            <Image
              src={HowItWorks}
              alt={"Cómo funciona Kasa"}
              className="text-white"
              width={80}
              height={80}
            />
          </button> */}

          {/* Modal */}
          {showModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            >
              <div className="rounded-2xl p-4 max-w-3xl w-full relative">
                <button
                  className="absolute top-0 right-1 lg:-top-1 lg:-right-1 text-black hover:text-black text-3xl cursor-pointer bg-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
                  onClick={() => setShowModal(false)}
                  aria-label="Cerrar modal"
                >
                  &times;
                </button>
                <div className="w-full h-auto aspect-video rounded overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/JXJLn48urXY"
                    title="Cómo funciona Kasa"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
