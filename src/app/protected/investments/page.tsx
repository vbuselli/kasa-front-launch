import Image from "next/image";
import HowItWorks from "@/assets/HowItWorks.png";
import { Asset } from "types/models";
import ProjectCard from "@/components/ProjectCard";

export default async function InvestmentsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/assets`, {
    next: {
      revalidate: 60,
    },
  });

  const assets: Asset[] = await res.json();

  return (
    <section className="relative py-16 bg-foreground text-white px-16 rounded-tl-[30px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mb-8 w-full">
          <h2 className="text-4xl font-bold">
            PROYECTOS PARA <span className="text-green-400">INVERTIR</span>
          </h2>
          <p className="text-gray-300 text-xl">
            DESCUBRE TODAS LAS POSIBILIDADES DE INVERSIÓN
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div
            className="absolute -top-7 -right-7 transform z-1 rounded-full shadow-lg flex items-center justify-center"
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
          {!res.ok ? (
            <p>Error al cargar assets.</p>
          ) : (
            assets.map((proj) => <ProjectCard key={proj.id} {...proj} />)
          )}
        </div>
      </div>
    </section>
  );
}
