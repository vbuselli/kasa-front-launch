"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type ProjectCardProps = {
  id: string;
  title: string;
  location: string;
  boughtPercent: number;
  imageSrc: StaticImageData;
  isFromPortfolio?: boolean;
};

export default function ProjectCard({
  id,
  title,
  location,
  boughtPercent,
  imageSrc,
  isFromPortfolio = false,
}: ProjectCardProps) {
  const isCompleted = boughtPercent >= 100;
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={300}
        className="object-cover w-full h-60 transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{location}</p>
        <div className="mt-2 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              isCompleted ? "bg-green-400" : "bg-yellow-400"
            }`}
            style={{ width: `${Math.min(boughtPercent, 100)}%` }}
          />
          {isFromPortfolio && (
            <p className="mt-1 text-xs text-gray-200">
              {boughtPercent}% comprado
            </p>
          )}
        </div>
        <Link href={`/projects/${id}`}>
          {isFromPortfolio ? (
            <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg cursor-pointer">
              Ver inversión
            </button>
          ) : (
            <button
              className={`mt-4 w-full py-2 flex items-center justify-center text-sm font-medium rounded-md transition-colors group-hover:opacity-90 cursor-pointer
            ${
              isCompleted
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            }`}
            >
              {isCompleted ? "COMPLETADO" : "INVERTIR"}
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}
