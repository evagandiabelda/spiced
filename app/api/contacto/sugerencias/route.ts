import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const { valoracion, mensaje } = await request.json();

        if (!valoracion || !mensaje) {
            return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // <- Cambiado aquí
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Spiced App" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: "Nueva sugerencia recibida desde la plataforma",
            html: `
          <p><strong>Valoración:</strong> ${valoracion}</p>
          <p><strong>Mensaje:</strong><br/>${mensaje}</p>
        `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error enviando email:", error);
        return NextResponse.json({ error: "Error enviando el mensaje." }, { status: 500 });
    }
}