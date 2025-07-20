"use client";

import { useUserVerification } from "context/UserVerificationContext";
import Image from "next/image";
import Link from "next/link";
import Character from "@/assets/Character.png";
import InvestmentSteps from "./InvestmentSteps";

export default function PaymentSuccess() {
  const { isVerified, loading } = useUserVerification();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  if (isVerified === false) {
      return (
        
    <div className="min-h-screen bg-[#101A28] text-white px-12 py-12 grid grid-cols-[340px_1fr] gap-16 items-start">
      {/*grid grid-cols-[340px_1fr] items-start */}

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

  else {
    return (
    <div className="min-h-screen bg-[#101A28] text-white px-12 py-12 grid grid-cols-[340px_1fr] gap-16 items-start">
      {/* Paso lateral izquierdo */}
      <div className="sticky top-6">
        <InvestmentSteps completedSteps={[0, 1, 2]} />
      </div>

      {/* Mensaje principal */}
      <div className="bg-[#101A28] border border-white/30 rounded-lg p-8 text-center flex flex-col items-center gap-6 h-full pt-20">
        {/* Número de paso */}
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg">
          2
        </div>

        <h2 className="text-2xl font-semibold">¡Ya estás cerca!</h2>

        <p className="text-base text-white leading-relaxed">
          ¡Enviaste tu transferencia con éxito! <br />
          Validaremos tu transferencia en un máximo de <strong>3 horas</strong>.
        </p>

        <p className="text-base text-white leading-relaxed mb-6">
          Una vez que hayamos validado tus <br/> transferencia, debes ir a firmar tu contrato
        </p>

        <button
          disabled
          className="bg-white text-gray-500 font-semibold py-2 px-6 rounded-md cursor-not-allowed"
        >
          Ir a firmar mi contrato
        </button>

        <p className="text-sm text-gray-400 -mt-2 mb-6">
          Este botón se habilitará cuando el <br/> equipo haya validado tu transferencia
        </p>

        <Link
          href="/protected/portfolio"
          className="bg-green-500 hover:bg-green-600 transition-colors px-6 py-3 rounded-md text-white font-semibold"
        >
          Ver mi portafolio
        </Link>

        <p className="text-sm text-gray-400">
          Por ahora, puedes ver el estado de tu inversión en la sección{" "}
          <span className="underline">“Mi Portafolio”</span>
        </p>
      </div>
    </div>
  );
  }

}
