import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

/* --------- SUBIR LAS IMÁGENES/ARCHIVOS A CLOUDINARY --------- */

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
        const uploadResponse = await cloudinary.v2.uploader.upload(base64String);

        const secureUrl = uploadResponse.secure_url;

        if (!secureUrl) {
            return NextResponse.json({ error: "No se ha podido generar la URL." }, { status: 400 });
        }

        return NextResponse.json({
            url: secureUrl,
            public_id: uploadResponse.public_id
        });
    } catch (error) {
        console.error("Error subiendo la imagen a Cloudinary:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

/* --------- ELIMINAR LAS IMÁGENES/ARCHIVOS DE CLOUDINARY --------- */

export async function DELETE(req: Request) {
    try {
        const { public_id } = await req.json();

        if (!public_id) {
            return NextResponse.json({ error: "No se ha proporcionado el public_id." }, { status: 400 });
        }

        const result = await cloudinary.v2.uploader.destroy(public_id);

        if (result.result !== "ok") {
            return NextResponse.json({ error: "Error al eliminar el archivo." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error eliminando archivo de Cloudinary.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
