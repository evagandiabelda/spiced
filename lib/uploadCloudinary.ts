export async function uploadCloudinary(file: File): Promise<{ url: string; public_id: string }> {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Error al subir la imagen a Cloudinary");
    }

    const data = await res.json();

    return {
        url: data.secure_url,
        public_id: data.public_id,
    };
}
