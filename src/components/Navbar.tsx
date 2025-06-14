"use client";
import Link from "next/link";
import Image from "next/image";
import BellIcon from "@/assets/icons/BellIcon.png";
import CartIcon from "@/assets/icons/CartIcon.png";
import Logo from "@/assets/Logo.png";
import HeaderAuth from "@/components/HeaderAuth";
import { useCart } from "context/CartContext";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const { count, firstPendingToken } = useCart();
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  });

  return (
    <header className="relative h-16 sm:h-20 lg:h-24 mt-2 sm:mt-4 lg:mt-7">
      <div className="absolute w-5/12 sm:w-4/12 lg:w-3/12 h-full bg-foreground" />

      <div className="relative z-10 h-full flex justify-center items-center pb-1 sm:pb-3 lg:pb-5 w-5/12 sm:w-4/12 lg:w-3/12 rounded-br-[30px] bg-background">
        <Link href="/">
          <div className="flex items-center lg:w-full">
            <Image
              src={Logo}
              alt="Kasa logo"
              width={180}
              height={53}
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 140px, 180px"
              className="w-[100px] sm:w-[140px] lg:w-[180px] h-auto"
              priority
            />
          </div>
        </Link>
      </div>

      {open && (
        <div
          className="fixed inset-0 py-27 z-40 bg-black/40 flex justify-end lg:hidden"
          role="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          tabIndex={0}
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen(false);
          }}
        >
          <aside className="bg-foreground w-4/5 max-w-xs h-full p-8 flex flex-col gap-8 rounded-tl-[30px] rounded-bl-[30px] shadow-xl">
            <div className="flex items-center gap-4">
              <button
                aria-label="Notificaciones"
                className="text-white cursor-pointer"
              >
                <Image
                  src={BellIcon}
                  width={24}
                  height={24}
                  alt="Notificaciones"
                />
              </button>
              <Link href={`/protected/checkout/${firstPendingToken?.id || ""}`}>
                <div className="relative h-6">
                  <button
                    aria-label="Carrito"
                    className="text-white cursor-pointer"
                  >
                    <Image
                      src={CartIcon}
                      width={24}
                      height={24}
                      alt="Carrito"
                    />
                  </button>
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            <HeaderAuth user={user} />
            <ul className="flex flex-col gap-6 text-white font-medium text-lg">
              <li>
                <Link
                  href="/protected/investments"
                  onClick={() => setOpen(false)}
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/protected/portfolio"
                  onClick={() => setOpen(false)}
                >
                  Mi Portafolio
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      )}

      <nav
        className="
          absolute top-0 right-0
          h-full
          w-7/12
          sm:w-8/12
          lg:w-9/12
          bg-foreground
          rounded-tl-[30px]
          rounded-tr-[30px]
          px-10
          flex items-center justify-between
        "
      >
        <button
          className="h-full flex flex-col justify-center items-center ml-auto lg:hidden cursor-pointer"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""
              }`}
          ></span>
          <span
            className={`block w-7 h-1 bg-white rounded my-1 transition-all duration-300 ${open ? "opacity-0" : ""
              }`}
          ></span>
          <span
            className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""
              }`}
          ></span>
        </button>

        <div className="hidden lg:flex flex-1 justify-between items-center gap-4 md:gap-6 lg:gap-8">
          <ul className="hidden md:flex gap-6 gap-md-8 text-white font-medium">
            <li>
              <Link href="/protected/investments">Proyectos</Link>
            </li>
            <li>
              <Link
                href="https://intercom.help/inviertekasa/es/"
                target="_blank"
                rel="noopener noreferrer">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="https://intercom.help/inviertekasa/es/"
                target="_blank"
                rel="noopener noreferrer">
                Ayuda
              </Link>
            </li>
            <li>
              <Link href="/protected/portfolio">Mi Portafolio</Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            {user && (
              <>
                <button
                  aria-label="Notificaciones"
                  className="text-white cursor-pointer"
                >
                  <Image
                    src={BellIcon}
                    width={24}
                    height={24}
                    alt="Notificaciones"
                  />
                </button>
                <Link
                  href={`/protected/checkout/${firstPendingToken?.id || ""}`}
                >
                  <div className="relative h-6">
                    <button
                      aria-label="Carrito"
                      className="text-white cursor-pointer"
                    >
                      <Image
                        src={CartIcon}
                        width={24}
                        height={24}
                        alt="Carrito"
                      />
                    </button>
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </div>
                </Link>
              </>
            )}
            <HeaderAuth user={user} />
          </div>
        </div>
      </nav>
    </header>
  );
}