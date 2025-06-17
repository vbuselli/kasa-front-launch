import Image from "next/image";
import Link from "next/link";
import Whatsapp from "@/assets/icons/whatsapp.svg";

export default function WhatsappButton() {
  return (
    <Link
      href="https://wa.me/51960400734?text=%C2%A1Hola!%20quisiera%20conversar%20con%20alguien%20del%20equipo%20de%20Kasa%20por%20favor%20%F0%9F%8F%A0 "
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatea con nosotros por WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      <span className="rounded-full shadow-lg bg-[#25D366] hover:bg-[#1ebe57] transition-colors w-14 h-14 flex items-center justify-center">
        <Image
          src={Whatsapp}
          className="text-white"
          alt="WhatsApp"
          width={32}
          height={32}
        />
      </span>
    </Link>
  );
}
