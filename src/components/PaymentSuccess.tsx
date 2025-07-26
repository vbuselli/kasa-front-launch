"use client";

import { useUserVerification } from "context/UserVerificationContext";
import InvestmentSteps from "./InvestmentSteps";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "context/CartContext";
import { AssetPopulated } from "types/models";
import { useMyAssetTokens } from "../hooks/useMyAssetTokens";

export default function PaymentSuccess() {
  const { tokens } = useMyAssetTokens();

  const { isVerified, loading } = useUserVerification();

  const [activeToken, setActiveToken] = useState<AssetPopulated | null>(null);


  useEffect(() => {
    const storedId = localStorage.getItem("active_token_id");
    if (storedId && tokens.length > 0) {
      const match = tokens.find((t) => t.id === storedId);
      if (match) setActiveToken(match);
    }
  }, [tokens]);


  // Mostrar carga mientras esperamos los datos
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  // Token listo para firma: debe estar en documents_pending y tener URL
  const tokenReadyToSign =
    activeToken?.state === "documents_pending" && !!activeToken.document_sign_url
      ? activeToken
      : null;

  const isReadyToSign = isVerified === "verified" && !!tokenReadyToSign;


  console.log("activeToken:", activeToken);
  console.log("tokenReadyToSign:", tokenReadyToSign);
  console.log("isReadyToSign:", isReadyToSign);
  console.log("isVerified:", isVerified);

  if (isVerified === "not_verified" || isVerified == "false") {
    return (
      <div className="rounded-tl-[30px] min-h-screen bg-[#101A28] text-white px-6 py-12 grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 md:gap-16 items-start">        <div className="relative md:sticky md:top-6">
        <InvestmentSteps currentStepIndex={2} completedSteps={[0, 1]} />
      </div>

        <div className="bg-[#101A28] border border-white rounded-lg p-8 text-center flex flex-col items-center gap-6 h-full pt-20">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg">2</div>
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

  else if ((isVerified === "verified" || isVerified == "true") && tokenReadyToSign == null) {
    return (
      <div className="rounded-tl-[30px] min-h-screen bg-[#101A28] text-white px-6 py-12 grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 md:gap-16 items-start">        <div className="relative md:sticky md:top-6">
        <InvestmentSteps completedSteps={[0, 1, 2]} />
      </div>

        <div className="bg-[#101A28] border border-white/30 rounded-lg p-8 text-center flex flex-col items-center gap-6 h-full pt-20">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg">2</div>

          <h2 className="text-2xl font-semibold">¡Ya estás cerca!</h2>

          <p className="text-base text-white leading-relaxed">
            ¡Enviaste tu transferencia con éxito! <br />
            Validaremos tu transferencia en un máximo de <strong>3 horas</strong>.
          </p>

          <p className="text-base text-white leading-relaxed mb-6">
            Una vez que hayamos validado tus <br /> transferencia, debes ir a firmar tu contrato
          </p>

          <button
            disabled={true}
            className={`bg-white text-gray-500 cursor-not-allowed text-gray-500 font-semibold py-2 px-6 rounded-md`}

          >
            Ir a firmar mi contrato
          </button>

          <p className="text-sm text-gray-400 -mt-2 mb-6">
            Este botón se habilitará cuando el <br /> equipo haya validado tu transferencia
          </p>

          <Link
            href="/protected/portfolio"
            className="bg-green-500 hover:bg-green-600 transition-colors px-6 py-3 rounded-md text-white font-semibold"
          >
            Ver mi portafolio
          </Link>
        </div>
      </div>
    );
  }


  else if ((isVerified === "verified" || isVerified == "true") && tokenReadyToSign && activeToken?.document_sign_url) {
    return (
      <div className="rounded-tl-[30px] min-h-screen bg-[#101A28] text-white px-6 py-12 grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 md:gap-16 items-start">
        <div className="relative md:sticky md:top-6">
          <InvestmentSteps completedSteps={[0, 1, 2]} />
        </div>

        <div className="bg-[#101A28] border border-white/30 rounded-lg p-8 text-center flex flex-col items-center gap-6 h-full pt-20">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg">4</div>

          <h2 className="text-2xl font-semibold">¡Último paso!</h2>

          <p className="text-base text-white leading-relaxed">
            Como último paso debes firmar tu contrato
          </p>

          <p className="text-base text-white leading-relaxed mb-6">
            Una vez que firmes, puedes regresar a <br /> esta página y ya habrás completado tu inversión
          </p>

          <Link
            href={activeToken.document_sign_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full font-semibold cursor-pointer"
            >
              Ir a firmar contrato
            </button>
          </Link>

          <p className="text-sm text-gray-400 -mt-2 mb-6">
            Si ya firmaste: <br /> <br />

            ¡Felicidades! 🥳🎉 <br />

            Puedes ver tu inversión completada en la sección “Mi portafolio”
          </p>

          <Link
            href="/protected/portfolio"
            className="bg-green-500 hover:bg-green-600 transition-colors px-6 py-3 rounded-md text-white font-semibold"
          >
            Ver mi portafolio
          </Link>
        </div>
      </div>
    );
  }

  else if (isVerified == "sent") {
    return (
      <div className="rounded-tl-[30px] min-h-screen bg-[#101A28] text-white px-12 py-12 grid grid-cols-[340px_1fr] gap-16 items-start">
        <div className="relative md:sticky md:top-6">
          <InvestmentSteps completedSteps={[0, 1, 2]} />
        </div>

        <div className="bg-[#101A28] border border-white/30 rounded-lg p-8 text-center flex flex-col items-center gap-6 h-full pt-20">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg">3</div>

          <h2 className="text-2xl font-semibold">¡Enviaste tus datos con éxito!</h2>

          <p className="text-base text-white leading-relaxed">
            Validaremos tus datos <strong>en un máximo de 3 horas</strong>.
          </p>

          <p className="text-base text-white leading-relaxed mb-6">
            Ya puedes firmar tu contrato de inversión.
          </p>

          <button
            disabled={!isReadyToSign}
            className={`py-2 px-6 rounded-md font-semibold
    ${isReadyToSign
                ? "bg-primary hover:bg-primary/80 text-white cursor-pointer"
                : "bg-white text-gray-500 cursor-not-allowed"}
  `}
            onClick={() => isReadyToSign}
          >
            Ir a firmar mi contrato
          </button>

          <Link
            href="/protected/portfolio"
            className="bg-green-500 hover:bg-green-600 transition-colors px-6 py-3 rounded-md text-white font-semibold"
          >
            Ver mi portafolio
          </Link>
        </div>
      </div>
    );
  }
}
