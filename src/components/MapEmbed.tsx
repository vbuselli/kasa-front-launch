export default function MapEmbed({ src }: { src: string }) {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <iframe
        src={src}
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
