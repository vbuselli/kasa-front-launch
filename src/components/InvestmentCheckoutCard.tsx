"use client";
import Link from "next/link";
import { FC } from "react";

export type InvestmentCheckoutCardProps = {
  areaTotal: number;
  amountToPay: number;
  operationalFees: number;
  effectiveInvestment: number;
  expectedAnnualGain: number;
  onInvest: () => void;
};

const formatCurrency = (value: number) =>
  `S/ ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const InvestmentCheckoutCard: FC<InvestmentCheckoutCardProps> = ({
  areaTotal,
  amountToPay,
  operationalFees,
  effectiveInvestment,
  expectedAnnualGain,
  onInvest,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold">Detalle de tu inversión</h2>

      <div className="flex justify-between">
        <span className="text-gray-600">Área total:</span>
        <span className="font-medium">
          {areaTotal.toLocaleString()} cm<sup>2</sup>
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Monto a pagar:</span>
        <span className="font-medium text-gray-800">
          {formatCurrency(amountToPay)}
        </span>
      </div>

      <div className="bg-gray-100 p-3 rounded">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Gastos operativos:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          <li>Gastos legales</li>
          <li>Gastos por transacción</li>
          <li>Gasto por servicio Kasa</li>
        </ul>
        <div className="mt-2 flex justify-between font-medium text-gray-800">
          <span>Total:</span>
          <span>{formatCurrency(operationalFees)}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Inversión efectiva:</span>
        <span className="font-medium text-gray-800">
          {formatCurrency(effectiveInvestment)}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Ganancia anual esperada:</span>
        <span className="font-medium text-gray-800">
          {formatCurrency(expectedAnnualGain)}
        </span>
      </div>

      <Link href={"/success"}>
        <button
          onClick={onInvest}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
        >
          Invertir
        </button>
      </Link>
    </div>
  );
};

export default InvestmentCheckoutCard;
