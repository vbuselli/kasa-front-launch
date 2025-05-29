import ProjectHeader from "@/components/ProjectHeader";
import ImageGallery from "@/components/ImageGallery";
import ProjectInfo from "@/components/ProjectInfo";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import MapEmbed from "@/components/MapEmbed";

const project = {
  title: "Depa San Miguel (frente a PUCP)",
  images: [
    "/images/san-miguel-main.jpg",
    "/images/san-miguel-1.jpg",
    "/images/san-miguel-2.jpg",
    "/images/san-miguel-3.jpg",
  ],
  provider: "Líder Grupo Constructor",
  address: [
    "Av. Universitaria esquina con Av. Tupac Amaru, San Miguel, Lima",
    "Frente a PUCP",
  ],
  details: [
    { label: "Área total", value: "65 m²" },
    { label: "Precio por m²", value: "S/8,000" },
  ],
  profitability: 10.9,
  breakdown: [
    { label: "Proyección renta", value: "8%" },
    { label: "Proyección valorización", value: "2.9%" },
  ],
  mapSrc: "https://www.google.com/maps/embed?...",
};

export default function ProjectPage() {
  return (
    <section className="bg-gray-900 text-white px-8 py-12 min-h-screen">
      <ProjectHeader title={project.title} />

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <ImageGallery images={project.images} />
          <ProjectInfo
            provider={project.provider}
            address={project.address}
            details={project.details}
            profitability={project.profitability}
            breakdown={project.breakdown}
          />
        </div>

        <div className="space-y-8">
          <InvestmentCalculator />
          <MapEmbed src={project.mapSrc} />
        </div>
      </div>
    </section>
  );
}
