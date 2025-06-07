import React from "react";
import { useUserVerification } from "context/UserVerificationContext";
import Link from "next/link";
import { AssetPopulated } from "types/models";

type Props = {
  assetToken: AssetPopulated;
  closeDrawer: () => void;
};

const AssetTokenPendingDrawerContent: React.FC<Props> = ({
  assetToken,
  closeDrawer,
}) => {
  const { isVerified } = useUserVerification();

  const isKycRequired =
    (assetToken.state === "pre-funding" && !isVerified) ||
    assetToken.state === "kyc";

  return (
    <div className="text-white mt-6 flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-2">{assetToken.asset.name}</h2>

      {assetToken.state === "pre-funding" && (
        <h3 className="text-lg font-semibold mb-2">
          Estamos validando tu transferencia bancaria, te informaremos apenas
          sea validada por el equipo.
        </h3>
      )}

      {isKycRequired && (
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Validación de identidad
          </h3>
          <p className="mb-2">
            Aquí debes validar tu identidad para cumplir con la normativa
            peruana contra lavado de activos.
          </p>
          <Link href="/protected/validate-identity/">
            <button
              onClick={closeDrawer}
              className="bg-primary text-white px-4 py-2 rounded mb-4 w-full cursor-pointer"
            >
              Iniciar validación
            </button>
          </Link>
        </div>
      )}

      {["documents_pending"].includes(assetToken.state) &&
        assetToken.document_sign_url && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Firma de contrato</h3>
            <p className="mb-2">
              Cómo último paso para completar tu inversión debes firmar tu
              contrato que respaldará tu inversión.
            </p>
            <Link href={assetToken.document_sign_url}>
              <button
                onClick={closeDrawer}
                className="bg-primary text-white px-4 py-2 rounded w-full cursor-pointer"
              >
                Ir a firmar contrato
              </button>
            </Link>
          </div>
        )}
    </div>
  );
};

export default AssetTokenPendingDrawerContent;
