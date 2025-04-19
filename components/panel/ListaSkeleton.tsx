"use client";

export default function ListaSkeleton() {

    return (
        <div className="w-full h-[50px] flex flex-row justify-between items-center gap-2 opacity-30">
            <div id="caja-miniatura" className="min-w-[50px] h-[50px] rounded-xl bg-[var(--gris3)] opacity-40 dark:opacity-30"></div>
            <div id="caja-textos" className="w-full h-[50px] rounded-xl bg-[var(--gris3)] opacity-40 dark:opacity-30"></div>
            <div id="caja-botones" className="w-1/5 h-[50px] rounded-xl bg-[var(--gris3)] opacity-40 dark:opacity-30"></div>
        </div>
    );
}
