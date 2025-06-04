"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HowItWorks from "@/assets/HowItWorks.png";
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

  return (
    <section className="relative py-16 bg-foreground text-white px-16 rounded-tl-[30px] flex-1">
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
          {loading ? (
            <Loader />
          ) : error ? (
            <p>Error al cargar assets.</p>
          ) : (
            assets.map((proj) => <AssetCard key={proj.id} {...proj} />)
          )}
        </div>
      </div>
      <style jsx>{`
        .loader {
          display: inline-block;
          border-style: solid;
        }
      `}</style>
    </section>
  );
}
