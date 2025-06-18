import { FormMessage, Message } from "@/components/ui/FormMessage";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { signInAction, signInWithGoogle } from "@/lib/actions";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Ingresar</h1>



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
        <div className="flex justify-between items-center">
          <label htmlFor="password">Contraseña</label>
          <Link
            className="text-xs text-white underline"
            href="/forgot-password"
          >
            Olvidaste tu contraseña?
          </Link>
        </div>
        <input
          type="password"
          name="password"
          placeholder="tu contraseña"
          className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
          required
        />
        */}
        <div className="flex flex-col gap-1 mt-4">
          {/*
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Ingresar
          </SubmitButton>
          <FormMessage message={searchParams} />
          */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-foreground hover:bg-gray-100 transition-colors cursor-pointer"
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
            Ingresar con Google
          </button>
        </div>
      </div>
      <p className="text-sm">
        No tienes una cuenta?{" "}
        <Link className="font-medium underline" href="/sign-up">
          Empezar Ahora
        </Link>
      </p>
      <p className="text-xs text-gray-500 text-center mt-2">
        Al continuar declaras estar de acuerdo con los T&C y política de privacidad
      </p>
    </form>
  );
}
