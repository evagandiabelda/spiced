'use client';

import Image from "next/image";

type InputProps = {
    tipo: "text" | "number" | "email" | "password" | "textarea";
    placeholder: string;
}

const Input = ({ tipo, placeholder }: InputProps) => {

    let divClassName = "flex flex-row justify-between items-center gap-3 px-4 py-2 rounded-[12px] bg-white dark:bg-[var(--gris4)] border-2 border-white dark:border-[var(--gris4)] hover:border-[var(--brand1)] dark:hover:border-[var(--brand2)] cursor-text";
    let inputClassName = "w-full focus:outline-none active:outline-none";

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
                <input type="text" className={inputClassName} placeholder={placeholder} />
            </div>
        );
    }
    else if (tipo === "number") {
        <div className={divClassName}>
            <Image
                src="/iconos/iconos-registro/icono-registro-edad.svg"
                width={18}
                height={18}
                className="dark:invert"
                alt="campo numérico"
            />
            <input type="number" className={inputClassName} placeholder={placeholder} />
        </div>
    }
    else if (tipo === "email") {
        <div className={divClassName}>
            <Image
                src="/iconos/iconos-registro/icono-registro-email.svg"
                width={18}
                height={18}
                className="dark:invert"
                alt="campo email"
            />
            <input type="email" className={inputClassName} placeholder={placeholder} />
        </div>
    }
    else if (tipo === "password") {
        <div className={divClassName}>
            <Image
                src="/iconos/iconos-registro/icono-registro-password.svg"
                width={18}
                height={18}
                className="dark:invert"
                alt="campo password"
            />
            <input type="password" className={inputClassName} placeholder={placeholder} />
        </div>
    }
    else if (tipo === "textarea") {
        <div className={divClassName}>
            <textarea className={inputClassName} placeholder={placeholder} />
        </div>
    }


};

export default Input;