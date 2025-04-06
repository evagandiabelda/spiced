'use client';

import React, { useState } from 'react';
import OptionItem from '@/components/inputs/OptionItem';

type OptionsProps = {
    tipo: "dropdown" | "checkbox" | "radio";
    label?: string;
    name?: string;
    opciones: Array<{ id: string; texto: string }>;
};

const Options = ({ tipo, label, name, opciones }: OptionsProps) => {
    // Definir los estados al inicio del componente
    const [opcionSel, setOpcionSel] = useState(tipo === "dropdown" ? "" : undefined);
    const [seleccionados, setSeleccionados] = useState<string[]>([]);
    const [seleccionado, setSeleccionado] = useState(tipo === "radio" ? "" : undefined);

    // Manejadores de eventos
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOpcionSel(event.target.value);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSeleccionados((prevSeleccionados) =>
            checked ? [...prevSeleccionados, value] : prevSeleccionados.filter((item) => item !== value)
        );
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeleccionado(event.target.value);
    };

    if (tipo === "dropdown") {
        return (
            <div className='w-full flex flex-col gap-4'>
                {label && <label htmlFor={name}>{label}</label>}
                <select id={name} onChange={handleSelectChange} value={opcionSel} className="select dark:bg-[var(--gris4)] dark:border-[var(--gris3)] dark:hover:border-[var(--gris2)] dark:active:border-[var(--brand2)] dark:focus:border-[var(--brand2)]">
                    {opciones.map(opcion => (
                        <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} texto={opcion.texto} />
                    ))}
                </select>
            </div>
        );
    }

    if (tipo === "checkbox") {
        return (
            <div className='flex flex-col gap-4'>
                <p>{label}</p>
                <div role="group" aria-labelledby={label}>
                    {opciones.map(opcion => (
                        <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} texto={opcion.texto} checked={seleccionados.includes(opcion.id)} onChange={handleCheckboxChange} />
                    ))}
                </div>
            </div>
        );
    }

    if (tipo === "radio") {
        return (
            <div className='flex flex-col gap-4'>
                <p>{label}</p>
                <div role="radiogroup">
                    {opciones.map(opcion => (
                        <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} name={name} texto={opcion.texto} checked={seleccionado === opcion.id} onChange={handleRadioChange} />
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default Options;
