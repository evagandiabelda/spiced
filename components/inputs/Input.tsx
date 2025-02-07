'use client';

import { ChangeEvent } from "react";
import Image from "next/image";

type InputProps = {
    tipo: "text" | "number" | "email" | "password" | "textarea";
    id: string;
    placeholder?: string;
    value?: string;
    required: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ tipo, id, placeholder, value, required, onChange }: InputProps) => {

    let divClassName = "flex flex-row justify-between items-center gap-3 px-4 py-2 rounded-[12px] bg-white dark:bg-[var(--gris4)] border-2 border-white dark:border-[var(--gris4)] hover:border-[var(--brand1)] dark:hover:border-[var(--brand2)] cursor-text";
    let inputClassName = "flex-1 text-[1rem] !bg-transparent py-1 px-4 focus:outline-none active:outline-none cursor-text";

    if (tipo === "text") {
        return (
            <div className={divClassName}>
                <Image
                    src="/iconos/iconos-registro/icono-registro-nombre.svg"
                    width={18}
                    height={18}
                    className="dark:invert"
                    alt="campo de texto"
                />
                <input type="text" id={id} name={id} value={value} className={inputClassName} placeholder={placeholder} required={required} onChange={onChange} />
            </div>
        );
    }
    else if (tipo === "number") {
        return (
            <div className={divClassName}>
                <Image
                    src="/iconos/iconos-registro/icono-registro-edad.svg"
                    width={18}
                    height={18}
                    className="dark:invert"
                    alt="campo numérico"
                />
                <input type="number" id={id} name={id} value={value} className={inputClassName} placeholder={placeholder} required={required} onChange={onChange} />
            </div>
        );
    }
    else if (tipo === "email") {
        return (
            <div className={divClassName}>
                <Image
                    src="/iconos/iconos-registro/icono-registro-email.svg"
                    width={18}
                    height={18}
                    className="dark:invert"
                    alt="campo email"
                />
                <input type="email" id={id} name={id} value={value} className={inputClassName} placeholder={placeholder} required={required} onChange={onChange} />
            </div>
        );
    }
    else if (tipo === "password") {
        return (
            <div className={divClassName}>
                <Image
                    src="/iconos/iconos-registro/icono-registro-password.svg"
                    width={18}
                    height={18}
                    className="dark:invert"
                    alt="campo password"
                />
                <input type="password" id={id} name={id} value={value} className={inputClassName} placeholder={placeholder} required={required} onChange={onChange} />
            </div>
        );
    }
    else if (tipo === "textarea") {
        return (
            <div className={divClassName}>
                <textarea id={id} name={id} value={value} className={inputClassName} placeholder={placeholder} required={required} />
            </div>
        );
    }


};

export default Input;