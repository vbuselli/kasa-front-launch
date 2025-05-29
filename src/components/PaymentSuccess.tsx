"use client";
import Image from "next/image";
import Link from "next/link";
import Character from "@/assets/Character.png";

export default function PaymentSuccess() {
  return (
    <section className="bg-gray-900 text-white py-16 px-8 rounded-bl-3xl">
      <div className="container mx-auto text-center space-y-6">
        <h1 className="text-4xl font-extrabold">¡Enhorabuena!</h1>
        <div className="mx-auto w-48 h-48 relative">
          <Image
            src={Character}
            alt="Pago registrado"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-lg text-gray-300">
          Tu pago ha sido registrado!
          <br />
          Mientras validamos tu voucher, puedes ver el estado de tu pago en tu
          portafolio.
        </p>
        <Link href="/portfolio/1">
          <button className="mt-4 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer">
            Ver mi portafolio
          </button>
        </Link>
      </div>
    </section>
  );
}
