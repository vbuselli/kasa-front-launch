"use client";
import Link from "next/link";
import Image from "next/image";
import BellIcon from "@/assets/icons/BellIcon.png";
import CartIcon from "@/assets/icons/CartIcon.png";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon.png";
import Logo from "@/assets/Logo.png";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
            <Link href="/projects">Proyectos</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/help">Ayuda</Link>
          </li>
          <li>
            <Link href="/portfolio">Portafolio</Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <button aria-label="Notificaciones" className="text-white">
            <Image src={BellIcon} width={24} height={24} alt="Notificaciones" />
          </button>
          <button aria-label="Carrito" className="text-white">
            <Image src={CartIcon} width={24} height={24} alt="Carrito" />
          </button>

          {loading ? (
            <div className="w-32 h-8 bg-gray-700 rounded animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button className="flex items-center gap-2 text-white">
                <Image
                  src={user.user_metadata.avatar_url || "/avatar.png"}
                  alt={user.user_metadata.full_name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="whitespace-nowrap">
                  {user.user_metadata.full_name ?? user.email}
                </span>
                <Image
                  src={ChevronDownIcon}
                  width={24}
                  height={24}
                  alt="Opciones"
                />
              </button>
              <ul className="absolute right-0 mt-2 bg-white rounded shadow-lg overflow-hidden text-gray-800">
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded"
            >
              Iniciar sesión
            </button>
          )}

          {/* <div className="flex items-center gap-2 cursor-pointer text-white">
            <Image
              src="/avatar.png"
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>Omar Contreras</span>
            <Image
              src={ChevronDownIcon}
              width={24}
              height={24}
              alt="Opciones"
            />
          </div> */}
        </div>
      </nav>
    </header>
  );
}
