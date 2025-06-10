"use client";

import { useEffect, useState } from "react";
import ProjectHeader from "@/components/ProjectHeader";
import ImageGallery from "@/components/ImageGallery";
import ProjectInfo from "@/components/ProjectInfo";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import MapEmbed from "@/components/MapEmbed";
import { Asset } from "types/models";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loader";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Asset | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${id}`
        );
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setProject(data);
      } catch {
        setError(true);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${id}/images`
        );
        if (res.ok) {
          const imgs = await res.json();
          setImages(imgs);
        }
      } catch {
        // ignore image errors
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchProject(), fetchImages()]);
      setLoading(false);
    };

    fetchAll();
  }, [id]);

  if (error) {
    return (
      <section className="bg-foreground text-white px-8 py-12 rounded-tl-[30px] flex-1">
        <p>Error al cargar el proyecto.</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="bg-foreground text-white px-8 py-12 rounded-tl-[30px] flex-1 flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="bg-foreground text-white px-8 py-12 rounded-tl-[30px] flex-1">
        <p>No se encontró el proyecto.</p>
      </section>
    );
  }

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
    project_duration,
    proyect_provider
  } = project;

  const addressDetails = highlights ? highlights.split(";") : [];

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

  const breakdown = [
    {
      label: "Rentabilidad por alquiler",
      value: `${rent_roi}%`,
    },
    {
      label: "Rentabilidad por apreciación",
      value: `${apreciation_roi}%`,
    },
    {
      label: "Duración del proyecto",
      value: `${project_duration} años`,
    },
  ];

  return (
    <section className="bg-foreground text-white px-8 py-12 rounded-tl-[30px] flex-1">
      <ProjectHeader title={name} />

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {images.length > 0 && <ImageGallery images={images} />}
          <ProjectInfo
            provider={proyect_provider}
            address={address}
            addressDetails={addressDetails}
            details={details}
            profitability={rent_roi + apreciation_roi}
            breakdown={breakdown}
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
