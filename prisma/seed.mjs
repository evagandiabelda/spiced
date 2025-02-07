import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Crear 6 usuarios
    for (let i = 0; i < 6; i++) {
        const usuario = await prisma.usuario.create({
            data: {
                nombre_completo: faker.person.fullName(),
                nombre_usuario: faker.internet.username(),
                email: faker.internet.email(),
                password: faker.internet.password(), // Recuerda en un entorno real cifrar la contraseña
                foto: faker.image.avatar(),
                descripcion_perfil: faker.lorem.sentences(2), // Genera una descripción aleatoria
                perfil_privado: false,
            },
        });

        // Crear 3 shares para cada usuario
        for (let j = 0; j < 3; j++) {
            await prisma.share.create({
                data: {
                    titulo: faker.lorem.sentence(),
                    texto: faker.lorem.paragraphs(3), // Genera 3 párrafos aleatorios como el texto
                    img_principal: faker.image.urlPicsumPhotos(),
                    img_secundaria: faker.image.urlPicsumPhotos(),
                    share_verificado: faker.datatype.boolean(),
                    created_at: faker.date.past(),
                    usuarioId: usuario.id, // Relacionamos el share con el usuario
                },
            });
        }
    }

    console.log('Datos de prueba generados con éxito.');
}

// Ejecutar la función principal y manejar errores
main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
