import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

/* --------- SUBIR LAS IMÁGENES CARGADAS A CLOUDINARY --------- */

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No se ha proporcionado ningún archivo" }, { status: 400 });
        }

        // Convertir el archivo a un buffer base64
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Subir a Cloudinary
        const uploadResponse = await cloudinary.v2.uploader.upload(base64String, {
            folder: "shares",
        });

        const secureUrl = uploadResponse.secure_url;
        console.log(secureUrl);

        return NextResponse.json({ url: secureUrl });
    } catch (error) {
        console.error("Error subiendo la imagen a Cloudinary:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
