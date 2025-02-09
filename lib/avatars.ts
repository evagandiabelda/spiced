const avatares = [
    "/iconos/iconos-registro/gatitos/icono-gato-00.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-01.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-02.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-03.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-04.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-05.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-06.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-07.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-08.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-09.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-10.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-11.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-12.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-13.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-14.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-15.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-16.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-17.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-18.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-19.svg",
    "/iconos/iconos-registro/gatitos/icono-gato-20.svg",
];

export const obtenerAvatarAleatorio = () => {
    return avatares[Math.floor(Math.random() * avatares.length)];
};
