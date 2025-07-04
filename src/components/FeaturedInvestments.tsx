"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import blur1 from "@/assets/projects/image.png";
import blur2 from "@/assets/projects/image (1).png";
import SanMiguel from "@/assets/projects/san-miguel.png";
import Surquillo from "@/assets/projects/surquillo.png";
import PuebloLibre from "@/assets/projects/pueblo-libre.png";
import MasonryCard from "./MasonryCard";

const projects = [
  {
    id: "san-miguel",
    title: "Proximamente...",
    location: "Lima",
    bought: 100,
    img: blur1,
  },
  {
    id: "pueblo-libre",
    title: "Depa Los Negocios - Surquillo",
    location: "Lima",
    bought: 80,
    img: SanMiguel,
  },
  {
    id: "surquillo",
    title: "Proximamente...",
    location: "Lima",
    bought: 60,
    img: blur2,
  }
];

export default function InvestmentsCarousel() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState(0);

  const prev = () =>
    setActive((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setActive((i) => (i + 1) % projects.length);

  // On mobile, only show the middle project (index 1)
  const displayProjects = projects;

  return (
    <section className="py-8 px-12 bg-foreground relative overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl lg:text-2xl font-bold mb-6 text-white md:text-[20px] md:leading-tight">
          <span className="md:whitespace-nowrap">
            NOSOTROS BUSCAMOS <span className="text-primary">LO MEJOR</span>,
            <span className="hidden md:inline"> </span>
            <span className="md:hidden"><br /></span>
            <span className="text-primary">TÚ ELIGES</span> EN QUÉ INVERTIR
          </span>
        </h2>

        <div className="relative flex items-center justify-center pt-6">
          <div className="flex overflow-hidden space-x-6 max-w-4xl md:justify-center">
            {/* Show all projects on desktop, only middle project on mobile */}
            {displayProjects.map((proj, idx) => (
              <div
                key={"featured" + proj.id}
                className={`flex flex-col items-center space-y-4 ${
                  // Hide first and last projects on mobile
                  projects.indexOf(proj) === 0 ? 'hidden md:flex' :
                  projects.indexOf(proj) === 2 ? 'hidden md:flex' : 
                  'flex'
                }`}
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
                <Link
                  href="/protected/investments"
                  className="w-10/12 py-2 uppercase text-sm rounded-full font-semibold transition 
                  border border-primary text-primary
                  hover:bg-primary hover:text-white
                  no-external-icon" // Add this class
                >
                  Invertir
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}