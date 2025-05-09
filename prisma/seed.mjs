import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    await prisma.seguimiento.deleteMany();
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
            nombre_real: 'Administrador',
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

    // Se recupera el archivo JSON que contiene los datos para cada Usuario:
    const usersFilePath = path.join(__dirname, '..', 'lib', 'users.json');
    const usersData = JSON.parse(await fs.readFile(usersFilePath, 'utf-8'));
    let expertIndex = 0; // Para acceder a cada Usuario Experto.
    let standardIndex = 0; // Para acceder a cada Usuario Standard.

    console.log('Creando usuarios Expert...');
    const expertUsers = [];

    for (let i = 0; i < 3; i++) {
        // Se accede a la posición de un Usuario Experto en el JSON.
        const userData = usersData.usuarios_expertos[expertIndex];
        if (!userData) break;
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
                nombre_real: userData.nombre_real,
                name: userData.name,
                email: faker.internet.email(),
                password: hashedPassword,
                foto: userData.foto,
                descripcion_perfil: userData.descripcion_perfil,
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

        expertIndex++; // Se incrementa el valor para acceder al siguiente usuario en la siguiente iteración.
    }

    /* --------- 🟠 CREACIÓN DE 6 USUARIOS STANDARD: --------- */

    console.log('Creando usuarios Standard...');
    const standardUsers = [];
    for (let i = 0; i < 6; i++) {
        // Se accede a la posición de un Usuario Estándar en el JSON.
        const userData = usersData.usuarios_estandar[standardIndex];
        if (!userData) break;
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
                nombre_real: userData.nombre_real,
                name: userData.name,
                email: faker.internet.email(),
                password: hashedPassword,
                foto: userData.foto,
                descripcion_perfil: userData.descripcion_perfil,
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

        standardIndex++; // Se incrementa el valor para acceder al siguiente usuario en la siguiente iteración. 
    }

    /* --------- SEGUIMIENTO ENTRE USUARIOS: --------- */

    // Primero se unen los usuarios 'expert' y 'standard' en un solo array:
    const allUsers = [...expertUsers, ...standardUsers];

    console.log('Creando relaciones de seguimiento entre usuarios...');

    // Luego se crean 3 relaciones de seguimiento entre usuarios aleatorios:
    for (const user of allUsers) {
        // Creamos un array de posibles usuarios a seguir (que no sea el propio usuario)
        const possibleUsersToFollow = allUsers.filter(u => u.id !== user.id);
        // Elegimos aleatoriamente 3 usuarios distintos de los posibles
        const usersToFollow = faker.helpers.arrayElements(possibleUsersToFollow, { min: 1, max: 3 });

        for (const followedUser of usersToFollow) {
            await prisma.seguimiento.create({
                data: {
                    seguidor_id: user.id,
                    seguido_id: followedUser.id,
                }
            });
        }
    }

    /* --------- 📝 CREACIÓN DE SHARES: --------- */

    console.log('Creando Shares...');

    // Se recupera el archivo JSON que contiene el título y el texto para cada Share:
    const sharesFilePath = path.join(__dirname, '..', 'lib', 'shares.json');
    const sharesData = JSON.parse(await fs.readFile(sharesFilePath, 'utf-8'));
    let shareExpertIndex = 0; // Para acceder a cada Share de usuarios Expertos.
    let shareStandardIndex = 0; // Para acceder a cada Share de usuarios Estándar.

    // Se obtienen todos los spices y categorías creados:
    const allSpices = await prisma.spice.findMany();
    const allCategories = await prisma.categoria.findMany();

    // Se crean 3 shares por cada usuario Experto:
    for (const user of expertUsers) {
        for (let j = 0; j < 3; j++) {
            // Se accede a la posición de un Share en el JSON.
            const shareData = sharesData.shares_expertos[shareExpertIndex];
            if (!shareData) break;
            // Se asigna el valor de 'titulo' a partir del JSON y se construye el slug a partir del título:
            const titulo = shareData.titulo;
            const slug = generateSlug(titulo);
            // Se seleccionan aleatoriamente 3 spices y 1 categoría:
            const randomSpices = faker.helpers.arrayElements(allSpices, { min: 1, max: 3 });
            const randomCategories = faker.helpers.arrayElements(allCategories, { min: 1, max: 3 });
            // Se obtiene el estado de verificación del autor:
            const autor = await prisma.user.findUnique({
                where: { id: user.id },
                select: { usuario_verificado: true },
            });

            // Se crea el share:
            let share = await prisma.share.create({
                data: {
                    titulo,
                    slug,
                    texto: shareData.texto,
                    img_principal: shareData.img_principal,
                    img_secundaria: shareData.img_secundaria,
                    autor_id: user.id,
                    share_verificado: autor?.usuario_verificado ?? false,
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

            // Se asocia las categorías al share:
            for (const category of randomCategories) {
                await prisma.shareCategoria.create({
                    data: {
                        share_id: share.id,
                        categoria_id: category.id
                    }
                });
            }

            /* --------- 📣 CREACIÓN DE COMENTARIOS: --------- */

            if (shareData.comentarios) {
                for (const comentario of shareData.comentarios) {
                    const randomUser = faker.helpers.arrayElement(allUsers);
                    await prisma.comentario.create({
                        data: {
                            texto: comentario.texto,
                            user_id: randomUser.id,
                            share_id: share.id,
                        },
                    });
                }
            }

            shareExpertIndex++; // Se incrementa para pasar al siguiente Share en el JSON.
        }
    }

    // Se crean 3 shares por cada usuario Estándar:
    for (const user of standardUsers) {
        for (let j = 0; j < 3; j++) {
            // Se accede a la posición de un Share en el JSON.
            const shareData = sharesData.shares_estandar[shareStandardIndex];
            if (!shareData) break;
            // Se asigna el valor de 'titulo' y 'texto' a partir del JSON y se construye el slug a partir del título:
            const titulo = shareData.titulo;
            const slug = generateSlug(titulo);
            // Se seleccionan aleatoriamente 3 spices y 1 categoría:
            const randomSpices = faker.helpers.arrayElements(allSpices, { min: 1, max: 3 });
            const randomCategories = faker.helpers.arrayElements(allCategories, { min: 1, max: 3 });
            // Se obtiene el estado de verificación del autor:
            const autor = await prisma.user.findUnique({
                where: { id: user.id },
                select: { usuario_verificado: true },
            });

            // Se crea el share:
            let share = await prisma.share.create({
                data: {
                    titulo,
                    slug,
                    texto: shareData.texto,
                    img_principal: shareData.img_principal,
                    img_secundaria: shareData.img_secundaria,
                    autor_id: user.id,
                    share_verificado: autor?.usuario_verificado ?? false,
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

            // Se asocia las categorías al share:
            for (const category of randomCategories) {
                await prisma.shareCategoria.create({
                    data: {
                        share_id: share.id,
                        categoria_id: category.id
                    }
                });
            }

            /* --------- 📣 CREACIÓN DE COMENTARIOS: --------- */

            if (shareData.comentarios) {
                for (const comentario of shareData.comentarios) {
                    const randomUser = faker.helpers.arrayElement(allUsers);
                    await prisma.comentario.create({
                        data: {
                            texto: comentario.texto,
                            user_id: randomUser.id,
                            share_id: share.id,
                        },
                    });
                }
            }

            shareStandardIndex++; // Se incrementa para pasar al siguiente Share en el JSON.
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
