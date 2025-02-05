'use client';

import React, { useState } from 'react';
import OptionItem from '@/components/inputs/OptionItem';

type OptionsProps = {
    tipo: "dropdown" | "checkbox" | "radio";
    label: string;
    name?: string; // Per a agrupar radios.
    opciones: Array<{ id: string; texto: string }>; // Definix l'estructura de les opcions.
};

const Options = ({ tipo, label, name, opciones }: OptionsProps) => {

    /* DROPDOWN: */
    if (tipo === "dropdown") {

        // Actualitzar el valor seleccionat:
        const [opcionSel, setOpcionSel] = useState("");

        const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setOpcionSel(event.target.value);
        };

        // Crear el llistat d'opcions:
        const listaItems = opciones.map(opcion => (
            <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} texto={opcion.texto} />
        ));

        // Renderitzar el dropdown:
        return (
            <div className='flex flex-col gap-4'>
                <label htmlFor={name}>{label}</label>
                {/*                 <div className='w-full flex justify-center items-center px-4 py-2 rounded-xl bg-white dark:bg-[var(--gris4)] border-2 border-white dark:border-[var(--gris4)] hover:border-[var(--brand1)] dark:hover:border-[var(--brand2)] transition ease'>
                    <select id={name} onChange={handleSelectChange} value={opcionSel} className="w-full focus:outline-none active:outline-none cursor-pointer">
                        {listaItems}
                    </select>
                </div> */}
                <select id={name} onChange={handleSelectChange} value={opcionSel} className="dark:border-[var(--gris-4)] dark:hover:border-[var(--gris3)] dark:active:border-[var(--brand2)] dark:focus:border-[var(--brand2)]">
                    {listaItems}
                </select>
            </div>
        );

    }

    /* CHECKBOX: */
    if (tipo === "checkbox") {

        // Actualitzar el llistat dels valors seleccionats:
        const [seleccionados, setSeleccionados] = useState<string[]>([]); // Array de seleccionats.

        const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value, checked } = event.target;

            setSeleccionados((prevSeleccionados) =>
                checked
                    ? [...prevSeleccionados, value] // Afegir a l'array si se selecciona.
                    : prevSeleccionados.filter((item) => item !== value) // Eliminar si es deselecciona.
            );
        };

        // Crear el llistat d'opcions:
        const listaItems = opciones.map(opcion => (
            <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} texto={opcion.texto} checked={seleccionados.includes(opcion.id)} onChange={handleCheckboxChange} />
        ));

        // Renderitzar el grup de checkboxes:
        return (
            <div className='flex flex-col gap-4'>
                <p>{label}</p>
                <div role="group" aria-labelledby={label} className="">
                    {listaItems}
                </div>
            </div>
        );

    }

    /* RADIO: */
    if (tipo === "radio") {

        // Actualitzar el valor seleccionat:
        const [seleccionado, setSeleccionado] = useState("");

        const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSeleccionado(event.target.value); // Actualiza el valor seleccionado
            console.log(`Seleccionado: ${event.target.value}`);
        };

        const listaItems = opciones.map(opcion => (
            <OptionItem key={opcion.id} tipo={tipo} id={opcion.id} name={name} texto={opcion.texto} checked={seleccionado === opcion.id} onChange={handleRadioChange} />
        ));

        return (
            <div className='flex flex-col gap-4'>
                <p>{label}</p>
                <div role="radiogroup" className="">
                    {listaItems}
                </div>
            </div>

        );

    }

    return null; // Si no s'especifica un tipus vàlid, no renderitza res.
};

export default Options;
