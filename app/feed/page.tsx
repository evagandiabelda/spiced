
import { Metadata } from 'next';
import ListaShares from '@/components/cards/ListaShares';

export const metadata: Metadata = {
    title: 'Feed',
};

export default function Feed() {

    return (
        <div className="w-full h-100 flex flex-col items-center text-center mx-auto px-col1 py-16 gap-12">
            {/* CABECERA */}
            <div className="w-full flex flex-col items-center gap-8">
                <h1 className="text-center">Explora</h1>
                <p>Descubre, aprende y apasiónate por aquello que te hace especial.</p>
            </div>

            {/* CONTENIDO */}
            <ListaShares />
        </div>
    );
}
