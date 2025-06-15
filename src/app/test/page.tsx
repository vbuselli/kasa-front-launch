"use client";

import React, { useState } from 'react';

export default function BankFormTest() {
  const [loading, setLoading] = useState(false);
  
  // Hardcoded values
  const asset_token = {
    asset: {
      bank_name: "Banco de Crédito del Perú",
      bank_cci: "002-215-001234567890-91",
      bank_number_account: "215-1234567890"
    }
  };
  
  const spv_ruc = "20123456789";
  const spv_name = "EMPRESA INVERSIONES SAC";
  const toast = "";

  const handleSubmit = (e : any) => {
    e.preventDefault();
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      alert("Formulario enviado correctamente");
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-center">Datos Bancarios</h2>
      
      <div className="space-y-4">
          <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 pb-2 md:border-b-0 md:pb-0">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Banco</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{asset_token.asset.bank_name}</span>
                <span
                  onClick={() => navigator.clipboard.writeText(asset_token.asset.bank_name)}
                  className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400"
                  title="Copiar"
                >
                  ⧉
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 pb-2 md:border-b-0 md:pb-0">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">CCI</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{asset_token.asset.bank_cci}</span>
                <span
                  onClick={() => navigator.clipboard.writeText(asset_token.asset.bank_cci)}
                  className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400"
                  title="Copiar"
                >
                  ⧉
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 pb-2 md:border-b-0 md:pb-0">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Número de cuenta</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{asset_token.asset.bank_number_account}</span>
                <span
                  onClick={() => navigator.clipboard.writeText(asset_token.asset.bank_number_account)}
                  className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400"
                  title="Copiar"
                >
                  ⧉
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:border md:border-white md:rounded-lg md:p-4 border-b border-gray-600 pb-2 md:border-b-0 md:pb-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">RUC</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{spv_ruc}</span>
                <span
                  onClick={() => navigator.clipboard.writeText(spv_ruc)}
                  className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400"
                  title="Copiar"
                >
                  ⧉
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Razón Social</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{spv_name}</span>
                <span
                  onClick={() => navigator.clipboard.writeText(spv_name)}
                  className="cursor-pointer hover:opacity-70 transition-opacity text-gray-400"
                  title="Copiar"
                >
                  ⧉
                </span>
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
              defaultValue="TXN123456789"
            />
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
            />
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
              defaultValue="Ahorros personales"
            />
          </div>
          
          {toast && (
            <div className="bg-red-600 text-white px-4 py-2 rounded mb-2 text-center max-w-2xs mx-auto">
              {toast}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Enviar"}
          </button>
        </div>
    </div>
  );
}