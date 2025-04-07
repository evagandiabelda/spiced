"use client";

export default function Share() {

    return (
        <div className="min-w-col2 w-full flex flex-col gap-4 rounded-[1.8rem] p-[1.5rem] bg-white dark:bg-[var(--gris4)] dark:border-2 dark:border-[var(--gris3)] opacity-40 dark:opacity-30">
            <div id="caja-imagen" className="w-full h-[300px] rounded-[0.6rem] bg-[var(--gris1)] dark:bg-[var(--gris5)] overflow-hidden"></div>
            <div id="caja-textos" className="w-full flex flex-col">
                <div id="caja-usuario" className="w-full flex flex-row justify-end items-center gap-2 px-4">
                    <div className="w-1/3 h-[1.5rem] rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris5)]"></div>
                    <div className="w-[2rem] h-[2rem] rounded-full bg-[var(--gris1)] dark:bg-[var(--gris5)]"></div>
                </div>
                <div className="w-full flex flex-col items-start gap-5 pt-6 px-4">
                    <div id="caja-titulo" className="w-2/3 h-[2.5rem] rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris5)]"></div>
                    <div id="caja-extracto" className="w-full flex flex-col items-start gap-2">
                        <div className="w-full h-[1.5rem] rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris5)]"></div>
                        <div className="w-3/4 h-[1.5rem] rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris5)]"></div>
                        <div className="w-1/2 h-[1.5rem] rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris5)]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
