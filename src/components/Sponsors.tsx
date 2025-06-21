"use client";
import Image, { StaticImageData } from "next/image";
import ElComercio from "@/assets/sponsors/elcomercio.png";
import EmprendeUp from "@/assets/sponsors/emprendeup.png";
import Innovaulima from "@/assets/sponsors/innovaulima.png";
import StartGlobal from "@/assets/sponsors/startglobal.png";
import HultPrize from "@/assets/sponsors/hultprize.png";
import Emprendelatam from "@/assets/sponsors/emprendelatam.png";
import Cip from "@/assets/sponsors/cip.png";
import Produce from "@/assets/sponsors/produce.png";
import StartupPeru from "@/assets/sponsors/startup-peru.png";
import ProInovate from "@/assets/sponsors/logo-proinnovate.png";

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
  {
    src: Produce,
    alt: "Ministerio de la Producción",
    width: 150,
    height: 40,
  },
  {
    src: StartupPeru,
    alt: "Startup Perú",
    width: 150,
    height: 40,
  },
  {
    src: ProInovate,
    alt: "ProInovate",
    width: 150,
    height: 40,
  },
];

export default function Sponsors() {
  return (
    <section className="py-8 mt-3 -mx-4 md:-mx-6 lg:-mx-8 xl:-mx-12">
      <div className="w-full max-w-[100vw] relative overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll items-center">
            {/* First set of sponsors */}
            {sponsors.map((s, index) => (
              <div
                key={`first-${s.alt}-${index}`}
                className="flex-shrink-0 mx-8 opacity-80 flex items-center justify-center h-16"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  className="object-contain filter brightness-0 saturate-100 max-h-full"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {sponsors.map((s, index) => (
              <div
                key={`second-${s.alt}-${index}`}
                className="flex-shrink-0 mx-8 opacity-80 flex items-center justify-center h-16"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  className="object-contain filter brightness-0 saturate-100 max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}