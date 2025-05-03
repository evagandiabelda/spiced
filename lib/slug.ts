
/* Script para crear un slug para cada Share, a partir de su título */

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[\s\W-]+/g, "-") // Reemplaza espacios y caracteres no alfanuméricos por guiones
        .replace(/^-+|-+$/g, "");  // Elimina guiones al inicio o final
}