"use client";
import Image, { StaticImageData } from "next/image";
import ElComercio from "@/assets/sponsors/elcomercio.png";
import EmprendeUp from "@/assets/sponsors/emprendeup.png";
import Innovaulima from "@/assets/sponsors/innovaulima.png";
import StartGlobal from "@/assets/sponsors/startglobal.png";
import HultPrize from "@/assets/sponsors/hultprize.png";
import Emprendelatam from "@/assets/sponsors/emprendelatam.png";

type Sponsor = {
  src: StaticImageData;
  alt: string;
  width?: number;
  height?: number;
};

const sponsors: Sponsor[] = [
  {
    src: EmprendeUp,
    alt: "Emprende Up",
    width: 150,
    height: 40,
  },
  {
    src: ElComercio,
    alt: "El Comercio",
    width: 150,
    height: 40,
  },
  {
    src: Innovaulima,
    alt: "Innovaulima",
    width: 150,
    height: 40,
  },
  {
    src: StartGlobal,
    alt: "Start Global",
    width: 150,
    height: 40,
  },
  {
    src: HultPrize,
    alt: "Hult Prize",
    width: 150,
    height: 40,
  },
  {
    src: Emprendelatam,
    alt: "Emprendelatam",
    width: 150,
    height: 40,
  },
];

export default function Sponsors() {
  return (
    <section className="py-8 mt-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between space-x-8 overflow-x-auto scrollbar-hide">
          {sponsors.map((s) => (
            <div
              key={s.alt}
              className="flex-shrink-0 opacity-80 hover:opacity-100 transition"
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                className="object-contain filter brightness-0 saturate-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
