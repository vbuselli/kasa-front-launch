"use client";
import Link from "next/link";
import { Asset } from "types/models";
import Image from "next/image";
import { useState, useEffect } from "react";

export type AssetCardProps = Asset;

export default function AssetCard({
  id,
  name,
  address,
  is_bought,
  total_shares,
  owned_shares,
}: AssetCardProps) {
  const [currentSrc, setCurrentSrc] = useState<string>();

  const boughtPercent = owned_shares
    ? Math.round((owned_shares / total_shares) * 100)
    : 0;

  const completed = owned_shares === total_shares;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imagesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${id}/images`,
          {
            next: {
              revalidate: 60,
            },
          }
        );

        if (imagesResponse.ok) {
          const images: string[] = await imagesResponse.json();
          setCurrentSrc(images[0]);
        }
      } catch {}
    };

    fetchImage();
  }, [id]);

  return (
    <Link href={`/protected/investments/${id}`}>
      <div className="relative rounded-xl overflow-hidden shadow-lg group h-100">
        {currentSrc && (
          <Image
            src={currentSrc}
            alt={name}
            fill
            className="object-cover w-full h-60 transition-transform group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-300">{address}</p>
          <div className="mt-2 h-3 bg-black/60 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                completed ? "bg-primary" : "bg-yellow-400"
              }`}
              style={{ width: `${Math.min(boughtPercent, 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-200 font-semibold">
            {boughtPercent}% comprado
          </p>

          <button
            className={`mt-4 w-full py-2 flex items-center justify-center text-sm font-medium rounded-md transition-colors group-hover:opacity-90 cursor-pointer
              ${
                completed
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-yellow-400 text-white hover:bg-yellow-500"
              }`}
          >
            {completed ? "COMPLETADO" : "INVERTIR"}
          </button>
        </div>
      </div>
    </Link>
  );
}
