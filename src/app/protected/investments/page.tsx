"use client";

import { useEffect, useState } from "react";
import { Asset } from "types/models";
import AssetCard from "@/components/AssetCard";
import Loader from "@/components/ui/Loader";

export default function InvestmentsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/assets`
        );
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAssets(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const sortedAssets = [...assets].sort((a, b) => {
    const aFinished = a.owned_shares === a.total_shares;
    const bFinished = b.owned_shares === b.total_shares;
    if (aFinished === bFinished) return 0;
    return aFinished ? 1 : -1;
  });

  return (
    <section className="relative py-16 bg-foreground text-white px-16 rounded-tl-[30px] flex-1 flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col">
        <div className="flex flex-col items-center justify-center mb-8 w-full">
          <h2 className="text-4xl font-bold text-xl md:text-4xl">
            PROYECTOS PARA <span className="text-green-400">INVERTIR</span>
          </h2>
          <p className="text-gray-300 text-xl text-base md:text-xl">
            DESCUBRE TODAS LAS OPORTUNIDADES DE INVERSIÓN
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <Loader />
          </div>
        ) : error ? (
          <p>Error al cargar assets.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {sortedAssets.map((proj) => (
              <AssetCard key={proj.id} {...proj} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
