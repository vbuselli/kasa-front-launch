"use client";
import { useEffect, useState } from "react";
import { FormMessage, Message } from "@/components/ui/FormMessage";
import { SubmitButton } from "@/components/ui/SubmitButton";
import Image from "next/image";
import LOGO from "@/assets/logo-kasa-blanco.png";
import Link from "next/link";
import { signInWithGoogle, signUpAction } from "@/lib/actions";

export default function Signup(props: { searchParams: Promise<Message> }) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<Message | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
    /*     if (repeatPassword && e.target.value !== repeatPassword) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError(null);
    } */
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value);
    setPasswordError(null);
    if (
      password &&
      password.length === e.target.value.length &&
      e.target.value !== password
    ) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (password !== repeatPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  useEffect(() => {
    if (!searchParams && props.searchParams) {
      props.searchParams.then(setSearchParams);
    }
  }, [props.searchParams]);

  if (searchParams && "message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form
        className="flex flex-col min-w-64 max-w-64 mx-auto"
        onSubmit={handleSubmit}
        action={signUpAction}
      >
        {/*IMAGE HERE*/}
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
        <div className="flex flex-col">
          {/*
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="usuario@ejemplo.com"
            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="tu contraseña"
            minLength={6}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="repeat-password">Repetir contraseña</label>
          <input
            type="password"
            name="repeat-password"
            placeholder="tu contraseña"
            minLength={6}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            required
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
          {passwordError && (
            <span className="text-red-500 text-xs">{passwordError}</span>
          )}
            */}
          <div className="flex flex-col gap-1 mt-4">
            {/* 
            <SubmitButton
              formAction={signUpAction}
              pendingText="Signing up..."
              disabled={!!passwordError || !password || !repeatPassword}
            >
              Empezar Ahora
            </SubmitButton>
            */}
            {searchParams && <FormMessage message={searchParams} />}
            {formError && (
              <span className="text-red-500 text-xs">{formError}</span>
            )}
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-foreground hover:bg-gray-100 transition-colors"
              onClick={signInWithGoogle}
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
              Regístrate con Google
            </button>
          </div>
        </div>
        <p className="text-sm text">
          Ya tienes una cuenta?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Ingresar
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
          </a>
          {" "}y la{" "}
          <a
            href="https://drive.google.com/file/d/1jPHNTb5T7633Kfb9s-BX7iSZEXuB6wGT/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 underline hover:no-underline"
          >
            Política de Privacidad
          </a>
        </p>
      </form>
    </>
  );
}
