'use client';

import React from "react";

// COMPONENTE BASE PARA VENTANAS EMERGENTES:

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[var(--gris1)] p-8 rounded-xl p-6 shadow-xl max-w-lg w-full"
                onClick={(e) => e.stopPropagation()} // para que no se cierre al hacer click dentro
            >
                {children}
            </div>
        </div>
    );
};
