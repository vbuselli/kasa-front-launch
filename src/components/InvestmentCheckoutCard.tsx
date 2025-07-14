"use client";
import { track } from "@/lib/gtag";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AssetPopulated } from "types/models";
import { useInvestmentShare } from "context/InvestmentContext";
import LoaderSpinner from "./ui/LoaderSpinner";
import ReservationTimer from "./ReservationTimer";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

const formatCurrency = (value: number) =>
  `S/ ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// Popup Modal Component
function ExpirationModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleReturnToInvestments = () => {
    router.push('/protected/investments');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Reserva Expirada
          </h3>
          <p className="text-sm text-gray-500">
            ⏰ ¡Ups! Tu reserva de fracciones expiró
            Pasaron 30 minutos y no llegaste a confirmar el pago.
            Pero tranqui, aún puedes invertir en este proyecto.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleReturnToInvestments}
            className="w-full bg-primary hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Volver a Proyectos
          </button>
          <p className="text-sm text-gray-600 text-center mt-2">
            <strong>¿Tienes dudas?</strong> Visita nuestro{" "}
            <a
              href="https://intercom.help/inviertekasa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-green-600 underline transition-colors"
            >
              Centro de Ayuda
            </a>{" "}
            o escríbenos a{" "}
            <a
              href="mailto:soporte@inviertekasa.com"
              className="text-primary hover:text-green-600 underline transition-colors"
            >
              soporte@inviertekasa.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function InvestmentCheckoutCard({
  asset_token,
  loading,
  toast,
  isButtonDisabled = false,
}: {
  asset_token: AssetPopulated;
  loading: boolean;
  toast?: string | null;
  isButtonDisabled?: boolean;
}) {
  const { investmentAmount, commission, setPropertyValue } =
    useInvestmentShare();
  const [imgSrc, setImgSrc] = useState<string>();
  const [showExpirationModal, setShowExpirationModal] = useState(false);

  const {
    expires_at,
    asset: { id, total_price, square_cm, rent_roi, apreciation_roi, name, spv_ruc, spv_name, project_duration },
  } = asset_token;

  const [terms, setTerms] = useState(false);
  const [ownership, setOwnership] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Handle reservation expiration
  const handleReservationExpired = () => {
    setShowExpirationModal(true);
  };

  useEffect(() => {
    const imagesRequest = async () => {
      const imagesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${id}/images`,
        {
          next: {
            revalidate: 60,
          },
        }
      );

      const images: string[] = await imagesResponse.json();
      setImgSrc(images[0]);
    };

    imagesRequest();
    setPropertyValue(total_price);
  }, [id, total_price, setPropertyValue]);



  return (
    <>
      
      <div className="flex flex-col items-center justify-center mx-auto w-full md:w-3/4">
        <ReservationTimer
          endDate={expires_at}
          onExpired={handleReservationExpired}
        />
        {/* Main container - no border/padding on mobile, border/padding on desktop */}
        <div className="w-full bg-transparent border-0 md:border text-white md:border-white rounded-none md:rounded-lg shadow-none md:shadow-lg p-0 md:p-6 space-y-4">
          <h2 className="text-xl font-semibold px-4 md:px-0">Detalle de tu inversión</h2>

          <div className="flex flex-row items-start gap-4 border-b border-white pb-4 px-4 md:px-0">
            <div className="relative w-1/2 h-40 rounded-lg overflow-hidden mb-4">
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt="Proyecto"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="w-1/2 flex flex-col justify-center">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-base text-gray-300">Lima</p>
              <p className="text-base text-gray-300">Duración del proyecto: {project_duration} años</p>
            </div>
          </div>

          <div className="flex justify-between px-4 md:px-0">
            <span className="font-medium">Área por adquirir:</span>
            <span className="font-bold">
              {/*TODO: esto es un hack para calcular el área total en cm²*/}
              {(square_cm * ((investmentAmount / 100) / asset_token.asset.total_shares)).toFixed(2)} cm<sup>2</sup>
            </span>
          </div>

          <div className="flex justify-between px-4 md:px-0">
            <div>
              <p className="font-medium">Inversión efectiva:</p>
              <span className="text-sm text-gray-400">
                (Está será tu inversión final)
              </span>
            </div>
            <span className="font-bold text-nowrap">
              {formatCurrency(investmentAmount)}
            </span>
          </div>

          <div className="flex justify-between px-4 md:px-0">
            <div>
              <p className="font-medium">Ganancia total estimada:</p>
              <span className="text-sm text-gray-400">
                alquiler + apreciación
              </span>
            </div>
            <span className="font-bold text-nowrap">
              {formatCurrency(
                ((rent_roi / 100) * project_duration * investmentAmount) +
                (Math.pow((1 + apreciation_roi / 100), project_duration) - 1) * investmentAmount
              )}
            </span>
          </div>

          <div className="flex justify-between px-4 md:px-0">
            <div>
              <p className="text-sm font-medium mb-1">Gastos operativos (obligación adicional):</p>
              <ul className="list-disc list-inside text-sm text-gray-400">
                <li>Gastos legales</li>
                <li>Gastos por transacción</li>
                <li>Gasto por servicio Kasa</li>
                <li>
                  <a
                    href="https://intercom.help/inviertekasa/es/collections/13211888-pagos-y-transferencias"
                    className="underline hover:text-gray-300 transition-colors duration-200"
                  >
                    Más información sobre los gastos operativos
                  </a>
                </li>
              </ul>
            </div>
            <span className="font-bold text-nowrap flex-shrink-0">
              {!commission ? <LoaderSpinner /> : formatCurrency(commission)}
            </span>
          </div>

          <div className="px-4 md:px-0">
            <div className="text-primary text-center text-3xl">Monto total a transferir:</div>
            <div className="text-center font-bold text-4xl">
              {!commission ? (
                <LoaderSpinner />
              ) : (
                formatCurrency(investmentAmount + commission)
              )}
            </div>
          </div>

          <div className="text-gray-400 text-xs px-4 md:px-0">
            <sup>*</sup>Recuerda que recibirás tus ganancias por alquiler
            mensualmente y la ganancia por apreciación cuando se venda el
            inmueble.
          </div>

          {/* Transfer data section - no border/padding on mobile */}
          <div className="mb-0 lg:mb-8 bg-transparent rounded-none md:rounded-md border-0 md:border md:border-white text-white p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Datos para transferencia</h2>
            <div className="space-y-4">
              <div>
                <label className="inline-flex items-start text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    name="ownership"
                    className="mr-2 mt-1.5 scale-125"
                    required
                    checked={ownership}
                    onChange={(e) => setOwnership(e.target.checked)}
                  />
                  Declaro ser mayor de 18 años y que la cuenta bancaria desde la cual realizaré la
                  transferencia me pertenece personalmente.
                </label>
              </div>

              <div>
                <label className="inline-flex items-start text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    name="terms"
                    className="mr-2 mt-1.5 scale-125"
                    required
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  He leído y acepto los Términos y Condiciones, la Política de
                  Privacidad y la Política de Prevención de Lavado de Activos.
                </label>
              </div>

              <button
                type="button"
                className="w-full bg-primary hover:bg-green-600 font-semibold text-white py-3 rounded-md disabled:opacity-50 cursor-pointer"
                disabled={!terms || !ownership}
                onClick={() => setShowAccount(true)}
              >
                Continuar
              </button>

              {terms && ownership && showAccount && (
                <div className="space-y-4 mt-6">
                  <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 md:border-b md:border-b-white md:pb-0 pb-2">
                    <div className="flex justify-between items-center min-h-0">
                      <span className="text-sm font-medium flex-shrink-0 mr-2">Banco</span>
                      <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                        <span className="text-sm font-bold break-words text-right max-w-full overflow-hidden">
                          {asset_token.asset.bank_name}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(asset_token.asset.bank_name)}
                          className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400 flex-shrink-0"
                          title="Copiar"
                        >
                          ⧉
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 md:border-b md:border-b-white md:pb-0 pb-2">
                    <div className="flex justify-between items-center min-h-0">
                      <span className="text-sm font-medium flex-shrink-0 mr-2">CCI</span>
                      <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                        <span className="text-sm font-bold break-all text-right max-w-full overflow-hidden font-mono">
                          {asset_token.asset.bank_cci}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(asset_token.asset.bank_cci)}
                          className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400 flex-shrink-0"
                          title="Copiar"
                        >
                          ⧉
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 md:border-b md:border-b-white md:pb-0 pb-2">
                    <div className="flex justify-between items-center min-h-0">
                      <span className="text-sm font-medium flex-shrink-0 mr-2">Número de cuenta</span>
                      <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                        <span className="text-sm font-bold break-all text-right max-w-full overflow-hidden font-mono">
                          {asset_token.asset.bank_number_account}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(asset_token.asset.bank_number_account)}
                          className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400 flex-shrink-0"
                          title="Copiar"
                        >
                          ⧉
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 md:border-b md:border-b-white md:pb-0 pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center min-h-0">
                        <span className="text-sm font-medium flex-shrink-0 mr-2">RUC</span>
                        <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                          <span className="text-sm font-bold break-all text-right max-w-full overflow-hidden font-mono">
                            {spv_ruc}
                          </span>
                          <button
                            onClick={() => navigator.clipboard.writeText(spv_ruc)}
                            className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400 flex-shrink-0"
                            title="Copiar"
                          >
                            ⧉
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center min-h-0">
                        <span className="text-sm font-medium flex-shrink-0 mr-2">Razón Social</span>
                        <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                          <span className="text-sm font-bold break-words text-right max-w-full overflow-hidden">
                            {spv_name}
                          </span>
                          <button
                            onClick={() => navigator.clipboard.writeText(spv_name)}
                            className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400 flex-shrink-0"
                            title="Copiar"
                          >
                            ⧉
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="transaction_number"
                    >
                      Número de transacción
                    </label>
                    <input
                      id="transaction_number"
                      type="text"
                      className="w-full border border-gray-600 bg-gray-800 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500"
                      placeholder="Ingresa el número de transacción"
                      {...register("transaction_number")}
                    />
                    {errors.transaction_number && (
                      <span className="text-red-400 text-xs">
                        {errors.transaction_number.message as string}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="voucherImage"
                    >
                      Comprobante de transferencia (imagen)
                    </label>
                    <input
                      id="voucherImage"
                      type="file"
                      accept="image/*"
                      className="w-full border border-gray-600 bg-gray-800 rounded px-3 py-2 text-white file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-green-600 file:text-white hover:file:bg-green-700"
                      {...register("voucherImage")}
                    />
                    {errors.voucherImage && (
                      <span className="text-red-400 text-xs">
                        {errors.voucherImage.message as string}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="funds_origin"
                    >
                      Origen de los fondos
                    </label>
                    <input
                      id="funds_origin"
                      type="text"
                      className="w-full border border-gray-600 bg-gray-800 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500"
                      placeholder="Ahorros, salario, préstamo, otro (especificar)"
                      {...register("funds_origin")}
                    />
                    {errors.funds_origin && (
                      <span className="text-red-400 text-xs">
                        {errors.funds_origin.message as string}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="referral_code"
                    >
                      Código de referencia (opcional)
                    </label>
                    <input
                      id="referral_code"
                      type="text"
                      className="w-full border border-gray-600 bg-gray-800 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500"
                      placeholder="Ingresa tu código de referencia"
                      {...register("referral_code")}
                    />
                    {errors.referral_code && (
                      <span className="text-red-400 text-xs">
                        {errors.referral_code.message as string}
                      </span>
                    )}
                  </div>
                  {toast && (
                    <div className="bg-red-600 text-white px-4 py-2 rounded mb-2 text-center max-w-2xs mx-auto">
                      {toast}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                    disabled={loading || isButtonDisabled}
                    onClick={() => {
                      track("inicio_pago", {
                        monto: investmentAmount,
                        proyecto_id: asset_token.asset.id,
                        spv: asset_token.asset.spv_name,
                      });
                    }}
                  >
                    {loading ? "Procesando..." : "Enviar"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expiration Modal */}
      <ExpirationModal
        isOpen={showExpirationModal}
        onClose={() => setShowExpirationModal(false)}
      />
    </>
  );
}