import { FormMessage, Message } from "@/components/ui/FormMessage";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { signInAction, signInWithGoogle } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import LOGO from "@/assets/logo-kasa-blanco.png";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex-1 flex flex-col min-w-64">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src={LOGO}
          alt="KASA Logo"
          width={120}
          height={60}
          className="object-contain"
        />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-medium">Ingresar a KASA 👋</h1>
        <p className="text-sm text-white-600 mt-2">
          Aquí todos podemos ser propietarios de una fracción
        </p>
      </div>

      {/* Login tradicional (comentado) */}
      {/*
      <form className="flex flex-col gap-4" action={signInAction}>
        <input
          type="email"
          name="email"
          placeholder="usuario@ejemplo.com"
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="tu contraseña"
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-black"
          required
        />
        <SubmitButton pendingText="Ingresando...">Ingresar</SubmitButton>
        <FormMessage message={searchParams} />
      </form>
      */}

      {/* Google login (fuera del form principal) */}
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-black hover:bg-gray-100 transition-colors w-full mt-4"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
            <g>
              <path
                fill="#4285F4"
                d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7.5-10.3 7.5-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.4l6.5-6.5C34.1 6.5 29.3 4.5 24 4.5 13.5 4.5 5 13 5 23.5S13.5 42.5 24 42.5c10.2 0 18.5-8.3 18.5-18.5 0-1.2-.1-2.1-.3-3z"
              />
              <path
                fill="#34A853"
                d="M6.3 14.1l6.6 4.8C14.3 16.1 18.8 13 24 13c2.6 0 5 .9 6.9 2.4l6.5-6.5C34.1 6.5 29.3 4.5 24 4.5c-7.2 0-13.3 4.1-16.4 10.1z"
              />
              <path
                fill="#FBBC05"
                d="M24 42.5c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2c-1.9 1.3-4.3 2.1-7.4 2.1-4.6 0-8.7-3.2-10.3-7.5l-6.6 5.1C10.7 38.4 16.8 42.5 24 42.5z"
              />
              <path
                fill="#EA4335"
                d="M43.6 20.5h-1.9V20H24v8h11.3c-.7 2-2.1 3.7-3.9 4.9l6.4 5.2c3.7-3.4 6.2-8.4 6.2-14.1 0-1.2-.1-2.1-.3-3z"
              />
            </g>
          </svg>
          Ingresar con Google
        </button>
      </form>

      <p className="text-sm mt-4">
        ¿No tienes una cuenta?{" "}
        <Link className="font-medium underline" href="/sign-up">
          Empezar Ahora
        </Link>
      </p>

      <p className="text-xs text-gray-500 text-center mt-2">
        Al continuar declaras estar de acuerdo con los{" "}
        <a
          href="https://drive.google.com/file/d/1HSf3dvCssOkjMe48U90r7tPRzvScWevE/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 underline hover:no-underline"
        >
          Términos y Condiciones
        </a>{" "}
        y la{" "}
        <a
          href="https://drive.google.com/file/d/1jPHNTb5T7633Kfb9s-BX7iSZEXuB6wGT/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 underline hover:no-underline"
        >
          Política de Privacidad
        </a>
      </p>
    </div>
  );
}
