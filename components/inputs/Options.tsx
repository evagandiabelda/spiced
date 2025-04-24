'use client';

import React, { useState } from 'react';
import OptionItem from '@/components/inputs/OptionItem';

type OptionsProps = {
    tipo: "dropdown" | "checkbox" | "radio";
    label?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    multiple?: boolean;
    opciones: Array<{ id: string; nombre: string }>;
    valorSeleccionado?: string; // Para gestionar el valor del Dropdown desde el elemento padre
    onChange?: (nuevoValor: string | string[]) => void;
};

export default function Options({ tipo, label, name, placeholder, required, multiple, opciones, valorSeleccionado, onChange }: OptionsProps) {
    // Definir los estados al inicio del componente
    const [opcionSel, setOpcionSel] = useState<string | string[]>(multiple ? [] : ""); // Para el Dropdown
    const [seleccionados, setSeleccionados] = useState<string[]>([]); // Para el Checkbox
    const [seleccionado, setSeleccionado] = useState(tipo === "radio" ? "" : undefined); // Para el Radio

    // Manejadores de eventos:

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = multiple
            ? Array.from(event.target.selectedOptions, (option) => option.value)
            : event.target.value;

        setOpcionSel(selected);

        if (multiple) {
            onChange?.(selected as string[]);
        } else {
            onChange?.(selected as string);
        }
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
                <select
                    id={name}
                    onChange={handleSelectChange}
                    value={multiple ? (opcionSel as string[]) : (valorSeleccionado ?? opcionSel as string)}
                    className="dark:bg-[var(--gris4)] dark:border-[var(--gris3)] dark:hover:border-[var(--gris2)] dark:active:border-[var(--brand2)] dark:focus:border-[var(--brand2)] select"
                    multiple={multiple}
                    required={required}
                >
                    {placeholder &&
                        <option value="" disabled hidden className="text-[var(--gris5)]">
                            {!multiple &&
                                (placeholder || "Selecciona una opción.")
                                // No se permite mostrar "placeholder" en selects de tipo múltiple.
                            }
                        </option>
                    }
                    {opciones.map(opcion => (
                        <OptionItem
                            key={opcion.id}
                            tipo={tipo}
                            id={opcion.id}
                            texto={opcion.nombre}
                        />
                    ))}

                </select>
            </div>
        );
    }

    if (tipo === "checkbox") {
        return (
            <div className='flex flex-col gap-4'>
                <p>{label}</p>
                <div role="group" aria-labelledby={label} aria-required={required}>
                    {opciones.map(opcion => (
                        <OptionItem
                            key={opcion.id}
                            tipo={tipo}
                            id={opcion.id}
                            texto={opcion.nombre}
                            checked={seleccionados.includes(opcion.id)}
                            onChange={handleCheckboxChange}
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (tipo === "radio") {
        return (
            <div className='flex flex-col gap-4'>
                <p>{label}</p>
                <div role="radiogroup" aria-labelledby={label} aria-required={required}>
                    {opciones.map(opcion => (
                        <OptionItem
                            key={opcion.id}
                            tipo={tipo}
                            id={opcion.id}
                            name={name}
                            texto={opcion.nombre}
                            checked={seleccionado === opcion.id}
                            onChange={handleRadioChange}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return null;
};