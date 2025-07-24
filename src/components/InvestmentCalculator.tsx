"use client";
import { useInvestmentShare } from "context/InvestmentContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/gtag";
import { InfoIcon } from "lucide-react";
import * as Popover from '@radix-ui/react-popover';

type Props = {
  id: string;
  minimumInvestment: number;
  area: number;
  rentGain: number;
  appGain: number;
  totalShares: number;
  projectDuration: number;
  address: string;
  name: string;
};

export default function InvestmentCalculator(props: Props) {
  const {
    id,
    minimumInvestment,
    rentGain,
    appGain,
    totalShares,
    projectDuration,
    address,
    name
  } = props;

  const [amount, setAmount] = useState(4000);
  const [shares, setShares] = useState(4000 / 100);
  const [year, setYear] = useState(projectDuration);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setInvestmentAmount } = useInvestmentShare();
  const router = useRouter();

  const sharePrice = 100;
  const format = (v: number) => v.toLocaleString("es-PE");

  const syncAmount = (v: number, final = false) => {
    const raw = isNaN(v) ? 0 : v;
    const aligned = final
      ? Math.max(minimumInvestment, Math.floor(raw / 100) * 100)
      : raw;
    setAmount(aligned);
    setShares(aligned / sharePrice);
  };

  const simuladorTrackRef = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!simuladorTrackRef.current) {
        track("uso_simulador", {
          monto: amount,
          proyecto_id: id,
        });
        simuladorTrackRef.current = true;
      }
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [amount, id]);

  const rentProfit = (rentGain / 100) * amount * year;
  const apprProfit = amount * (Math.pow(1 + appGain / 100, year) - 1);
  const totalGain = rentProfit + apprProfit;
  const grandTotal = amount + totalGain;

  const createToken = async () => {
    setInvestmentAmount(amount);
    setLoading(true);
    track("inicio_ticket", {
      monto: amount,
      cuotas: shares,
      proyecto_id: id,
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/asset_tokens`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ asset_id: id, num_shares: shares }),
        }
      );
      const { id: tokenId } = await res.json();
      localStorage.setItem(`investmentAmount`, amount.toString());
      router.push(`/protected/checkout/${tokenId}`);
    } catch {
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/40 bg-[#0c1b2b] p-4 sm:p-6 space-y-8">
      <header className="space-y-1">
        <h2 className="text-xl font-extrabold sm:text-2xl">{name}</h2>
        <p className="text-xs sm:text-sm text-gray-400">{address}</p>
      </header>

      <section>
        <h3 className="text-base font-bold mb-4">Sobre el proyecto</h3>
        <div className="grid grid-cols-3 gap-2 text-center text-[13px] pl-6 max-[400px]:pl-1">
          <InfoBox label="Precio total" value={`S/ ${format(totalShares * 100)}`} />
          <InfoBox label="Fracciones" value={format(totalShares)} />
          <InfoBox label="Inv. mínima" value={`S/ ${format(minimumInvestment)}`} />
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold mb-4">Sobre la inversión</h3>
        <div className="flex flex-wrap gap-4 text-[13px] justify-around">
          <InfoPair
            label="Rentabilidad"
            value={`${(rentGain + appGain).toFixed(2)}% /año`}
            tooltip={
              <>
                <p>Incluye:</p>
                <li>5.26% anual por alquileres distribuidos mensualmente</li>
                <li>3% anual compuesto proyectado por valorización del inmueble</li>
                <div className="mt-1 text-xxs italic">
                  La plusvalía se recibe solo al vender el inmueble.
                </div>
              </>
            }
          />
          <InfoPair
            label="Duración"
            value={`${projectDuration} años`}
            tooltip="Puedes vender tus fracciones antes a otros inversionistas, no hay tiempo mínimo de permanencia."
          />
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-base font-bold">¡Simula tu inversión!</h3>

        <div className="flex flex-col gap-4 sm:flex-row px-8">
          <NumInput
            label="Monto a invertir"
            prefix="S/"
            value={amount}
            onChange={(v) => syncAmount(v)}
            onBlur={(v) => syncAmount(v, true)}
            min={minimumInvestment}
          />
          <NumInput
            label="Fracciones a comprar"
            prefix="#"
            value={shares}
            onChange={(v) => syncAmount(v * sharePrice)}
            min={minimumInvestment / 100}
          />
        </div>

        <p className="text-center text-[11px] text-gray-400">
          Ingrese múltiplos de S/ 100 (2 200, 2 300…)
        </p>

        <div className="space-y-2 flex flex-col justify-center items-center">
          <label className="text-center block text-sm font-semibold">
            Rentabilidad al año <span className="font-bold text-white">{year}</span>
          </label>
          <input
            type="range"
            min={1}
            max={projectDuration}
            value={year}
            onChange={(e) => setYear(+e.target.value)}
            className="w-[50%] accent-green-500"
          />
          <div className="flex justify-between text-[10px] text-white-400 w-[50%]">
            {Array.from({ length: projectDuration }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 px-8">
          <GainBox label="Por alquiler" value={rentProfit} />
          <GainBox label="Por apreciación" value={apprProfit} />
        </div>
      </section>

      <div className="space-y-2 text-center">
        <h3 className="text-base font-bold">Tu inversión + tu ganancia</h3>
        <div className="mx-auto w-full max-w-sm rounded-md border-1 border-green-500 py-4 px-6 text-lg font-bold flex justify-center gap-2 flex-wrap">
          <span className="whitespace-nowrap">S/ {format(amount)}</span>
          <span>+</span>
          <span className="whitespace-nowrap">S/ {totalGain.toFixed(2)}</span>
          <span>=</span>
          <span className="whitespace-nowrap">S/ {grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <p className="rounded-md bg-white/90 p-4 text-center text-[11px] font-medium text-gray-800">
        Las ganancias estimadas son antes de impuestos. Procuramos que la propiedad se
        alquile la mayor parte del tiempo, pero no podemos garantizar ocupación ni
        apreciación exacta.
      </p>

      <div className="space-y-4">
        <label className="flex items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="h-4 w-4 accent-green-600"
          />
          Acepto los&nbsp;
          <a
            href="https://drive.google.com/file/d/1HSf3dvCssOkjMe48U90r7tPRzvScWevE/view"
            target="_blank"
            className="underline"
          >
            Términos y Condiciones
          </a>
        </label>

        <button
          onClick={createToken}
          disabled={!agree || loading}
          className="w-full rounded-md bg-green-500 py-3 text-sm font-bold disabled:opacity-50"
        >
          {loading ? "Procesando…" : "¡Continuar!"}
        </button>
      </div>
    </div>
  );
}

/* ---------- helpers UI ---------- */
const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col justify-center rounded-md bg-[#0A6140]/80 py-2 px-1 border border-[#087347]">
    <span className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
      {label}
    </span>
    <span className="text-sm font-bold">{value}</span>
  </div>
);

const InfoPair = ({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: string;
  tooltip?: React.ReactNode;
}) => (
  <div className="flex flex-col items-start gap-1">
    <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
      <span>{label}</span>
      {tooltip && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="w-4 h-4 rounded-full bg-gray-300 text-gray-800 text-[10px] font-bold flex items-center justify-center cursor-pointer"
              aria-label="Mostrar información"
            >
              ?
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="top"
              align="center"
              sideOffset={4}
              className="bg-white text-black border border-gray-300 shadow-lg rounded p-3 max-w-xs text-[11px] leading-snug z-50"
            >
              {tooltip}
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </div>
    <p className="text-sm font-bold">{value}</p>
  </div>
);

const GainBox = ({ label, value }: { label: string; value: number }) => (
  <div className="flex-1 rounded-md border border-white bg-[#03AE5B]/90 py-2 text-center">
    <p className="text-xs font-semibold text-gray-200">{label}</p>
    <p className="text-lg font-bold text-white">S/ {value.toFixed(2)}</p>
  </div>
);

const NumInput = ({
  label,
  prefix,
  value,
  onChange,
  onBlur,
  min,
}: {
  label: string;
  prefix: string;
  value: number;
  onChange: (v: number) => void;
  onBlur?: (v: number) => void;
  min?: number;
}) => (
  <div className="flex-1 space-y-1">
    <label className="block text-xs font-semibold text-gray-300">{label}</label>
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-bold">
        {prefix}
      </span>
      <input
        type="number"
        value={value === 0 ? "" : value}
        onChange={(e) => onChange(+e.target.value)}
        onBlur={(e) => onBlur?.(+e.target.value)}
        min={min}
        className="h-12 w-full bg-gray-600/70 py-1 pl-10 pr-2 text-center text-lg font-semibold focus:outline-none"
      />
    </div>
  </div>
);
