
/* Script para crear slugs para cada Share, en base al título */

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[\s\W-]+/g, "-") // Reemplaza espacios y caracteres no alfanuméricos por guiones
        .replace(/^-+|-+$/g, "");  // Elimina guiones al inicio o final
}