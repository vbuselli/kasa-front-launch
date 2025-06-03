import Link from "next/link";
import Image from "next/image";
import BellIcon from "@/assets/icons/BellIcon.png";
import CartIcon from "@/assets/icons/CartIcon.png";
import Logo from "@/assets/Logo.png";
import HeaderAuth from "@/components/HeaderAuth";

export default function Navbar() {
  return (
    <header className="relative h-24 mt-7">
      <div className="absolute w-3/12 h-full bg-foreground" />

      <div className="relative z-10 h-full flex justify-center items-center pb-5 w-3/12 rounded-br-[30px] bg-background">
        <Link href="/">
          <div className="flex items-center w-full">
            <Image src={Logo} alt="Kasa logo" width={180} height={53} />
          </div>
        </Link>
      </div>

      <nav
        className="
          absolute top-0 right-0
          h-full
          w-9/12
          bg-foreground
          rounded-tl-[30px]
          rounded-tr-[30px]
          px-10
          flex items-center justify-between
        "
      >
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li>
            <Link href="/protected/investments">Proyectos</Link>
          </li>
          <li>
            <Link href="/">Blog</Link>
          </li>
          <li>
            <Link href="/">Ayuda</Link>
          </li>
          <li>
            <Link href="/protected/portfolio">Portafolio</Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <button aria-label="Notificaciones" className="text-white">
            <Image src={BellIcon} width={24} height={24} alt="Notificaciones" />
          </button>
          <button aria-label="Carrito" className="text-white">
            <Image src={CartIcon} width={24} height={24} alt="Carrito" />
          </button>

          <HeaderAuth />
        </div>
      </nav>
    </header>
  );
}
