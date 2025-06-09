"use client";
import AssetTokenCard from "@/components/AssetTokenCard";
import Loader from "@/components/ui/Loader";
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

  const completed = assets.filter((a) => a.state === "settled");
  const pending = assets.filter((a) => {a.state !== "settled" && a.state !== "expired"});

  return (
    <section className="relative py-16 h-full w-full flex-1 bg-foreground text-white px-16 rounded-tl-[30px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mb-8 w-full">
          <h2 className="text-4xl font-bold">Mi portafolio de inversiones</h2>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p>Error al cargar assets.</p>
        ) : assets.length === 0 ? (
          <p>No tienes assets.</p>
        ) : (
          <>
            {completed.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  Inversiones Completadas
                  <span
                    className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center"
                    style={{ minWidth: "1.75rem", minHeight: "1.75rem" }}
                  >
                    {completed.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {completed.map((proj) => (
                    <AssetTokenCard key={proj.id} {...proj} />
                  ))}
                </div>
              </div>
            )}

            {pending.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  Inversiones Pendientes
                  <span
                    className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center"
                    style={{ minWidth: "1.75rem", minHeight: "1.75rem" }}
                  >
                    {pending.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pending.map((proj) => (
                    <AssetTokenCard key={proj.id} {...proj} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
