// TestAssetCard.tsx
"use client";
import { useState, useEffect } from "react";

interface TestAssetCardProps {
  name: string;
  address: string;
  imageSrc?: string;
}

export default function TestAssetCard({ name, address, imageSrc }: TestAssetCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg h-100 opacity-75">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="object-cover w-full h-60"
        />
      ) : (
        <div className="w-full h-60 bg-gray-600 flex items-center justify-center">
          <div className="text-gray-400 text-6xl">🏢</div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-2xl font-semibold text-white">PRÓXIMAMENTE</h3>
        
        {/* Empty progress bar */}
        <div className="mt-2 h-3 bg-black/60 rounded-full overflow-hidden">
          <div className="h-full bg-gray-500 rounded-full" style={{ width: '0%' }} />
        </div>
        <p className="mt-1 text-xs text-gray-200 font-semibold">0% comprado</p>

        <button className="mt-4 w-full py-2 flex items-center justify-center text-sm font-medium rounded-md transition-colors bg-gray-500 text-white cursor-not-allowed">
          INVERTIR
        </button>
      </div>
    </div>
  );
}