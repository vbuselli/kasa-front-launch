"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert("Error: " + error.message);
    else alert("Revisa tu correo para iniciar sesión");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Enviar código
        </button>
      </div>
    </div>
  );
}
