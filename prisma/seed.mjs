import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany(); // Borra los usuarios actuales para evitar conflictos
    await prisma.share.deleteMany(); // Borra los shares actuales para evitar conflictos

    for (let i = 0; i < 6; i++) {
        const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);

        // CREAMOS 6 USUARIOS:
        const user = await prisma.user.create({
            data: {
                nombre_completo: faker.person.fullName(),
                name: faker.internet.username(),
                email: faker.internet.email(),
                password: hashedPassword,
                foto: faker.image.avatar(),
                descripcion_perfil: faker.lorem.sentences(2),
                perfil_privado: false,
            },
        });

        // POR CADA USUARIO CREADO, CREAMOS 3 SHARES:
        for (let j = 0; j < 3; j++) {
            const titulo = faker.lorem.sentence();
            const slug = generateSlug(titulo); // Generamos el slug antes de crear el share

            await prisma.share.create({
                data: {
                    titulo,
                    slug, // 🔹 Guardamos el slug directamente
                    texto: faker.lorem.paragraphs(3),
                    img_principal: faker.image.urlPicsumPhotos(),
                    img_secundaria: faker.image.urlPicsumPhotos(),
                    share_verificado: faker.datatype.boolean(),
                    created_at: faker.date.past(),
                    userId: user.id,
                },
            });
        }
    }

    console.log('Datos de prueba generados con éxito.');
}

// Función para generar slugs
function generateSlug(title) {
    return title
        .toLowerCase()
        .normalize("NFD") // Elimina acentos
        .replace(/[\u0300-\u036f]/g, "") // Quita caracteres especiales
        .replace(/[\s\W-]+/g, "-") // Reemplaza espacios y caracteres no alfanuméricos por guiones
        .replace(/^-+|-+$/g, "");  // Elimina guiones al inicio o final
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
