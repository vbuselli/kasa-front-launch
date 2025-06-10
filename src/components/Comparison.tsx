"use client";
import {
  DollarSign,
  ArrowUpDown,
  Globe,
  Building2,
  Repeat,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import React from "react";

const features = [
  { name: "Inversión accesible", Icon: DollarSign },
  { name: "Poca volatilidad", Icon: ArrowUpDown },
  { name: "Proceso 100% online", Icon: Globe },
  { name: "Activo Tangible", Icon: Building2 },
  { name: "Ingresos recurrentes", Icon: Repeat },
];

const columns = [
  {
    title: "Kasa",
    values: [true, true, true, true, true],
  },
  {
    title: "Inmuebles tradicionales",
    values: [false, true, false, true, true],
  },
  {
    title: "Depósito a plazo fijo",
    values: [false, true, true, false, false],
  },
  {
    title: "Acciones o criptomonedas",
    values: [true, false, true, false, false],
  },
];

export default function ComparisonSection() {
  return (
    <section className="bg-foreground px-12 relative pb-8 hidden lg:block">
      <button className="bg-primary text-foreground text-base px-10 py-3 rounded-[10px] font-bold mr-6 absolute left-18 top-3 transition hover:bg-primary/90">
        KASA VS OTROS
      </button>

      <div className="inverted-radius-tl bg-background pt-8 pb-14 shadow-inset">
        <h2 className="text-2xl lg:text-1xl font-extrabold uppercase text-foreground ml-[320px] mb-10 w-1/3">
          Inversiones que sí puedes pagar y entender
        </h2>
        <div className="grid grid-cols-[250px_repeat(4,minmax(0,1fr))] gap-x-8 overflow-x-auto px-20 py-3">
          <div />
          {columns.map((col) => (
            <div
              key={col.title}
              className={`px-4 py-2 mb-3 flex items-center justify-center bg-white text-center text-sm font-bold rounded-[20px] shadow-md text-foreground ${
                col.title === "Kasa" ? "text-primary" : ""
              }`}
            >
              {col.title}
            </div>
          ))}
          {features.map((feat, row) => (
            <React.Fragment key={feat.name}>
              <div className="flex items-center px-4 py-3 mt-3 gap-3 bg-white rounded-[20px] shadow-md">
                <div className="p-2">
                  <feat.Icon size={24} className="text-primary" />
                </div>
                <span className="text-foreground font-bold text-sm">
                  {feat.name}
                </span>
              </div>
              {columns.map((col) => (
                <div
                  key={col.title + row}
                  className={`flex items-center justify-center px-4 py-6 bg-white shadow-md ${
                    row === 0 ? "mt-3 rounded-tr-[20px] rounded-tl-[20px]" : ""
                  } ${
                    row === features.length - 1
                      ? "rounded-br-[20px] rounded-bl-[20px]"
                      : ""
                  }`}
                >
                  {col.values[row] ? (
                    <CheckCircle2 size={30} className="text-primary" />
                  ) : (
                    <XCircle size={30} className="text-red-500" />
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
