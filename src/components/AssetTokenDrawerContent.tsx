import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { AssetPopulated } from "types/models";
import { track } from "@/lib/gtag";
import { createClient } from "@/utils/supabase/client";

type Props = {
  assetToken: AssetPopulated;
  closeDrawer: () => void;
};

const AssetTokenDrawerContent: React.FC<Props> = ({
  assetToken,
  closeDrawer,
}) => {
  const [activeTab, setActiveTab] = useState(
    ["pending", "pre-funding", "kyc", "documents_pending"].includes(
      assetToken.state
    )
      ? "estatus"
      : "inversion"
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);


  // Add this state to track validation click
  const [hasClickedValidation, setHasClickedValidation] = useState(false);

  useEffect(() => {
    const validationClicked = localStorage.getItem(`validation_clicked_${assetToken.id}`);
    if (validationClicked) {
      setHasClickedValidation(true);
    }
  }, [assetToken.id]);

  const handleValidationClick = () => {
    localStorage.setItem(`validation_clicked_${assetToken.id}`, 'true');
    setHasClickedValidation(true);
    closeDrawer();
  };

  useEffect(() => {

    if (assetToken.state === "pre-funding") {
      track("pago_completo", {
        proyecto_id: assetToken.asset.id,
        monto: assetToken.num_shares * 100,
        user_id: user?.id,
      });
    }
  }, [assetToken.state, assetToken.asset.id, assetToken.num_shares, user?.id]);


  // const { isVerified } = useUserVerification();

  // const isKycRequired =
  //   (assetToken.state === "pre-funding" && !isVerified) ||
  //   assetToken.state === "kyc";

  const tabs = [
    {
      key: "inversion",
      label: "Inversión",
      disabled: assetToken.state !== "settled",
    },
    { key: "estatus", label: "Estatus", disabled: false },
    { key: "pagos", label: "Pagos", disabled: true },
    { key: "apreciacion", label: "Apreciación", disabled: true },
  ];


  useEffect(() => {

    if (assetToken.state === "documents_pending") {

      track("kyc_completo", {
        proyecto_id: assetToken.asset.id,
        user_id: user?.id,
      });
    }
  }, [assetToken.state, assetToken.asset.id, user?.id]);

  return (
    <div className="text-white flex flex-col space-y-6 p-3">
      {/* <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            disabled={tab.disabled}
            onClick={() => !tab.disabled && setActiveTab(tab.key)}
            className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${activeTab === tab.key
                ? "bg-primary text-foreground"
                : "bg-gray-700 text-gray-300"
              }
                ${tab.disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }
                transition
              `}
          >
            {tab.label}
          </button>
        ))}
      </div> */}

      {activeTab === "inversion" && (
        <>
          <div className="flex items-center space-x-2 mt-2">
            {/* <img src="/logo-lider.png" alt="Lider" className="h-6" /> */}
            <span className="font-bold text-lg">{assetToken.asset.name}</span>
          </div>

          <div>
            <span className="font-semibold">Dirección</span>
            <p className="text-sm">{assetToken.asset.address}</p>

            <Link href={`investments/${assetToken.asset.id}`} onClick={closeDrawer} >
              <span className="text-primary text-xs font-semibold">
                Ver detalle
              </span>
            </Link>

          </div>

          <div>
            <h3 className="font-bold text-base mb-2">
              Rentabilidad total anual estimada:{" "}
              <span className="text-primary">
                {(
                  assetToken.asset.rent_roi + assetToken.asset.apreciation_roi
                ).toFixed(2)}
                %
              </span>
            </h3>
            <ul className="text-xs list-disc ml-5 space-y-2">
              <li>
                Proveniente de alquileres: {assetToken.asset.rent_roi}% <br />
                <span className="text-gray-400"> (se recibe mensual)</span>
              </li>
              <li>
                Proveniente de apreciación del inmueble:{" "}
                {assetToken.asset.apreciation_roi}% <br />
                <span className="text-gray-400">
                  (se recibe al vender la propiedad)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">
              Información de tu inversión
            </h3>

            <div className="border border-primary rounded-lg p-4 my-6 text-center">
              <div className="text-primary font-semibold text-sm">
                Precio inicial del inmueble
              </div>
              <div className="text-white text-lg font-bold mb-2">
                S/ {assetToken.asset.total_price?.toLocaleString("es-PE")}
              </div>
              <div className="text-primary font-semibold text-sm">
                Participación:
              </div>
              <div className="text-primary text-2xl font-bold mb-1">
                {(
                  (assetToken.num_shares / assetToken.asset.total_shares) *
                  100
                ).toFixed(2)}
                %
              </div>
              <div className="text-white text-sm font-bold">
                S/ {(assetToken.num_shares * 100).toLocaleString("es-PE")}
              </div>
            </div>

            <div className="text-xs space-y-6">
              <div className="space-y-1">
                <div className="font-bold">
                  <span className="font-normal">Nombre de la sociedad:</span>{" "}
                  {assetToken.asset.spv_name}
                </div>
                <div className="font-bold">
                  <span className="font-normal">RUC:</span>{" "}
                  {assetToken.asset.spv_ruc}
                </div>
                {/* <div className="font-bold">
                  <span className="font-normal">Dirección Legal:</span>{" "}
                  {assetToken.asset.spv_address}
                </div>
                <div className="font-bold">
                  <span className="text-primary font-normal">
                    Descargar documentos legales
                  </span>
                </div> */}
              </div>
              <div className="space-y-1">
                <div className="font-bold">
                  <span className="font-normal">Nombre del inversor:</span>{" "}
                  {user?.user_metadata.full_name || user?.user_metadata.name}
                </div>
                <div className="font-bold">
                  <span className="font-normal">Rol:</span> Accionista
                  preferente
                </div>
                <div className="font-bold">
                  <span className="font-normal">Inversión:</span> S/{" "}
                  {(assetToken.num_shares * 100).toLocaleString("es-PE")}
                </div>
                {/* <div className="font-bold">
                  <span className="font-normal">Territorio comprado:</span>{" "}
                  {(
                    (assetToken.asset.square_cm * assetToken.num_shares) /
                    100
                  ).toFixed(2)}{" "}
                  cm
                  <sup className="text-2xs align-super">2</sup>
                </div>
                <div className="font-bold">
                  <span className="font-normal">
                    Participación del área total:
                  </span>{" "}
                  {(
                    (assetToken.num_shares / assetToken.asset.total_price) *
                    100
                  ).toFixed(2)}
                  %
                </div>
                <div className="text-primary font-semibold">
                  Relación accionistas
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "estatus" && (
        <div className="text-white mt-6 flex flex-col space-y-4">
          <h2 className="text-xl font-bold mb-2">{assetToken.asset.name}</h2>

          {assetToken.state === "pre-funding" && (
            <h3 className="text-lg font-semibold mb-2">
              Estamos validando tu transferencia bancaria, te informaremos
              apenas sea validada por el equipo.
            </h3>
          )}

          {assetToken.state === "kyc" && (
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Validación de identidad
              </h3>
              {hasClickedValidation ? (
                <p className="mb-2 text-yellow-400">
                  Validando tu identidad...
                </p>
              ) : (
                <>
                  <p className="mb-2">
                    Aquí debes validar tu identidad para cumplir con la normativa
                    peruana contra lavado de activos.
                  </p>
                  <Link href="/protected/validate-identity/">
                    <button
                      onClick={() => {
                        track("inicio_kyc", {
                          proyecto_id: assetToken.asset.id,
                          user_id: user?.id,
                        });
                        handleValidationClick();
                      }}
                      className="bg-primary text-white px-4 py-2 rounded mb-4 w-full cursor-pointer"
                    >
                      Iniciar validación
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}

          {assetToken.state === "documents_pending" &&
            assetToken.document_sign_url && (
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Firma de contrato
                </h3>
                <p className="mb-2">
                  Cómo último paso para completar tu inversión debes firmar tu
                  contrato que respaldará tu inversión.
                </p>
                <Link
                  href={assetToken.document_sign_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    onClick={() => {
                      track("firma_contrato", {
                        proyecto_id: assetToken.asset.id,
                        user_id: user?.id,
                      });
                      closeDrawer();
                    }}
                    className="bg-primary text-white px-4 py-2 rounded w-full cursor-pointer"
                  >
                    Ir a firmar contrato
                  </button>
                </Link>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default AssetTokenDrawerContent;
