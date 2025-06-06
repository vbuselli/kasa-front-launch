"use client";
import { useInvestmentShare } from "context/InvestmentContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function InvestmentCalculator({
  id,
  minimumInvestment,
  area,
  rentGain,
  appGain,
  totalShares,
}: {
  id: string;
  minimumInvestment: number;
  area: number;
  rentGain: number;
  appGain: number;
  totalShares: number;
}) {
  const presets = [minimumInvestment, 5000, 10000];
  const [investment, setInvestment] = useState(minimumInvestment);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(minimumInvestment);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { setInvestmentAmount } = useInvestmentShare();
  const router = useRouter();

  const handlePreset = (val: number) => {
    setInputValue(val);
  };

  const createAssetToken = async () => {
    setInvestmentAmount(inputValue);
    setLoading(true);
    setToast(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/asset_tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            asset_id: id,
            num_shares: investment,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create asset token");
      }

      const responseData = await response.json();

      router.push("/protected/checkout/" + responseData.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setToast(err.message || "Ocurrió un error al pasar al checkout.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      let value = Number(inputValue);
      if (isNaN(value) || value < 2000) value = 2000;
      value = Math.floor(value / 100) * 100;
      setInputValue(value);
      const floored = Math.floor(value / 100);
      setInvestment(floored);
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue]);

  return (
    <div className="bg-foreground p-6 rounded-lg border border-white space-y-4">
      <h2 className="text-xl font-bold text-white">Calculadora de Inversión</h2>

      <div>
        <div className="text-gray-300 mb-1 font-semibold">
          ¿Cuánto deseas invertir?
        </div>

        <div className="relative text-3xl font-semibold text-center">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground pointer-events-none">
            S/
          </span>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="w-full pl-14 pr-4 py-3 rounded-md bg-white text-foreground text-center"
            min={minimumInvestment}
          />
        </div>
      </div>

      <div className="flex gap-2">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handlePreset(p)}
            className={`flex-1 py-0 border rounded-md transition-colors font-semibold ${
              inputValue === p
                ? "bg-yellow-400 text-gray-900 border-yellow-400"
                : "bg-transparent border-primary text-primary hover:bg-yellow-100"
            }`}
          >
            S/ {p.toLocaleString()}
          </button>
        ))}
      </div>

      <div>
        <p className="text-gray-300 mb-1 font-semibold">
          Con esa inversión podrás adquirir:
        </p>
        <p className="text-foreground font-bold flex-1 py-4 bg-primary hover:bg-green-500 rounded-md text-center text-3xl">
          {((area * Math.floor(inputValue / 100)) / totalShares).toFixed(2)} cm
          <sup className="text-sm align-super">2</sup>
        </p>
      </div>

      <div>
        <p className="text-gray-300 mb-1 font-semibold">
          Tus ganancias serían:
        </p>
        <div className="space-y-3">
          <div className="bg-primary text-foreground p-4 rounded-md">
            <div className="text-sm font-semibold">De alquiler:</div>
            <div className="text-3xl font-bold text-center my-2">
              S/{((rentGain * inputValue) / 100).toFixed(2)}{" "}
              <span className="text-sm">Anual</span>
            </div>
            <p className="text-sm font-semibold text-center">
              Puedes recibir S/ {((rentGain * inputValue) / 1200).toFixed(2)}{" "}
              mensual o solicitar reinvertirlo
            </p>
          </div>
          <div className="bg-primary text-foreground p-4 rounded-md">
            <div className="text-sm font-semibold">De apreciación:</div>
            <div className="text-3xl font-bold text-center my-2">
              S/{((appGain * inputValue) / 100).toFixed(2)}{" "}
              <span className="text-sm">Anual</span>
            </div>
            <p className="text-sm font-semibold text-center">
              Se recibe al vender la propiedad o vender tus fracciones.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-md p-4 flex items-center gap-3">
        <div className="mt-1 text-gray-500">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="var(--foreground)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M12 8v4m0 4h.01"
              stroke="var(--foreground)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-xs text-gray-800 font-semibold">
          Recuerda que estas ganancias son estimadas. Nos esforzamos para que la
          propiedad se alquile la mayor parte del tiempo, pero no podemos
          garantizar que se alquile todos los meses o que su valor suba de forma
          exacta.
        </div>
      </div>

      <div className="flex items-center mt-4 relative">
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={() => setTerms(!terms)}
          className="appearance-none w-5 h-5 rounded bg-gray-800 border-2 border-gray-600 checked:bg-blue-600 checked:border-blue-600 flex-shrink-0 mr-2 relative transition-colors duration-150"
          style={{ outline: "none" }}
        />
        {terms && (
          <svg
            className="absolute ml-2 pointer-events-none"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ left: -8, top: 6, pointerEvents: "none" }}
          >
            <rect width="20" height="20" rx="4" fill="#2563eb" />
            <path
              d="M6 10.5L9 13.5L14 8.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <label
          htmlFor="terms"
          className="text-xs text-gray-100 font-semibold ml-1"
        >
          Estoy de acuerdo en continuar con la inversión según los{" "}
          <a href="/terms" className="underline text-gray-100 font-bold">
            Términos y Condiciones
          </a>
        </label>
      </div>

      {toast && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-center">
          {toast}
        </div>
      )}

      <div className="flex justify-center">
        <button
          disabled={!terms || loading}
          onClick={() => createAssetToken()}
          className="w-3/4 py-3 bg-yellow-400 hover:bg-yellow-300 text-white font-semibold rounded-3xl disabled:opacity-50 cursor-pointer mt-2"
        >
          {loading ? "Procesando..." : "INVERTIR"}
        </button>
      </div>
    </div>
  );
}
