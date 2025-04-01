import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Borrando datos existentes...');
    await prisma.denunciaComentario.deleteMany();
    await prisma.denunciaShare.deleteMany();
    await prisma.comentario.deleteMany();
    await prisma.shareGuardado.deleteMany();
    await prisma.share.deleteMany();
    await prisma.usuarioSpice.deleteMany();
    await prisma.shareSpice.deleteMany();
    await prisma.usuarioCategoria.deleteMany();
    await prisma.shareCategoria.deleteMany();
    await prisma.spice.deleteMany();
    await prisma.categoria.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.expert.deleteMany();
    await prisma.standard.deleteMany();
    await prisma.user.deleteMany();

    /* --------- 🌱 CREACIÓN DE LISTA DE SPICES Y CATEGORÍAS: --------- */

    console.log('Creando lista de Spices...');
    const spices = ['TEA', 'TDAH', 'TOC', 'TLP', 'TAG', 'TP', 'TPA', 'TB', 'TEP', 'TD', 'TE', 'TA', 'ADI', 'FOB', 'OTR'].map(spice =>
        prisma.spice.create({ data: { nombre: spice } })
    );
    await Promise.all(spices);

    console.log('Creando lista de Categorías...');
    const categories = ['Arte', 'Bienestar', 'Cine', 'Compartir', 'Documentales', 'Educación', 'Gaming', 'Hogar', 'Lectura', 'Recetas'].map(category =>
        prisma.categoria.create({ data: { nombre: category } })
    );
    await Promise.all(categories);

    /* --------- 🟢 CREACIÓN DE 1 USUARIO ADMIN: --------- */

    console.log('Creando usuario Admin...');
    // Primero se crea una contraseña hasheada:
    const hashedPassword = await bcrypt.hash('password123', 10);
    // Primero se definen los datos básicos de un usuario genérico:
    const adminUser = await prisma.user.create({
        data: {
            nombre_completo: 'Administrador',
            name: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            foto: "/iconos/iconos-registro/avatar-admin.svg",
            is_admin: true,
        }
    });
    // Luego se crea un usuario 'admin' a partir del usuario genérico:
    await prisma.admin.create({ data: { id: adminUser.id } });

    /* --------- 🟣 CREACIÓN DE 3 USUARIOS EXPERT: --------- */

    console.log('Creando usuarios Expert...');
    const expertUsers = [];
    for (let i = 0; i < 3; i++) {
        // Primero se crea una contraseña hasheada:
        const hashedPassword = await bcrypt.hash('password123', 10);
        // Luego obtenemos la lista de spices y categorías creadas:
        const allSpices = await prisma.spice.findMany();
        const randomSpices = faker.helpers.arrayElements(allSpices, { min: 1, max: 3 });
        const allCategories = await prisma.categoria.findMany();
        const randomCategories = faker.helpers.arrayElements(allCategories, { min: 1, max: 3 });
        // Luego se definen los datos básicos de un usuario genérico:
        const user = await prisma.user.create({
            data: {
                nombre_completo: faker.person.fullName(),
                name: faker.internet.username(),
                email: faker.internet.email(),
                password: hashedPassword,
                foto: faker.image.avatar(),
                descripcion_perfil: faker.lorem.sentences(2),
                usuario_verificado: true,
            },
        });
        // Luego se crea un usuario 'expert' a partir del usuario genérico:
        const expert = await prisma.expert.create({
            data: {
                id: user.id,
                num_colegiado: faker.string.uuid(),
                anyos_experiencia: faker.number.int({ min: 1, max: 30 }),
                lista_titulaciones: [],
            },
        });
        // Se asocian los spices al usuario:
        for (const spice of randomSpices) {
            await prisma.usuarioSpice.create({
                data: {
                    user_id: user.id,
                    spice_id: spice.id
                }
            });
        }
        // Se asocian las categorías al usuario:
        for (const category of randomCategories) {
            await prisma.usuarioCategoria.create({
                data: {
                    user_id: user.id,
                    categoria_id: category.id
                }
            });
        }
        // Finalmente se añade a un array para su posterior uso:
        expertUsers.push(expert);
    }

    /* --------- 🟠 CREACIÓN DE 6 USUARIOS STANDARD: --------- */

    console.log('Creando usuarios Standard...');
    const standardUsers = [];
    for (let i = 0; i < 6; i++) {
        // Primero se crea una contraseña hasheada:
        const hashedPassword = await bcrypt.hash('password123', 10);
        // Luego obtenemos la lista de spices y categorías creadas:
        const allSpices = await prisma.spice.findMany();
        const randomSpices = faker.helpers.arrayElements(allSpices, { min: 1, max: 3 });
        const allCategories = await prisma.categoria.findMany();
        const randomCategories = faker.helpers.arrayElements(allCategories, { min: 1, max: 3 });
        // Luego se definen los datos básicos de un usuario genérico:
        const user = await prisma.user.create({
            data: {
                nombre_completo: faker.person.fullName(),
                name: faker.internet.username(),
                email: faker.internet.email(),
                password: hashedPassword,
                foto: faker.image.avatar(),
                descripcion_perfil: faker.lorem.sentences(2),
            },
        });
        // Luego se crea un usuario 'standard' a partir del usuario genérico:
        const standard = await prisma.standard.create({
            data: {
                id: user.id,
                fecha_nacimiento: faker.date.birthdate(),
                genero: faker.helpers.arrayElement(['Masculino', 'Femenino', 'No_binario']),
                insignia: faker.helpers.arrayElement(['pequeno_saltamontes', 'cacahuete_sabio', 'cactus_legendario'])
            },
        });
        // Se asocian los spices al usuario:
        for (const spice of randomSpices) {
            await prisma.usuarioSpice.create({
                data: {
                    user_id: user.id,
                    spice_id: spice.id
                }
            });
        }
        // Se asocian las categorías al usuario:
        for (const category of randomCategories) {
            await prisma.usuarioCategoria.create({
                data: {
                    user_id: user.id,
                    categoria_id: category.id
                }
            });
        }
        // Finalmente se añade a un array para su posterior uso:
        standardUsers.push(standard);
    }

    /* --------- 📝 CREACIÓN DE SHARES: --------- */

    console.log('Creando Shares...');
    // Primero se unen los usuarios 'expert' y 'standard' en un solo array:
    const allUsers = [...expertUsers, ...standardUsers];
    // Luego se obtienen todos los spices y categorías creados:
    const allSpices = await prisma.spice.findMany();
    const allCategories = await prisma.categoria.findMany();
    // Luego se crean 3 shares por cada usuario:
    for (const user of allUsers) {
        for (let j = 0; j < 3; j++) {
            // Se construye el slug a partir del título:
            const titulo = faker.lorem.sentence();
            const slug = generateSlug(titulo);
            // Se seleccionan aleatoriamente 3 spices y 1 categoría:
            const randomSpices = faker.helpers.arrayElements(allSpices, { min: 1, max: 3 });
            const randomCategory = faker.helpers.arrayElement(allCategories);
            // Se crea el share:
            let share = await prisma.share.create({
                data: {
                    titulo,
                    slug,
                    texto: faker.lorem.paragraphs(3),
                    img_principal: faker.image.urlPicsumPhotos(),
                    img_secundaria: faker.image.urlPicsumPhotos(),
                    autor_id: user.id,
                    share_verificado: faker.datatype.boolean(),
                },
            });
            // Se asocian los spices al share:
            for (const spice of randomSpices) {
                await prisma.shareSpice.create({
                    data: {
                        share_id: share.id,
                        spice_id: spice.id
                    }
                });
            }
            // Se asocia la categoría al share:
            await prisma.shareCategoria.create({
                data: {
                    share_id: share.id,
                    categoria_id: randomCategory.id
                }
            });
        }
    }

    /* --------- 📣 CREACIÓN DE COMENTARIOS: --------- */

    console.log('Creando Comentarios aleatorios...');
    // Primero se obtienen todos los shares creados:
    const allShares = await prisma.share.findMany();
    // Luego se crean 3 comentarios por cada share:
    for (const share of allShares) {
        for (let k = 0; k < 3; k++) {
            // Se elige un usuario aleatorio de la lista de usuarios:
            const randomUser = faker.helpers.arrayElement(allUsers);
            // Se crea el comentario:
            await prisma.comentario.create({
                data: {
                    texto: faker.lorem.sentence(),
                    user_id: randomUser.id,
                    share_id: share.id,
                },
            });
        }
    }

    console.log('Datos de prueba generados con éxito.');
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
