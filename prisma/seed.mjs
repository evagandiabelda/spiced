import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 6; i++) {
        const hashedPassword = await bcrypt.hash(faker.internet.password(), 10); // 🔹 Hasheamos la contraseña

        const usuario = await prisma.usuario.create({
            data: {
                nombre_completo: faker.person.fullName(),
                nombre_usuario: faker.internet.username(),
                email: faker.internet.email(),
                password: hashedPassword, // 🔹 Guardamos la contraseña hasheada
                foto: faker.image.avatar(),
                descripcion_perfil: faker.lorem.sentences(2),
                perfil_privado: false,
            },
        });

        for (let j = 0; j < 3; j++) {
            await prisma.share.create({
                data: {
                    titulo: faker.lorem.sentence(),
                    texto: faker.lorem.paragraphs(3),
                    img_principal: faker.image.urlPicsumPhotos(),
                    img_secundaria: faker.image.urlPicsumPhotos(),
                    share_verificado: faker.datatype.boolean(),
                    created_at: faker.date.past(),
                    usuarioId: usuario.id,
                },
            });
        }
    }

    console.log('Datos de prueba generados con éxito.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
