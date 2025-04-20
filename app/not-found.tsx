import Image from "next/image"
import Boton from "@/components/buttons/Boton"

/* PÁGINA PARA EL ERROR '404 - NOT FOUND' */

export default function NotFound() {
    return (
        <div className="w-full h-100 flex flex-col justify-center items-center text-center mx-auto px-col1 pt-12 pb-32 gap-8">
            <Image
                src="/imgs/img-error-404.svg"
                alt="404 - Not Found"
                width={400}
                height={400}
            />
            <h1>¡Ups!</h1>
            <p>Parece que esta página no existe o ha sido eliminada.</p>
            <Boton
                texto="Volver a la Home"
                enlace="/"
                tamano="grande"
                jerarquia="primario"
            />
        </div>
    )
}