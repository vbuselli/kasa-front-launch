"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

export default function ImageGallery({
  images,
}: {
  images: (string | StaticImageData)[];
}) {
  const [main, setMain] = useState(images[0]);

  return (
    <div className="w-full max-w-full">
      <div className="relative w-full h-80 rounded-lg overflow-hidden mb-4">
        <Image src={main} alt="Proyecto" fill className="object-contain" />
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-2 px-2">
          {images.map((src, idx) => (
            <button
              key={"image-" + idx}
              onClick={() => setMain(src)}
              className="relative w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-green-400 flex-shrink-0"
            >
              <Image src={src} alt="Thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}