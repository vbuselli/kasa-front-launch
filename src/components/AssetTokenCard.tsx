"use client";
import { AssetPopulated } from "types/models";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDrawer } from "context/DrawerContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
export type AssetTokenCardProps = AssetPopulated;

const stateTitles: Record<string, string> = {
  pending: "Envío de pago pendiente",
  "pre-funding": "Verificación de pago pendiente",
  kyc: "Validación de datos personales pendiente",
  documents_pending: "Esperando firma de contrato",
  cancelled: "Inversión cancelada",
  expired: "Inversión expirada",
};

const stateDescriptions: Record<string, string> = {
  pending: "El proceso de compra continuará una vez verificado el pago",
  "pre-funding": "Un administrador está revisando tu pago",
  kyc: "El contrato se generará una vez verificados tus datos personales",
  documents_pending: "Por favor, firma el contrato para completar la inversión",
  cancelled:
    "Tu inversión fue rechazada. Revisa tu correo para más información.",
  expired: "Tu inversión ha expirado. Revisa tu correo para más información.",
};

export default function AssetTokenCard(assetToken: AssetTokenCardProps) {
  const [currentSrc, setCurrentSrc] = useState<string>();
  const { openDrawer } = useDrawer();
  const router = useRouter();

  const {
    state,
    asset: { id, name, address, total_shares, owned_shares },
  } = assetToken;

  const boughtPercent = owned_shares
    ? Math.round((owned_shares / total_shares) * 100)
    : 0;

  const completed = owned_shares === total_shares;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imagesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${id}/images`,
          {
            next: {
              revalidate: 60,
            },
          }
        );

        if (imagesResponse.ok) {
          const images: string[] = await imagesResponse.json();
          setCurrentSrc(images[0]);
        }
      } catch { }
    };

    fetchImage();
  }, [id]);

  if (state === "expired") {
    return (<></>)
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group h-100">
      {state !== "settled" && (
        <>
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-between h-45">
            <div className="bg-white rounded-xl shadow-xl px-6 py-4 text-center w-60 h-full">
              <div className="font-bold text-foreground text-sm mb-1">
                {stateTitles[state]}
              </div>
              <div className="text-gray-600 text-xs">
                {stateDescriptions[state]}
              </div>
            </div>
            <Link
              className="bg-yellow-400 mt-3 hover:bg-yellow-500 text-foreground font-semibold py-2 px-6 rounded-lg shadow-lg cursor-pointer transition-colors"
              href="/protected/success"
              onClick={() => {
                localStorage.setItem("active_token_id", assetToken.id); // <- esto sí guarda el token en DrawerContext
              }}
            >
              Completar Inversión
            </Link>


          </div>
        </>
      )}

      {currentSrc && (
        <Image
          src={currentSrc}
          alt={name}
          fill
          className="object-cover w-full h-60 transition-transform group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-2xl font-semibold text-white">{name}</h3>
        <p className="text-sm text-gray-300">{address}</p>
        <div className="mt-2 h-3 bg-black/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${completed ? "bg-primary" : "bg-yellow-400"
              }`}
            style={{ width: `${Math.min(boughtPercent, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-200 font-semibold">
          {boughtPercent}% comprado
        </p>
        {state === "settled" && (
          <button
            className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg cursor-pointer"
            onClick={() => openDrawer(assetToken)}
          >
            Ver inversión
          </button>
        )}
      </div>
    </div>
  );
}
