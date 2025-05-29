import { Building2, MapPin, Home, DollarSign } from "lucide-react";

type ProjectInfoProps = {
  provider: string;
  address: string[];
  details: { label: string; value: string }[];
  profitability: number;
  breakdown: { label: string; value: string }[];
};

export default function ProjectInfo({
  provider,
  address,
  details,
  profitability,
  breakdown,
}: ProjectInfoProps) {
  return (
    <div className="space-y-6 text-gray-300">
      <div className="flex items-center space-x-2">
        <Building2 size={20} className="text-green-400" />
        <span>
          Respaldado por{" "}
          <span className="text-white font-semibold">{provider}</span>
        </span>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-2">Dirección</h4>
        <ul className="space-y-1">
          {address.map((line) => (
            <li key={line} className="flex items-start">
              <MapPin size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-2">Sobre el inmueble</h4>
        <ul className="space-y-1">
          {details.map((d) => (
            <li key={d.label} className="flex items-start">
              <Home size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <span>
                {d.label}: {d.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-2">
          Rentabilidad anual estimada:{" "}
          <span className="text-green-400">{profitability}%</span>
        </h4>
        <ul className="space-y-1">
          {breakdown.map((b) => (
            <li key={b.label} className="flex items-start">
              <DollarSign
                size={16}
                className="mr-2 text-gray-400 flex-shrink-0"
              />
              <span>
                {b.label}: {b.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
