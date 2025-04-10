'use client';

import React, { useState } from 'react';
import OptionItem from '@/components/inputs/OptionItem';
import { on } from 'events';

type OptionsProps = {
    tipo: "dropdown" | "checkbox" | "radio";
    label?: string;
    name?: string;
    opciones: Array<{ id: string; nombre: string }>;
    valorSeleccionado?: string; // Para gestionar el valor del Dropdown desde el elemento padre
    onChange?: (nuevoValor: string) => void;
};

const Options = ({ tipo, label, name, opciones, valorSeleccionado, onChange }: OptionsProps) => {
    // Definir los estados al inicio del componente
    const [opcionSel, setOpcionSel] = useState(tipo === "dropdown" ? "" : undefined); // Para el Dropdown
    const [seleccionados, setSeleccionados] = useState<string[]>([]); // Para el Checkbox
    const [seleccionado, setSeleccionado] = useState(tipo === "radio" ? "" : undefined); // Para el Radio

    // Manejadores de eventos
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoValor = event.target.value;
        setOpcionSel(nuevoValor);
        onChange?.(nuevoValor); // Llama a la función onChange si está definida
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const actualizados = checked
            ? [...seleccionados, value]
            : seleccionados.filter((item) => item !== value);
        setSeleccionados(actualizados);
        onChange?.(value); // Llama a la función onChange si está definida
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoValor = event.target.value;
        setSeleccionado(nuevoValor);
        onChange?.(nuevoValor); // Llama a la función onChange si está definida
    };

    if (tipo === "dropdown") {
        return (
            <div className='w-full flex flex-col gap-4'>
                {label && <label htmlFor={name}>{label}</label>}
                <select id={name} onChange={handleSelectChange} value={valorSeleccionado ?? opcionSel} className="select dark:bg-[var(--gris4)] dark:border-[var(--gris3)] dark:hover:border-[var(--gris2)] dark:active:border-[var(--brand2)] dark:focus:border-[var(--brand2)]">
                    {opciones.map(opcion => (
                        <OptionItem key={opcion.id} tipo={tipo} id={opcion.nombre} texto={opcion.nombre} />
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
                        <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} texto={opcion.nombre} checked={seleccionados.includes(opcion.id)} onChange={handleCheckboxChange} />
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
                        <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} name={name} texto={opcion.nombre} checked={seleccionado === opcion.id} onChange={handleRadioChange} />
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default Options;
