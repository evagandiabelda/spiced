'use client';

import React, { ChangeEvent } from "react";

type OptionItemProps = {
    tipo: "dropdown" | "checkbox" | "radio";
    id: string;
    texto: string;
    name?: string; // Per a agrupar radios.
    checked?: boolean; // Per a definir prèviament l'estat de radios i checkboxes.
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Rebrà una funció amb l'acció a realitzar.
}

const OptionItem = ({ tipo, id, texto, name, checked, onChange }: OptionItemProps) => {

    if (tipo === "dropdown") {
        return (
            <option id={id} value={id}>
                {texto}
            </option>
        );
    }

    if (tipo === "checkbox") {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={id}
                    value={id}
                    checked={checked}
                    onChange={onChange}
                    className="cursor-pointer"
                />
                <label htmlFor={id} className="cursor-pointer">
                    {texto}
                </label>
            </div>
        );
    }

    if (tipo === "radio") {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="radio"
                    id={id}
                    value={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="cursor-pointer"
                />
                <label htmlFor={id} className="cursor-pointer">
                    {texto}
                </label>
            </div>
        );
    }

    return null; // Si no s'especifica un tipus vàlid, no renderitza res.

};

export default OptionItem;