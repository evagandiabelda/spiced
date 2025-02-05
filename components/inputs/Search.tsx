'use client';

import Image from "next/image";

const Search = () => {
    return (
        <div className="flex-1 flex items-center space-x-3 px-4 bg-[--gris1] dark:bg-[--gris4] rounded-full">
            <input
                type="search"
                placeholder="Buscar contenido"
                className="flex-1 bg-[--gris1] dark:bg-[--gris4] py-2 px-4 focus:outline-none"
            />
            <Image
                src="/iconos/iconos-genericos/search-icon.svg"
                width={45}
                height={45}
                className="px-3 cursor-pointer opacity-50 hover:opacity-100 transition ease dark:invert"
                alt="buscar"
            />
        </div>
    );
};

export default Search;
