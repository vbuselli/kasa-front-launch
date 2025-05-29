"use client";
import Link from "next/link";
import { useState } from "react";

export default function InvestmentCalculator() {
  const presets = [2000, 5000, 10000];
  const [investment, setInvestment] = useState(presets[0]);
  const [terms, setTerms] = useState(false);

  const area = investment / 1000;
  const rentGain = investment * 0.08;
  const appGain = investment * 0.03;

  const handlePreset = (val: number) => {
    setInvestment(val);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
      <label className="block text-sm text-gray-300">
        ¿Cuánto deseas invertir?
      </label>
      <input
        type="number"
        value={investment}
        onChange={(e) => setInvestment(Number(e.target.value))}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />

      <div className="flex gap-2">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => handlePreset(p)}
            className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded"
          >
            S/{p.toLocaleString()}
          </button>
        ))}
      </div>

      <p className="text-gray-300">Con esa inversión podrás adquirir:</p>
      <p className="text-white font-semibold">
        {area.toFixed(2)} m<sup>2</sup>
      </p>

      <p className="text-gray-300">Tus ganancias serían:</p>
      <div className="space-y-2">
        <p className="bg-green-600 text-white px-4 py-2 rounded">
          De alquiler: S/{rentGain.toFixed(2)}
        </p>
        <p className="bg-green-600 text-white px-4 py-2 rounded">
          De apreciación: S/{appGain.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={() => setTerms(!terms)}
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm text-gray-300">
          He leído los{" "}
          <a href="/terms" className="text-green-400 underline">
            términos y condiciones
          </a>
        </label>
      </div>

      <Link href="/checkout" className="block">
        <button
          disabled={!terms}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded disabled:opacity-50 cursor-pointer"
        >
          INVERTIR
        </button>
      </Link>
    </div>
  );
}
