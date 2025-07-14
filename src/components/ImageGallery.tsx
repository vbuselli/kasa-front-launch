"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = { images: (string | StaticImageData)[] };

export default function ImageGallery({ images }: Props) {
  const [current, setCurrent]   = useState(0);
  const [showAll, setShowAll]   = useState(false);
  const [capacity, setCapacity] = useState(3);
  const rowRef = useRef<HTMLDivElement>(null);

  /* 80 px thumb + 12 px gap */
  const ITEM = 80, GAP = 12;

  /* cuántas miniaturas caben por fila */
  useEffect(() => {
    if (!rowRef.current) return;
    const calc = () => {
      const w   = rowRef.current!.clientWidth;
      const fit = Math.max(1, Math.floor((w + GAP) / (ITEM + GAP)));
      setCapacity(fit);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, []);

  /* lógica thumbnails */
  const hasExtra     = images.length > capacity;
  const thumbsToShow = showAll || !hasExtra ? images.length : capacity - 1;   // 👈 deja hueco para “+N”
  const thumbs       = images.slice(0, thumbsToShow);

  /* clases */
  const thumbBase =
    "relative h-20 w-20 flex-none overflow-hidden rounded-lg ring-2 transition";

  const rowClass = `
    flex gap-3 px-3 py-2
    ${showAll ? "flex-wrap justify-center lg:flex-nowrap" : "flex-nowrap"}
    scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent
    [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full
  `;

  const wrapperClass = showAll ? "lg:overflow-x-auto" : "overflow-x-auto";

  /* ---------- UI ---------- */
  return (
    <div className="w-full mt-4 overflow-x-hidden">
      {/* imagen principal */}
      <div className="relative mb-4 h-[70vw] max-h-96 w-[90%] sm:w-full mx-auto overflow-hidden rounded-xl">
        <Image src={images[current]} alt={`Imagen ${current + 1}`} fill className="object-cover" priority />
      </div>

      {/* carrusel / grid thumbnails */}
      <div className={wrapperClass}>
        <div ref={rowRef} className={rowClass}>
          {thumbs.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`${thumbBase} ${
                current === i ? "ring-green-500" : "ring-transparent hover:ring-green-400"
              }`}
            >
              <Image src={src} alt={`Miniatura ${i + 1}`} fill className="object-cover" />
            </button>
          ))}

          {!showAll && hasExtra && (
            <button
              onClick={() => setShowAll(true)}
              className={thumbBase}
            >
              <Image
                src={images[capacity - 1]}
                alt="Ver más miniaturas"
                fill
                className="object-cover blur-[2px] brightness-75"
              />
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                +{images.length - (capacity - 1)}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
