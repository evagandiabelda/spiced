"use client";

import NuevoShareForm from "@/components/inputs/forms/nuevo-share-form";

export default function NuevoShare() {
    return (
        <div className="w-full flex flex-col gap-10">
            <h2>Nuevo Share</h2>
            <NuevoShareForm />
        </div>
    );
}