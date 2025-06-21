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
                <Link 
                  href="https://intercom.help/inviertekasa/es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="https://intercom.help/inviertekasa/es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link 
                  href="https://drive.google.com/file/d/1HSf3dvCssOkjMe48U90r7tPRzvScWevE/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="https://drive.google.com/file/d/1jPHNTb5T7633Kfb9s-BX7iSZEXuB6wGT/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="https://forms.gle/UTQfFktR2HzhM7xQA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Libro de reclamaciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold text-lg mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="https://intercom.help/inviertekasa/es/collections/13211892-seguridad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aspectos legales de Kasa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-bold text-lg mb-3">Síguenos</h4>
          <div className="flex space-x-4 text-gray-600">
            <Link
              href="https://www.linkedin.com/company/inviertekasa/?originalSubdomain=pe"
              className="bg-foreground p-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="Facebook"
                width={32}
                height={32}
                src={Facebook}
              ></Image>
            </Link>
            <Link
              href="https://www.instagram.com/inviertekasa/"
              className="bg-foreground p-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="Instagram"
                width={32}
                height={32}
                src={Instagram}
              ></Image>
            </Link>
            <Link
              href="https://wa.me/51960400734?text=%C2%A1Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20la%20inversi%C3%B3n%20en%20inmuebles%20con%20Kasa."
              className="bg-foreground p-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              target="_blank"
              rel="noopener noreferrer"
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
