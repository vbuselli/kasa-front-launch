import { MapPin } from "lucide-react";

type Detail = { label: string; value: string };

type ProjectInfoProps = {
  provider: string;
  address: string;
  addressDetails?: string[];
  description?: string;
  details: Detail[];
  profitability: number;
};

export default function ProjectInfo({
  provider,
  address,
  addressDetails = [],
  description = "",
  details,
  profitability,
}: ProjectInfoProps) {
  /* Área total */
  const rawArea = details.find((d) => d.label === "Área total")?.value ?? "—";
  const areaMeters =
    rawArea.match(/\(([^)]+m²)\)/)?.[1] ??          // entre paréntesis
    rawArea.match(/([\d.,]+\s*m²)/)?.[1] ??         // suelto en la cadena
    rawArea;

  /* 1️⃣  Limpia guiones iniciales  y 2️⃣  Filtra entradas vacías */
  const cleanDetails = addressDetails
    .map((s) => s.replace(/^\s*-\s*/, "").trim()) // quita “- ”
    .filter(Boolean);                             // quita strings vacíos


  return (
    <div className="space-y-8 text-gray-300">
      {/* Cabecera 3 columnas */}
      {/* ───── Cabecera responsive ───── */}
      <div className="
  flex flex-col sm:flex-row                 /* apilar en xs, fila en ≥ 640 px */
  items-stretch justify-between
  rounded-lg bg-kasa-500
  sm:divide-x sm:divide-white/70            /* líneas divisoras solo en ≥ sm */
">
        <HeaderBox label="Proveedor del proyecto" value={provider} />
        <HeaderBox label="Área total" value={areaMeters} />
        <HeaderBox
          label="Rentabilidad estimada"
          value={`${profitability.toFixed(2)}% anual`}
          valueClass="text-green-300"
        />
      </div>


      {/* Dirección */}
      <section>
        <h4 className="mb-2 font-semibold text-white">Dirección</h4>
        <ul className="space-y-1">
          <li className="flex items-start">
            <MapPin size={16} className="mr-2 flex-shrink-0 text-gray-400" />
            <span>{address}</span>
          </li>
        </ul>
      </section>

      {/* Descripción */}
      {description && (
        <section>
          <h4 className="mb-2 font-semibold text-white">Descripción</h4>
          <p className="leading-relaxed">{description}</p>
        </section>
      )}

      {/* Información destacada */}
      {cleanDetails.length > 0 && (
        <section className="pl-2">
          <h4 className="mb-2 font-semibold text-white">
            Información destacada
          </h4>
          <ul className="list-disc space-y-1 pl-4">
            {cleanDetails.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}


const HeaderBox = ({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex-1 px-2 py-3 sm:py-4 text-center">
    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide leading-tight whitespace-normal break-words">
      {label}
    </p>
    <p
      className={`text-sm font-bold leading-tight ${valueClass} whitespace-normal break-words`}
    >
      {value}
    </p>
  </div>
);
