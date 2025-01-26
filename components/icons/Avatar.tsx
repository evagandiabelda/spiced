'use client';

type borde = {
    borde: "blanco" | "color";
}

const Avatar = ({ borde }: borde) => {

    const colorBorde = borde === "blanco" ? "border-white" : "border-[var(--brand1)]";

    return (
        <div className={`p-1 rounded-full border-[3px] ${colorBorde} cursor-pointer hover:scale-110 transition ease`}>
            <img
                src="/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"
                alt="Avatar"
                className="w-100"
            />
        </div>
    );
};

export default Avatar;
