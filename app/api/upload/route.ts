import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No se ha proporcionado ningún archivo" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generar un nombre único para el archivo
        const fileName = `${uuidv4()}-${file.name}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);

        // Guardar el archivo en la carpeta `public/uploads`
        await writeFile(filePath, buffer);

        // Devolver la URL pública del archivo
        const fileUrl = `/uploads/${fileName}`;
        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.error("Error subiendo la imagen:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
