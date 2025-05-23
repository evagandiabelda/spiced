-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('Masculino', 'Femenino', 'No_binario');

-- CreateEnum
CREATE TYPE "Insignia" AS ENUM ('pequeno_saltamontes', 'cacahuete_sabio', 'cactus_legendario');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nombre_real" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "descripcion_perfil" TEXT,
    "usuario_verificado" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Expert" (
    "user_id" TEXT NOT NULL,
    "num_colegiado" TEXT NOT NULL,
    "anyos_experiencia" INTEGER NOT NULL,
    "lista_titulaciones" TEXT[],

    CONSTRAINT "Expert_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Standard" (
    "user_id" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "genero" "Genero" NOT NULL,
    "insignia" "Insignia" NOT NULL DEFAULT 'pequeno_saltamontes',

    CONSTRAINT "Standard_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "img_principal" TEXT NOT NULL,
    "img_secundaria" TEXT,
    "share_verificado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT,
    "autor_id" TEXT NOT NULL,
    "expertId" TEXT,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spice" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Spice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "share_id" TEXT NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DenunciaShare" (
    "id" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "share_id" TEXT NOT NULL,

    CONSTRAINT "DenunciaShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DenunciaComentario" (
    "id" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "comentario_id" TEXT NOT NULL,

    CONSTRAINT "DenunciaComentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seguimiento" (
    "id" TEXT NOT NULL,
    "seguidor_id" TEXT NOT NULL,
    "seguido_id" TEXT NOT NULL,

    CONSTRAINT "Seguimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShareGuardado" (
    "user_id" TEXT NOT NULL,
    "share_id" TEXT NOT NULL,

    CONSTRAINT "ShareGuardado_pkey" PRIMARY KEY ("user_id","share_id")
);

-- CreateTable
CREATE TABLE "UsuarioSpice" (
    "user_id" TEXT NOT NULL,
    "spice_id" TEXT NOT NULL,

    CONSTRAINT "UsuarioSpice_pkey" PRIMARY KEY ("user_id","spice_id")
);

-- CreateTable
CREATE TABLE "ShareSpice" (
    "share_id" TEXT NOT NULL,
    "spice_id" TEXT NOT NULL,

    CONSTRAINT "ShareSpice_pkey" PRIMARY KEY ("share_id","spice_id")
);

-- CreateTable
CREATE TABLE "UsuarioCategoria" (
    "user_id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,

    CONSTRAINT "UsuarioCategoria_pkey" PRIMARY KEY ("user_id","categoria_id")
);

-- CreateTable
CREATE TABLE "ShareCategoria" (
    "share_id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,

    CONSTRAINT "ShareCategoria_pkey" PRIMARY KEY ("share_id","categoria_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Expert_num_colegiado_key" ON "Expert"("num_colegiado");

-- CreateIndex
CREATE UNIQUE INDEX "Share_slug_key" ON "Share"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Spice_nombre_key" ON "Spice"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Seguimiento_seguidor_id_seguido_id_key" ON "Seguimiento"("seguidor_id", "seguido_id");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expert" ADD CONSTRAINT "Expert_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard" ADD CONSTRAINT "Standard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "Expert"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DenunciaShare" ADD CONSTRAINT "DenunciaShare_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DenunciaShare" ADD CONSTRAINT "DenunciaShare_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DenunciaComentario" ADD CONSTRAINT "DenunciaComentario_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DenunciaComentario" ADD CONSTRAINT "DenunciaComentario_comentario_id_fkey" FOREIGN KEY ("comentario_id") REFERENCES "Comentario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguimiento" ADD CONSTRAINT "Seguimiento_seguido_id_fkey" FOREIGN KEY ("seguido_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguimiento" ADD CONSTRAINT "Seguimiento_seguidor_id_fkey" FOREIGN KEY ("seguidor_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareGuardado" ADD CONSTRAINT "ShareGuardado_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareGuardado" ADD CONSTRAINT "ShareGuardado_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioSpice" ADD CONSTRAINT "UsuarioSpice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioSpice" ADD CONSTRAINT "UsuarioSpice_spice_id_fkey" FOREIGN KEY ("spice_id") REFERENCES "Spice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareSpice" ADD CONSTRAINT "ShareSpice_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareSpice" ADD CONSTRAINT "ShareSpice_spice_id_fkey" FOREIGN KEY ("spice_id") REFERENCES "Spice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCategoria" ADD CONSTRAINT "UsuarioCategoria_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCategoria" ADD CONSTRAINT "UsuarioCategoria_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareCategoria" ADD CONSTRAINT "ShareCategoria_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareCategoria" ADD CONSTRAINT "ShareCategoria_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
