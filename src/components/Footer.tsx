"use client";

import Link from "next/link";
import Image from "next/image";
import Facebook from "@/assets/footer/facebook.png";
import Instagram from "@/assets/footer/instagram.png";
import WhatsApp from "@/assets/footer/whatsapp.png";
import Logo from "@/assets/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-foreground pb-12 px-12 relative">
      <div className="container mx-auto px-20 bg-background pt-12 pb-24 rounded-br-[30px] rounded-bl-[30px] shadow-inset-full flex flex-col lg:flex-row items-start justify-between space-y-8 lg:space-y-0">
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="flex items-center w-full">
              <Image src={Logo} alt="Kasa logo" width={180} height={53} />
            </div>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-12">
          <div>
            <h4 className="text-foreground font-bold text-lg mb-3">
              Acerca de
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/team">Nuestro equipo</Link>
              </li>
              <li>
                <Link href="/values">Nuestros valores</Link>
              </li>
              <li>
                <Link href="/investors">Inversionistas Venture Capital</Link>
              </li>
              <li>
                <Link href="/faq">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link href="/contact">Información de contacto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold text-lg mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/legal">Aspectos legales de Kasa</Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-bold text-lg mb-3">Síguenos</h4>
          <div className="flex space-x-4 text-gray-600">
            <Link
              href="https://facebook.com"
              className="bg-foreground p-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            >
              <Image
                alt="Facebook"
                width={32}
                height={32}
                src={Facebook}
              ></Image>
            </Link>
            <Link
              href="https://instagram.com"
              className="bg-foreground p-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            >
              <Image
                alt="Instagram"
                width={32}
                height={32}
                src={Instagram}
              ></Image>
            </Link>
            <Link
              href="https://wa.me/"
              className="bg-foreground p-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            >
              <Image
                alt="WhatsApp"
                width={30}
                height={30}
                src={WhatsApp}
              ></Image>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
