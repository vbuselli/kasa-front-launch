import Link from "next/link";
import React from "react";
import { AssetPopulated } from "types/models";

type Props = {
  assetToken: AssetPopulated;
};

const AssetTokenDrawerContent: React.FC<Props> = ({ assetToken }) => {
  return (
    <div className="text-white mt-6 flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <span className="bg-[#1ED760] text-black px-3 py-1 rounded-full text-xs font-semibold">
            Inversión
          </span>
          <span className="bg-[#1ED760] text-black px-3 py-1 rounded-full text-xs font-semibold">
            Estatus
          </span>
          <span className="bg-[#1ED760] text-black px-3 py-1 rounded-full text-xs font-semibold">
            Pagos
          </span>
          <span className="bg-[#1ED760] text-black px-3 py-1 rounded-full text-xs font-semibold">
            Apreciación
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <img src="/logo-lider.png" alt="Lider" className="h-6" />
          <span className="font-bold text-lg">Los Viñedos de Surco</span>
        </div>
        <div>
          <span className="font-semibold">Dirección</span>
          <p className="text-sm">{assetToken.asset.address}</p>
          <Link href="#" className="text-[#1ED760] text-xs font-semibold">
            Ver detalle
          </Link>
        </div>
      </div>

      <div className="bg-[#1a2b3c] rounded-lg p-4">
        <h3 className="font-bold text-base mb-2">
          Rentabilidad total anual estimada:{" "}
          <span className="text-[#1ED760]">10.9%</span>
        </h3>
        <ul className="text-xs list-disc ml-5">
          <li>
            Proveniente de alquileres: 3.9%{" "}
            <span className="text-gray-400">(se recibe mensual)</span>
          </li>
          <li>
            Proveniente de apreciación del inmueble: 7%{" "}
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
        <div className="border border-[#1ED760] rounded-lg p-4 mb-4">
          <div className="text-[#1ED760] font-semibold text-sm">
            Precio inicial del inmueble
          </div>
          <div className="text-white text-lg font-bold mb-2">
            S/{" "}
            {
              /* assetToken.asset.price?.toLocaleString("es-PE") ?? */ "271,500.00"
            }
          </div>
          <div className="text-[#1ED760] font-semibold text-sm">
            Participación:
          </div>
          <div className="text-[#1ED760] text-2xl font-bold mb-1">
            {(/* assetToken.percentage ?? */ 0 * 100).toFixed(2)}%
          </div>
          <div className="text-white text-lg font-bold">
            S/{" "}
            {
              /* assetToken.amount_invested?.toLocaleString("es-PE") ?? */ "1,940.00"
            }
          </div>
        </div>
        <div className="text-xs space-y-1">
          <div>
            <span className="font-semibold">Nombre de la sociedad:</span>{" "}
            {/* assetToken.asset.company_name ?? */ "Departamento 1 S.A."}
          </div>
          <div>
            <span className="font-semibold">RUC:</span>{" "}
            {/* assetToken.asset.company_ruc ?? */ "00000000000"}
          </div>
          <div>
            <span className="font-semibold">Tipo de sociedad:</span> Sociedad
            Anónima
          </div>
          <div>
            <Link href="#" className="text-[#1ED760] font-semibold">
              Descargar documentos legales
            </Link>
          </div>
          <div className="mt-2">
            <span className="font-semibold">Nombre del inversor:</span>{" "}
            {/* assetToken.investor_name ?? */ "Omar Contreras"}
          </div>
          <div>
            <span className="font-semibold">Rol:</span> Accionista
          </div>
          <div>
            <span className="font-semibold">Inversión:</span> S/{" "}
            {
              /* assetToken.amount_invested?.toLocaleString("es-PE") ?? */ "1,940.00"
            }
          </div>
          <div>
            <span className="font-semibold">Territorio comprado:</span>{" "}
            {/* assetToken.territory_cm2 ?? */ "3.5772"} cm2
          </div>
          <div>
            <span className="font-semibold">Participación del área total:</span>{" "}
            {/* assetToken.percentage ?? */ (0.0074).toFixed(4)}%
          </div>
          <div>
            <Link href="#" className="text-[#1ED760] font-semibold">
              Relación accionistas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTokenDrawerContent;
