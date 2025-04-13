"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/* 
Este componente envuelve el proceso de registro.
Sirve para guardar temporalmente los datos sensibles (email y contraseña)
hasta el último paso del proceso de registro,
cuando se envian los datos a la petición POST para crear un nuevo usuario.
 */

type RegistroData = {
  email: string
  password: string
  nombreCompleto: string
  name: string
  fechaNacimiento: string
  genero: string
  foto: string
  spices: string[]
  categorias: string[]
  setRegistroData: (data: Partial<RegistroData>) => void
}

const RegistroContext = createContext<RegistroData | undefined>(undefined)

export const RegistroProvider = ({ children }: { children: React.ReactNode }) => {
  const [registroData, setRegistroDataState] = useState<RegistroData>({
    email: '',
    password: '',
    nombreCompleto: '',
    name: '',
    fechaNacimiento: '',
    genero: '',
    foto: '',
    spices: [],
    categorias: [],
    setRegistroData: () => { }
  })

  const setRegistroData = (data: Partial<RegistroData>) => {
    setRegistroDataState((prev) => ({
      ...prev,
      ...data,
      setRegistroData // mantener la función dentro del objeto
    }))
  }

  return (
    <RegistroContext.Provider value={{ ...registroData, setRegistroData }}>
      {children}
    </RegistroContext.Provider>
  )
}

export const useRegistro = () => {
  const context = useContext(RegistroContext)
  if (!context) {
    throw new Error('useRegistro debe usarse dentro de un RegistroProvider')
  }
  return context
}