"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

export default function ImageGallery({
  images,
}: {
  images: (string | StaticImageData)[];
}) {
  const [main, setMain] = useState(images[0]);
  const [startIndex, setStartIndex] = useState(0);
  
  const THUMBNAILS_TO_SHOW = 4;
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + THUMBNAILS_TO_SHOW < images.length;
  
  const scrollLeft = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };
  
  const scrollRight = () => {
    setStartIndex(Math.min(images.length - THUMBNAILS_TO_SHOW, startIndex + 1));
  };
  
  const visibleThumbnails = images.slice(startIndex, startIndex + THUMBNAILS_TO_SHOW);

  return (
    <div>
      <div className="relative w-full h-80 rounded-lg overflow-hidden mb-4">
        <Image src={main} alt="Proyecto" fill className="object-cover" />
      </div>
      
      <div className="relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Previous thumbnails"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {/* Thumbnails container */}
        <div className="flex space-x-2 px-8">
          {visibleThumbnails.map((src, idx) => {
            const actualIndex = startIndex + idx;
            return (
              <button
                key={"image-" + actualIndex}
                onClick={() => setMain(src)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden ring-2 transition-all ${
                  main === src 
                    ? "ring-green-400" 
                    : "ring-transparent hover:ring-green-400"
                }`}
              >
                <Image src={src} alt="Thumbnail" fill className="object-cover" />
              </button>
            );
          })}
        </div>
        
        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Next thumbnails"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        
        {/* Dots indicator (optional) */}
        {images.length > THUMBNAILS_TO_SHOW && (
          <div className="flex justify-center mt-3 space-x-1">
            {Array.from({ length: Math.ceil(images.length / THUMBNAILS_TO_SHOW) }).map((_, idx) => {
              const isActive = Math.floor(startIndex / THUMBNAILS_TO_SHOW) === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setStartIndex(idx * THUMBNAILS_TO_SHOW)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? "bg-green-400" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}