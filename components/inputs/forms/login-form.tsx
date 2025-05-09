"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import BotonLogin from "@/components/buttons/BotonLogin";
import Input from "@/components/inputs/Input";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar errores previos

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrorMessage(result.error);
      console.log(result.error);
      return;
    }

    // Si el login es exitoso, consulta el tipo de usuario:
    try {
      const response = await fetch("/api/auth/user-type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.tipo === "standard") {
        window.location.href = "/panel-estandar";
      } else if (data.tipo === "expert") {
        window.location.href = "/panel-experto";
      } else if (data.tipo === "admin") {
        window.location.href = "/panel-admin";
      } else {
        setErrorMessage("No se pudo determinar el tipo de usuario.");
      }
    } catch (err) {
      setErrorMessage("Error al determinar el tipo de usuario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-center dark:text-[var(--gris3)]">Accede a tu cuenta</h1>

      {/* INPUTS */}
      <div className="w-full flex flex-col flex-1 align-center gap-12 pb-4 pt-8 max-w-[360px]">

        <div className="w-full">

          <div>
            <label className="mb-3 mt-5 block" htmlFor="email">Email</label>
            <Input tipo="email" icon={true} id="email" required />
          </div>

          <div className="mt-4">
            <label className="mb-3 mt-5 block" htmlFor="password">Password</label>
            <div className="relative">
              <Input tipo="password" icon={true} id="password" required />
            </div>
          </div>

        </div>

        {/* BOTONES */}
        <div className="w-full flex flex-col items-center">
          <BotonLogin className="mt-4 w-full" type="submit">Log in</BotonLogin>
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        </div>

      </div>
    </form>
  );
}
