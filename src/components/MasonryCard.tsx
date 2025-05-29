import Image, { StaticImageData } from "next/image";

export default function MasonryCard({
  title,
  bought,
  img,
  heightClass = "h-65",
}: {
  id: string;
  title: string;
  bought: number;
  img: StaticImageData;
  heightClass?: string;
}) {
  return (
    <>
      <div className={`relative w-full ${heightClass}`}>
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover brightness-90 group-hover:brightness-100 transition"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex flex-col justify-end text-start">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-gray-300">Lima</p>
        <div className="mt-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className={`${
              bought === 100 ? "bg-green-400" : "bg-yellow-400"
            } h-full rounded-full`}
            style={{ width: `${bought}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-200 mt-1">{bought}% comprado</p>
      </div>
    </>
  );
}
