'use client';

import { ChangeEvent } from "react";

type InputFileProps = {
    id: string;
    placeholder?: string;
    value?: string;
    required: boolean;
    accept?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile = ({ id, placeholder, value, required, onChange }: InputFileProps) => {

    const inputClassName = "py-3 inline-block text-center text-[0.9rem] cursor-pointer text-[var(--gris5)] dark:text-[var(--gris2)]";

    return (
        <div className="px-8 py-4 rounded-xl bg-white dark:bg-[var(--gris4)]">
            <input type="file" id={id} name={id} className={inputClassName} placeholder={placeholder} required={required} onChange={onChange} />
        </div>
    );


};

export default InputFile;