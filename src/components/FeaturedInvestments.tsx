"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import SanLuis from "@/assets/projects/san-luis.png";
import SanMiguel from "@/assets/projects/san-miguel.png";
import Surquillo from "@/assets/projects/surquillo.png";
import PuebloLibre from "@/assets/projects/pueblo-libre.png";
import MasonryCard from "./MasonryCard";

const projects = [
  {
    id: "san-miguel",
    title: "San Miguel",
    location: "Lima",
    bought: 100,
    img: SanMiguel,
  },
  {
    id: "pueblo-libre",
    title: "Pueblo Libre",
    location: "Lima",
    bought: 80,
    img: PuebloLibre,
  },
  {
    id: "surquillo",
    title: "Surquillo",
    location: "Lima",
    bought: 60,
    img: Surquillo,
  },
  {
    id: "san-luis",
    title: "San Luis",
    location: "Lima",
    bought: 50,
    img: SanLuis,
  },
];

const filters = ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"];

export default function InvestmentsCarousel() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState(0);

  const prev = () =>
    setActive((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setActive((i) => (i + 1) % projects.length);

  return (
    <section className="py-8 px-12 bg-foreground relative overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
          NOSOTROS BUSCAMOS <span className="text-primary">LO MEJOR</span>,
          <br />
          <span className="text-primary">TÚ ELIGES</span> EN QUÉ INVERTIR
        </h2>
        <div className="flex justify-center gap-4 mb-8">
          <div className="rounded-full border-1 border-primary">
            {filters.map((f, i) => (
              <button
                key={i}
                onClick={() => setFilter(i)}
                className={`px-4 py-1 rounded-full text-sm font-medium uppercase transition 
                ${filter === i ? "bg-primary text-white" : "text-primary"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center pt-6">
          <button
            onClick={prev}
            className="absolute left-0 z-10 p-2 shadow-none rounded-full"
            aria-label="Anterior"
          >
            <Play
              className="transform scale-x-[-1]"
              color="var(--color-primary)"
              fill="var(--color-primary)"
              size={36}
            />
          </button>

          <button
            onClick={next}
            className="absolute right-0 z-10 p-2 shadow-none rounded-full"
            aria-label="Siguiente"
          >
            <Play
              color="var(--color-primary)"
              fill="var(--color-primary)"
              size={36}
            />
          </button>

          <div className="flex overflow-hidden space-x-6 max-w-4xl">
            {projects.map((proj, idx) => (
              <div
                key={"featured" + proj.id}
                className="flex flex-col items-center space-y-4"
              >
                <div
                  className={`flex-shrink-0 w-70 rounded-[30px] overflow-hidden relative 
                  transition-transform duration-300`}
                >
                  <MasonryCard
                    id={proj.id}
                    title={proj.title}
                    bought={proj.bought}
                    img={proj.img}
                    heightClass="h-80"
                  />
                </div>
                <button
                  className={`w-10/12 py-2 uppercase text-sm rounded-full font-semibold transition 
                    ${
                      idx === active
                        ? "bg-primary text-white"
                        : "border border-primary text-primary"
                    }`}
                >
                  Invertir
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-3 h-3 rounded-full transition 
                ${idx === active ? "bg-primary" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
