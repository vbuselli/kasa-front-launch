import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import SanLuis from "@/assets/projects/san-luis.png";
import SanMiguel from "@/assets/projects/san-miguel.png";
import Surquillo from "@/assets/projects/surquillo.png";
import PuebloLibre from "@/assets/projects/pueblo-libre.png";

const investments: ProjectCardProps[] = [
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

export default function PortfolioSection() {
  return (
    <section className="py-16 bg-gray-900 px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Mi portafolio de inversiones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map((inv) => (
            <ProjectCard key={inv.id} {...inv} isFromPortfolio />
          ))}
        </div>
      </div>
    </section>
  );
}
