"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { AssetPopulated } from "types/models";

export default function InvestmentDetails({
  asset_token,
}: {
  asset_token: AssetPopulated;
}) {
  const [terms, setTerms] = useState(false);
  const [ownership, setOwnership] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
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
          <blockquote className="border-l-4 border-primary pl-4 text-sm text-gray-300 mt-2">
            Al seleccionar esta opción, afirmo que soy el titular de la cuenta
            bancaria desde la cual se transferirán los fondos para esta
            inversión. Reconozco que Kasa podrá solicitar información adicional
            en caso de que se detecten inconsistencias con los datos
            proporcionados.
          </blockquote>
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
          <blockquote className="border-l-4 border-primary pl-4 text-sm text-gray-300 mt-2">
            Al continuar, acepto los términos legales que regulan el uso de la
            plataforma Kasa, incluyendo las condiciones aplicables a las
            inversiones realizadas y el tratamiento de mis datos personales.
          </blockquote>
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
          </div>
        )}
      </div>
    </div>
  );
}
