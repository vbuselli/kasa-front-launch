"use client";

import InvestmentSteps from "@/components/InvestmentSteps";
import Link from "next/link";

export default function TransferSuccessScreen() {
  return (
    <div className="min-h-screen bg-[#101A28] text-white px-6 py-12 grid grid-cols-[300px_1fr] gap-6 items-start">
      {/* Paso lateral izquierdo */}
      <div className="sticky top-6">
        <InvestmentSteps currentStepIndex={2} completedSteps={[0, 1]} />
      </div>

      {/* Mensaje principal */}
      <div className="bg-[#101A28] border border-white rounded-lg p-8 text-center flex flex-col items-center gap-6 h-full pt-20">
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg">
          2
        </div>
        <h2 className="text-2xl font-semibold">¡Ya estás cerca!</h2>
        <p className="text-base text-gray-300">
          ¡Enviaste tu transferencia con éxito! <br />
          Validaremos tu transferencia en un máximo de 3 horas. <br />
          Puedes continuar enviando tus datos.
        </p>

        <Link
          href="/protected/validate-identity"
          className="bg-green-500 hover:bg-green-600 transition-colors px-6 py-3 rounded-md text-white font-semibold"
        >
          Ir a completar mis datos
        </Link>
      </div>
    </div>
  );
}
