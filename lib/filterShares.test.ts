import { ShareData } from "@/types/share";
import { describe, it, expect } from 'vitest';

/* ------ PRUEBA UNITARIA PARA COMPROBAR FILTRADO DE SHARES: ------ */

// 1. Resumen del ShareData con únicamente los datos necesarios para el test:
export type ShareResumen = Pick<ShareData, 'id' | 'titulo' | 'share_verificado'> & {
    categorias: { categoria: { nombre: string } }[];
    spices: { spice: { nombre: string } }[];
};

// 2. Opciones de filtrado:
type FilterOptions = {
    categoria?: string;
    spice?: string;
    soloVerificados?: boolean;
};

// 3. Función para filtrar Shares:
export function filtrarShares(shares: ShareResumen[], filtros: FilterOptions): ShareResumen[] {
    return shares.filter((share) => {
        const cumpleCategoria = filtros.categoria
            ? share.categorias.some((cat) => cat.categoria.nombre === filtros.categoria)
            : true;

        const cumpleSpice = filtros.spice
            ? share.spices.some((s) => s.spice.nombre === filtros.spice)
            : true;

        const cumpleVerificado = filtros.soloVerificados ? share.share_verificado : true;

        return cumpleCategoria && cumpleSpice && cumpleVerificado;
    });
}

// 4. Definición de datos de prueba:
const mockShares: ShareResumen[] = [
    {
        id: '1',
        titulo: 'Share A',
        share_verificado: true,
        categorias: [{ categoria: { nombre: 'Arte' } }],
        spices: [{ spice: { nombre: 'TEA' } }],
    },
    {
        id: '2',
        titulo: 'Share B',
        share_verificado: false,
        categorias: [{ categoria: { nombre: 'Bienestar' } }],
        spices: [{ spice: { nombre: 'TDAH' } }],
    },
    {
        id: '3',
        titulo: 'Share C',
        share_verificado: true,
        categorias: [{ categoria: { nombre: 'Arte' } }],
        spices: [{ spice: { nombre: 'TOC' } }],
    },
];

describe('filtrarShares', () => {
    it('filtra por categoría correctamente', () => {
        const resultado = filtrarShares(mockShares, { categoria: 'Arte' });
        expect(resultado).toHaveLength(2);
    });

    it('filtra por spice correctamente', () => {
        const resultado = filtrarShares(mockShares, { spice: 'TDAH' });
        expect(resultado).toHaveLength(1);
        expect(resultado[0].titulo).toBe('Share B');
    });

    it('filtra por verificados', () => {
        const resultado = filtrarShares(mockShares, { soloVerificados: true });
        expect(resultado).toHaveLength(2);
    });

    it('aplica múltiples filtros a la vez', () => {
        const resultado = filtrarShares(mockShares, {
            categoria: 'Arte',
            soloVerificados: true,
        });
        expect(resultado).toHaveLength(2);
    });
});