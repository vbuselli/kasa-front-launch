"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = { images: (string | StaticImageData)[] };

export default function ImageGallery({ images }: Props) {
  const [current, setCurrent] = useState(0);

  /* refs y medida de fila */
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [capacity, setCapacity] = useState(3);  // nº de miniaturas que caben

  /*  thumb = 96 px   gap = 12 px  */
  const ITEM = 96;
  const GAP  = 12;

  useEffect(() => {
    if (!rowRef.current) return;

    const calc = () => {
      const w = rowRef.current!.clientWidth;
      const fit = Math.max(1, Math.floor((w + GAP) / (ITEM + GAP)));
      setCapacity(fit);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, []);

  /* overlay y thumbnails */
  const [showAll, setShowAll] = useState(false);
  const hasExtra = images.length > capacity;
  const visible  = !showAll && hasExtra ? capacity - 1 : capacity;
  const thumbs   = showAll || !hasExtra ? images : images.slice(0, visible);

  /* estilo base */
  const thumbBase =
    "relative flex-none h-24 w-24 overflow-hidden rounded-lg ring-2 transition";

  return (
    <div className="w-full mt-3 overflow-x-hidden">
      {/* imagen principal */}
      <div className="relative mb-4 h-96 w-full max-w-full overflow-hidden rounded-xl">
        <Image src={images[current]} alt="" fill className="object-cover" priority />
      </div>

      {/* carrusel */}
      <div className="overflow-x-auto">
        <div
          ref={rowRef}
          className="flex flex-nowrap gap-3 px-3 pt-2 pb-2
                     scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent
                     [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {thumbs.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`${thumbBase} ${
                current === i ? "ring-green-500" : "ring-transparent hover:ring-green-400"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}

          {!showAll && hasExtra && (
            <button onClick={() => setShowAll(true)} className={`${thumbBase}`}>
              <Image
                src={images[visible]}
                alt=""
                fill
                className="object-cover blur-[2px] brightness-75"
                  sizes="(max-width: 640px) calc(100vw - 2rem), 640px"
              />
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                +{images.length - visible}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
