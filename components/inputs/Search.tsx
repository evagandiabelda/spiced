'use client';

const Search = () => {
    return (
        <div className="flex-1 flex items-center space-x-3 px-4 bg-[--gris1] dark:bg-[--gris4] rounded-full">
            <input
                type="search"
                placeholder="Buscar contenido"
                className="flex-1 bg-[--gris1] dark:bg-[--gris4] py-2 px-4 focus:outline-none"
            />
            <img
                src="/iconos/iconos-genericos/search-icon.svg"
                alt="Buscar"
                className="h-5 px-3 cursor-pointer dark:invert"
            />
        </div>
    );
};

export default Search;
