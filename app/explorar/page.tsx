
import Boton from '@/components/buttons/Boton';
import Feed from '@/components/feed/Feed';

export const metadata = {
    title: 'Feed',
}

export default async function Explorar() {

    return (
        <div className="w-full h-100 flex flex-col items-center text-center mx-auto px-col1 pt-12 pb-32 gap-8">

            {/* CABECERA */}
            <div className="w-full flex flex-col items-center gap-4">
                <h1 className="text-center">Explora</h1>
                <p>Descubre, aprende y apasiónate por aquello que te hace especial.</p>
            </div>

            {/* CONTENIDO */}
            <Feed />

        </div>
    );
}
