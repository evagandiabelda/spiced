// Para el ENUM de Insignias:

export const INSIGNIAS = [
    "pequeno_saltamontes",
    "cacahuete_sabio",
    "cactus_legendario",
] as const;

export type Insignia = typeof INSIGNIAS[number];

// Para el ENUM de Género:

export const GENEROS = [
    "Masculino",
    "Femenino",
    "No_binario",
] as const;

export type Genero = typeof GENEROS[number];

// Se asignan al usuario Standard:

export type StandardData = {
    insignia: Insignia;
    genero: Genero;
};

export type UserData = {
    id: string;
    nombre_real: string;
    name: string;
    foto: string;
    descripcion_perfil: string;
    is_admin: boolean;
    usuario_verificado: boolean;
    standard?: StandardData;
    created_at: Date;
    shares_publicados: {
        share: {
            id: string;
            titulo: string;
            texto: string;
            img_principal: string;
            share_verificado: boolean;
            slug: string;
            spices: {
                spice: {
                    id: string;
                    nombre: string;
                }
            }[];
            categorias: {
                categoria: {
                    id: string;
                    nombre: string;
                }
            }[];
        }
    }[];
    comentarios: {
        comentario: {
            id: string;
            texto: string;
            created_at: Date;
            share: {
                id: string;
                titulo: string;
                img_principal: string;
                slug: string;
            }
        }
    }[];
    seguidores: {
        id: string;
        nombre_real: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    }[];
    spices_seguidos: {
        spice: {
            id: string;
            nombre: string;
        }
    }[];
    categorias_seguidas: {
        categoria: {
            id: string;
            nombre: string;
        }
    }[];
    denuncias_shares: {
        id: string;
        motivo: string;
        created_at: Date;
        share: {
            id: string;
            titulo: string;
            img_principal: string;
            slug: string;
        }
    }[];
    denuncias_comentarios: {
        id: string;
        motivo: string;
        created_at: Date;
        comentario: {
            id: string;
            texto: string;
            created_at: Date;
            share: {
                id: string;
                titulo: string;
                img_principal: string;
                slug: string;
            }
        }
    }[];
};
