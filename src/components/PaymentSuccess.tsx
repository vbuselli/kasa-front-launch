"use client";
import Image from "next/image";
import Link from "next/link";
import Character from "@/assets/Character.png";

export default function PaymentSuccess() {
  return (
    <section className="bg-foreground text-white py-16 px-8 rounded-tl-[30px] flex-1">
      <div className="container mx-auto text-center space-y-6">
        <h1 className="text-4xl font-extrabold">¡Listo! Estás a punto de convertirte en inversionista inmobiliario 🏠</h1>
        <div className="mx-auto w-48 h-48 relative">
          <Image
            src={Character}
            alt="Pago registrado"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-lg text-gray-300">
          Tu fracción está en proceso y tu futuro financiero acaba de dar un gran paso.
          <br />
          ➡ Estamos validando tu transferencia (puede demorar hasta 24 horas hábiles).
          🧾 Te confirmaremos por correo.
          <br />
          ¿Tienes dudas? Visita nuestro Centro de <a href="https://intercom.help/inviertekasa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-green-600 underline transition-colors">Ayuda</a> o escríbenos a soporte@inviertekasa.com.
        </p>
        <Link href="/protected/portfolio/">
          <button className="mt-4 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer">
            Ver mi portafolio
          </button>
        </Link>
      </div>
    </section>
  );
}
