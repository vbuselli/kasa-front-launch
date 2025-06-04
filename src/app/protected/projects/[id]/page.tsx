import ProjectHeader from "@/components/ProjectHeader";
import ImageGallery from "@/components/ImageGallery";
import ProjectInfo from "@/components/ProjectInfo";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import MapEmbed from "@/components/MapEmbed";
import { Asset } from "types/models";
import { useRouter } from "next/router";

export default async function ProjectPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    return <p>Error al cargar el proyecto.</p>;
  }

  const project: Asset = await res.json();

  const {
    name,
    spv_name,
    address,
    highlights,
    square_cm,
    total_price,
    bedrooms,
    bathrooms,
    minimum_investment,
    apreciation_roi,
    rent_roi,
    total_shares,
  } = project;

  const imagesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${id}/images`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const images: string[] = await imagesResponse.json();

  const addressDetails = highlights ? highlights.split(",") : [];

  const details = [
    { label: "Área total", value: `${square_cm}` || "N/A" },
    { label: "Precio total", value: `S/ ${total_price || "N/A"}` },
    { label: "Dormitorios", value: `${bedrooms}` || "N/A" },
    { label: "Baños", value: `${bathrooms}` || "N/A" },
    {
      label: "Invierte desde",
      value: `S/ ${minimum_investment}` || "N/A",
    },
  ];

  return (
    <section className="bg-foreground text-white px-8 py-12 rounded-tl-[30px]">
      <ProjectHeader title={name} />

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {images.length && <ImageGallery images={images} />}
          <ProjectInfo
            provider={spv_name}
            address={address}
            addressDetails={addressDetails}
            details={details}
          />
        </div>

        <div className="space-y-8">
          <InvestmentCalculator
            id={id}
            totalShares={total_shares}
            area={square_cm}
            rentGain={rent_roi}
            appGain={apreciation_roi}
            minimumInvestment={minimum_investment}
          />
          <MapEmbed src={project.address} />
        </div>
      </div>
    </section>
  );
}
