export async function getUnsplashImageUrl(unsplashUrl: string): Promise<string | null> {
    try {
        // Extraer el ID de la imagen de la URL
        const photoId = unsplashUrl.split("-").pop();
        if (!photoId) return null;

        // Hacer la petición a la API de Unsplash
        const response = await fetch(`https://api.unsplash.com/photos/${photoId}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);

        if (!response.ok) {
            console.error("Error al obtener la imagen de Unsplash", await response.text());
            return null;
        }

        const data = await response.json();
        return data.urls.regular; // Devolver la URL de la imagen
    } catch (error) {
        console.error("Error en getUnsplashImageUrl:", error);
        return null;
    }
}
