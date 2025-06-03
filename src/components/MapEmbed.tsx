"use client";

export default function MapEmbed({ src }: { src: string }) {
  return (
    <div className="w-full h-90 rounded-lg overflow-hidden">
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(
          src
        )}&z=15&output=embed`}
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
