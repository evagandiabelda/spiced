export type ShareData = {
    id: string;
    titulo: string;
    texto: string;
    img_principal: string;
    img_secundaria?: string;
    share_verificado: boolean;
    created_at: Date;
    slug?: string;
    guardados: {
        user: {
            id: string;
            nombre_real: string;
            name: string;
            foto: string;
            usuario_verificado: boolean;
        };
    }[];
    autor: {
        id: string;
        nombre_real: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    };
    spices: {
        spice: {
            id: string;
            nombre: string;
        };
    }[];
    categorias: {
        categoria: {
            id: string;
            nombre: string;
        };
    }[];
    comentarios: {
        id: string;
        texto: string;
        created_at: Date;
        user: {
            id: string;
            nombre_real: string;
            name: string;
            foto: string;
            usuario_verificado: boolean;
        };
    }[];
    denuncias: {
        id: string;
        motivo: string;
        created_at: Date;
        user: {
            id: string;
            nombre_real: string;
            name: string;
            foto: string;
            usuario_verificado: boolean;
        };
    }[];
}