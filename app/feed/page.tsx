import Image from "next/image";

export default function Feed() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center space-y-20">
                <h1 className="text-center">
                    Ejemplo de título H1
                </h1>
                <h2>Ejemplo de título H2</h2>
                <h3>Ejemplo de título H3</h3>
                <h4>Ejemplo de título H4</h4>
                <p>Este es un ejemplo de párrafo estándar.</p>
                <span>Este es un ejemplo de párrafo descriptivo.</span>
                <div>
                    <a href="#" className="hover:underline">Enlace subrayado</a>
                </div>
                <div>
                    <a href="#">Enlace sin subrayado</a>
                </div>
                <div>
                    <a href="#" className="a-boton-gr">Texto para botón grande</a>
                </div>
                <div>
                    <a href="#" className="a-boton-pq">Texto para botón pequeño</a>
                </div>
                <p className="tag">Etiqueta</p>
            </div>
        </main>
    );
}
