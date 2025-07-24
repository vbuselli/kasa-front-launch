"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Step {
  title: string;
  description: string;

}

const steps: Step[] = [
  {
    title: "Crea tu usuario Kasa",
    description: "¡Estás aquí!👇",

  },
  {
    title: "Transfiere tu inversión",
    description:
      "¡Te confirmaremos tu pago en máximo 3 horas hábiles!\nIngresa a “Mi Portafolio” para continuar",

  },
  {
    title: "Completa tus datos",
    description:
      "¡Te confirmaremos tus datos en máximo 3 horas hábiles!\nIngresa a “Mi Portafolio” para continuar",

  },
  {
    title: "Firma el contrato",
    description: "Completa tu inversión firmando tu contrato",

  },
];

type Props = {
  currentStepIndex?: number;
  completedSteps: number[];
};

export default function InvestmentSteps({
  currentStepIndex,
  completedSteps,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-kasa-600 text-white p-6 rounded-2xl border border-white ">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <h2 className="text-xl font-bold">¡Completa tu inversión!</h2>
          <p className="text-sm italic text-gray-300">En tan solo 4 pasos</p>
        </div>
        {open ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
      </div>

      {open && (
        <ol className="mt-6 space-y-6 relative border-l border-gray-600 pl-6">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStepIndex === index;

            return (
              <li key={index} className="relative">
                <div
                  className={`absolute -left-[36px] w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm text-center
                    ${isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-white text-[#111729]"
                      : "bg-[#111729] border-2 border-gray-400 text-gray-400"}
                  `}
                >
                  {index + 1}
                </div>

                <div className="ml-4">
                  <h3
                    className={`font-semibold ${
                      isCurrent ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 whitespace-pre-line">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
