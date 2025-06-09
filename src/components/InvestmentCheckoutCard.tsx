"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AssetPopulated } from "types/models";
import { useInvestmentShare } from "context/InvestmentContext";
import LoaderSpinner from "./ui/LoaderSpinner";
import ReservationTimer from "./ReservationTimer";
import { useFormContext } from "react-hook-form";

const formatCurrency = (value: number) =>
  `S/ ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

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

  const {
    expires_at,
    asset: { id, total_price, square_cm, rent_roi, apreciation_roi, name },
  } = asset_token;

  const [terms, setTerms] = useState(false);
  const [ownership, setOwnership] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();


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
      <ReservationTimer endDate={expires_at} />
      <div className="w-full bg-transparent border text-white border-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Detalle de tu inversión</h2>

        <div className="flex flex-row items-start gap-4 border-b border-white pb-4">
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
          </div>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Área total:</span>
          <span className="font-bold">
            {square_cm} cm<sup>2</sup>
          </span>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="font-medium">Ganancia anual esperada:</p>
            <span className="text-sm text-gray-400">
              (Alquiler + Apreciación)
            </span>
          </div>
          <span className="font-bold text-nowrap">
            {formatCurrency(
              ((rent_roi + apreciation_roi) * investmentAmount) / 100
            )}
          </span>
        </div>

        <div className="flex justify-between">
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

        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium mb-1">Gastos operativos:</p>
            <ul className="list-disc list-inside text-sm text-gray-400">
              <li>Gastos legales</li>
              <li>Gastos por transacción</li>
              <li>Gasto por servicio Kasa</li>
            </ul>
          </div>
          <span className="font-bold">
            {!commission ? <LoaderSpinner /> : formatCurrency(commission)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Monto a pagar:</span>
          <span className="font-bold">
            {!commission ? (
              <LoaderSpinner />
            ) : (
              formatCurrency(investmentAmount + commission)
            )}
          </span>
        </div>

        <div className="text-gray-400 text-xs">
          <sup>*</sup>Recuerda que recibirás tus ganancias por alquiler
          mensualmente y la ganancia por apreciación cuando se venda el
          inmueble.
        </div>

        <div className="mb-0 lg:mb-8 bg-transparent rounded-md border border-white text-white p-6">
          <h2 className="text-xl font-semibold mb-4">Datos para transferencia</h2>
          <div className="space-y-4">
            <div>
              <label className="inline-flex items-start">
                <input
                  type="checkbox"
                  name="ownership"
                  className="mr-2 mt-1.5 scale-125"
                  required
                  checked={ownership}
                  onChange={(e) => setOwnership(e.target.checked)}
                />
                Declaro que la cuenta bancaria desde la cual realizaré la
                transferencia me pertenece personalmente.
              </label>
            </div>

            <div>
              <label className="inline-flex items-start">
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
              Mostrar cuenta para transferir fondos
            </button>

            {terms && ownership && showAccount && (
              <div className="space-y-4 mt-6">
                <div>
                  <span className="block text-sm font-medium mb-1">Banco</span>
                  <div className="py-2">{asset_token.asset.bank_name}</div>
                </div>
                <div>
                  <span className="block text-sm font-medium mb-1">CCI</span>
                  <div className="py-2">{asset_token.asset.bank_cci}</div>
                </div>
                <div>
                  <span className="block text-sm font-medium mb-1">
                    Número de cuenta
                  </span>
                  <div className="py-2">
                    {asset_token.asset.bank_number_account}
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
                    className="w-full border rounded px-3 py-2 text-white"
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
                    className="w-full border rounded px-3 py-2 text-white"
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
                    className="w-full border rounded px-3 py-2 text-white"
                    placeholder="Ingresa el origen de los fondos"
                    {...register("funds_origin")}
                  />
                  {errors.funds_origin && (
                    <span className="text-red-400 text-xs">
                      {errors.funds_origin.message as string}
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
                  className="w-full bg-primary hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                  disabled={loading || isButtonDisabled}
                >
                  {loading ? "Procesando..." : "Invertir"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
