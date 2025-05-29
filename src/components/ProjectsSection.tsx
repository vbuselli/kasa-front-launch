import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import Image from "next/image";
import HowItWorks from "@/assets/HowItWorks.png";
import SanLuis from "@/assets/projects/san-luis.png";
import SanMiguel from "@/assets/projects/san-miguel.png";
import Surquillo from "@/assets/projects/surquillo.png";
import PuebloLibre from "@/assets/projects/pueblo-libre.png";

const projects: ProjectCardProps[] = [
  {
    id: "san-miguel",
    title: "San Miguel",
    location: "Lima",
    boughtPercent: 100,
    imageSrc: SanMiguel,
  },
  {
    id: "pueblo-libre",
    title: "Pueblo Libre",
    location: "Lima",
    boughtPercent: 70,
    imageSrc: PuebloLibre,
  },
  {
    id: "surquillo",
    title: "Surquillo",
    location: "Lima",
    boughtPercent: 90,
    imageSrc: Surquillo,
  },
  {
    id: "san-luis",
    title: "San Luis",
    location: "Lima",
    boughtPercent: 30,
    imageSrc: SanLuis,
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative py-16 bg-gray-900 text-white px-8 rounded-bl-3xl">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              PROYECTOS PARA <span className="text-green-400">INVERTIR</span>
            </h2>
            <p className="text-gray-300">
              DESCUBRE TODAS LAS POSIBILIDADES DE INVERSIÓN
            </p>
          </div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-400 rounded-full shadow-lg flex items-center justify-center"
            aria-label="Cómo funciona"
          >
            <Image
              src={HowItWorks}
              alt={"Cómo funciona Kasa"}
              className="text-white"
              width={80}
              height={80}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.title} {...proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
