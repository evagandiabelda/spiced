"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { BotonLogin } from "@/components/buttons/BotonLogin";
import Input from "@/components/inputs/Input";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/panel-estandar";
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
      callbackUrl,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      window.location.href = callbackUrl; // Redirigir manualmente
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 justify-centerspace-y-3">
      <h1>Accede a tu cuenta</h1>

      <div className="flex flex-col flex-1 align-center gap-8 rounded-lg px-6 pb-4 pt-8 w-full max-w-[400px]">

        <div className="w-full">

          <div>
            <label className="mb-3 mt-5 block" htmlFor="email">Email</label>
            <Input tipo="email" id="email" required />
          </div>

          <div className="mt-4">
            <label className="mb-3 mt-5 block" htmlFor="password">Password</label>
            <div className="relative">
              <Input tipo="password" id="password" required />
            </div>
          </div>

        </div>

        <BotonLogin className="mt-4 w-full" type="submit">Log in</BotonLogin>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      </div>
    </form>
  );
}
