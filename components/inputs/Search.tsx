'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`/explorar?${params.toString()}`);
    }

    return (
        <div className="flex-1 flex items-center space-x-3 px-4 bg-[--gris1] dark:bg-[--gris4] rounded-full">
            <input
                type="search"
                id="search"
                placeholder="Buscar contenido"
                className="flex-1 bg-[--gris1] dark:bg-[--gris4] py-2 px-4 focus:outline-none placeholder-light dark:placeholder-dark"
                onChange={(e) => { handleSearch(e.target.value) }}
                defaultValue={searchParams.get('query')?.toString()}
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
