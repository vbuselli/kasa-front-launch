"use client";
import Link from "next/link";
import { Asset } from "types/models";
import Image from "next/image";
import { useState } from "react";
import { useDrawer } from "context/DrawerContext";
import { useEffect } from "react";

export type ProjectCardProps = Asset & {
  isFromPortfolio?: boolean;
};

export default function ProjectCard({
  id,
  name,
  address,
  is_bought,
  total_shares,
  owned_shares,
  isFromPortfolio = false,
}: ProjectCardProps) {
  const [currentSrc, setCurrentSrc] = useState<string>();
  const { openDrawer } = useDrawer();

  const boughtPercent = owned_shares
    ? Math.round((owned_shares / total_shares) * 100)
    : 0;

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
        } else {
        }
      } catch {}
    };

    fetchImage();
  }, [id]);

  return (
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
              is_bought ? "bg-primary" : "bg-yellow-400"
            }`}
            style={{ width: `${Math.min(boughtPercent, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-200 font-semibold">
          {boughtPercent}% comprado
        </p>
        {isFromPortfolio ? (
          <>
            <button
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg cursor-pointer"
              onClick={() => openDrawer()}
            >
              Ver inversión
            </button>
          </>
        ) : (
          <Link href={`/protected/projects/${id}`}>
            <button
              className={`mt-4 w-full py-2 flex items-center justify-center text-sm font-medium rounded-md transition-colors group-hover:opacity-90 cursor-pointer
            ${
              is_bought
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-yellow-400 text-white hover:bg-yellow-500"
            }`}
            >
              {is_bought ? "COMPLETADO" : "INVERTIR"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
