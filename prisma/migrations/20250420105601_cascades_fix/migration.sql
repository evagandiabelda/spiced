-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_share_id_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_expertId_fkey";

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "Expert"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;
