"use client";
import Image from "next/image";
import HowItWorks from "@/assets/HowItWorks.png";
import Link from "next/link";
import SanLuis from "@/assets/projects/san-luis.png";
import SanMiguel from "@/assets/projects/san-miguel.png";
import Surquillo from "@/assets/projects/surquillo.png";
import PuebloLibre from "@/assets/projects/pueblo-libre.png";
import Masonry from "react-masonry-css";
import MasonryCard from "./MasonryCard";

const cards = [
  {
    id: "san-luis",
    title: "San Luis",
    bought: 50,
    img: SanLuis,
  },
  {
    id: "pueblo-libre",
    title: "Pueblo Libre",
    bought: 80,
    img: PuebloLibre,
  },
  {
    id: "surquillo",
    title: "Surquillo",
    bought: 50,
    img: Surquillo,
  },
  {
    id: "san-miguel",
    title: "San Miguel",
    bought: 100,
    img: SanMiguel,
  },
];

const breakpointColumnsObj = {
  default: 2,
  1200: 2,
  800: 1,
};

const imagesSizes: { [i: number]: string } = {
  0: "h-65",
  1: "h-48",
  2: "h-70",
  3: "h-87",
};

export default function Hero() {
  return (
    <section className="relative bg-foreground text-white px-8 pb-8 rounded-bl-3xl overflow-hidden rounded-tl-[30px] rounded-br-[30px] shadow-hero">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[50%_50%] items-center">
        <div className="space-y-6">
          <p className="uppercase text-3xl font-bold text-white font-montserrat">
            BIENVENIDO <br /> <span className="text-green-400">A KASA</span>
          </p>
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Invierte en inmuebles
              <br />
              desde S/2,000 <span>😎</span>
            </h1>
            <p className="text-2xl text-gray-300">
              Fácil, sin bancos ni papeleos
            </p>
          </div>
          <p className="text-base lg:text-2xl">
            Compra{" "}
            <span className="text-green-400 font-semibold">
              fracciones de propiedades
            </span>{" "}
            y{" "}
            <span className="text-green-400 font-semibold">
              recibe ingresos cada mes
            </span>{" "}
            por alquiler, mientras tu inversión crece con la valorización.
          </p>
          <Link href="/protected/investments">
            <button className="bg-secondary hover:bg-yellow-300 text-white text-lg uppercase font-semibold px-10 py-3 rounded-[20px] mt-4 inline-block cursor-pointer">
              Empieza hoy
            </button>
          </Link>
        </div>

        <div className="relative">
          <Masonry
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            breakpointCols={breakpointColumnsObj}
          >
            {cards.map((card, i) => {
              const heightClass = imagesSizes[i];
              return (
                <Link
                  key={card.id}
                  href={`/protected/projects/${card.id}`}
                  className="group block relative rounded-[30px] overflow-hidden shadow-lg ring-2 ring-transparent hover:ring-blue-500 transition"
                >
                  <MasonryCard heightClass={heightClass} {...card} />
                </Link>
              );
            })}
          </Masonry>

          <button
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-green-400 hover:bg-green-300 rounded-full shadow-xl flex items-center justify-center transition"
            aria-label="Cómo funciona"
          >
            <Image
              src={HowItWorks}
              alt={"Cómo funciona Kasa"}
              className="text-white"
              width={80}
              height={80}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
