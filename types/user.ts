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
    nombre_completo: string;
    name: string;
    foto: string;
    descripcion_perfil: string;
    usuario_verificado: boolean;
    created_at: Date;
    spices_seguidos: {
        spice: {
            id: string;
            nombre: string;
        }
    }[];
    standard?: StandardData;
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
    }
};
