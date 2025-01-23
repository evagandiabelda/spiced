'use client';

const Avatar = () => {
    return (
        <div className="p-[3px] border-[3px] border-transparent rounded-full transition-all duration-300 ease-in-out hover:border-[--brand1] cursor-pointer">
            <img
                src="/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"
                alt="Avatar"
                className="w-10"
            />
        </div>
    );
};

export default Avatar;
