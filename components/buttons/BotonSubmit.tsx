"use client";

interface BotonSubmitProps {
    texto: string;
    disabled?: boolean;
}

const BotonSubmit = ({ texto, disabled }: BotonSubmitProps) => {

    return (
        <button
            type="submit"
            className="inline-block text-center font-semibold rounded-full border-2 transition ease duration-300 a-boton-gr px-[1.8rem] py-[0.4rem] text-[var(--blanco)] dark:text-[var(--gris5)] hover:opacity-80 border-[var(--gris5)] dark:border-[var(--brand2)] bg-[var(--gris5)] dark:bg-[var(--brand2)]"
            disabled={disabled}
        >
            {texto}
        </button>
    );

}

export default BotonSubmit;