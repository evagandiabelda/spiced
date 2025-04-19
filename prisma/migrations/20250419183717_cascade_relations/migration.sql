-- DropForeignKey
ALTER TABLE "ShareCategoria" DROP CONSTRAINT "ShareCategoria_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "ShareCategoria" DROP CONSTRAINT "ShareCategoria_share_id_fkey";

-- DropForeignKey
ALTER TABLE "ShareSpice" DROP CONSTRAINT "ShareSpice_share_id_fkey";

-- DropForeignKey
ALTER TABLE "ShareSpice" DROP CONSTRAINT "ShareSpice_spice_id_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioCategoria" DROP CONSTRAINT "UsuarioCategoria_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioCategoria" DROP CONSTRAINT "UsuarioCategoria_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioSpice" DROP CONSTRAINT "UsuarioSpice_spice_id_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioSpice" DROP CONSTRAINT "UsuarioSpice_user_id_fkey";

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
