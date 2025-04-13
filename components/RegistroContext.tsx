"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/* 
Este componente envuelve el proceso de registro.
Sirve para guardar temporalmente los datos sensibles (email y contraseña)
hasta el último paso del proceso de registro,
cuando se envian los datos a la petición POST para crear un nuevo usuario.
 */

type RegistroData = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

const RegistroContext = createContext<RegistroData | undefined>(undefined);

export const RegistroProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <RegistroContext.Provider value={{ email, password, setEmail, setPassword }}>
      {children}
    </RegistroContext.Provider>
  );
};

export const useRegistro = () => {
  const context = useContext(RegistroContext);
  if (!context) throw new Error("'useRegistro' debe ser usado dentro de 'RegistroProvider'.");
  return context;
};
