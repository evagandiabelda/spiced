"use client";

import Image from "next/image";

interface BotonSubmitProps {
    texto: string;
    disabled?: boolean;
    icon?: string;
}

const BotonSubmit = ({ texto, disabled = false, icon }: BotonSubmitProps) => {

    return (
        <button
            type="submit"
            className="flex flex-row justify-center items-center gap-4 text-center font-semibold rounded-full border-2 transition ease duration-300 a-boton-gr px-[1.8rem] py-[0.4rem] text-[var(--blanco)] dark:text-[var(--gris5)] hover:scale-[1.02] border-[var(--gris5)] dark:border-[var(--brand2)] bg-[var(--gris5)] dark:bg-[var(--brand2)]"
            disabled={disabled}
        >
            {texto}
            {icon && <Image src={icon} alt="icono" width={15} height={15} className="invert dark:filter-none" />}
        </button>
    );

}

export default BotonSubmit;