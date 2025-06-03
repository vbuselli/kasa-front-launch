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
    <div>
      <div className="relative w-full h-80 rounded-lg overflow-hidden mb-4">
        <Image src={main} alt="Proyecto" fill className="object-cover" />
      </div>
      <div className="flex space-x-2">
        {images.map((src, idx) => (
          <button
            key={"image-" + idx}
            onClick={() => setMain(src)}
            className="relative w-20 h-20 rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-green-400"
          >
            <Image src={src} alt="Thumbnail" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
