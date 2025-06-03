"use client";
import ProjectCard from "@/components/ProjectCard";
import { useEffect, useState } from "react";
import { AssetPopulated } from "types/models";

export default function PortfolioPage() {
  const [assets, setAssets] = useState<AssetPopulated[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/get-my-asset-tokens`,
          {
            next: {
              revalidate: 60,
            },
          }
        );
        if (!res.ok) throw new Error("Error fetching assets");
        const assets = await res.json();
        setAssets(assets);
      } catch (err) {
        console.error("Error fetching assets:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return (
    <section className="relative py-16 h-full w-full flex-1 bg-foreground text-white px-16 rounded-tl-[30px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mb-8 w-full">
          <h2 className="text-4xl font-bold">Mi portafolio de inversiones</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {loading ? (
            <p>Cargando assets...</p>
          ) : error ? (
            <p>Error al cargar assets.</p>
          ) : assets.length === 0 ? (
            <p>No tienes assets.</p>
          ) : (
            assets.map((proj) => (
              <ProjectCard key={proj.id} {...proj.asset} isFromPortfolio />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
