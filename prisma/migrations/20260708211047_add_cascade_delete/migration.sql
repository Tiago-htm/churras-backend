-- DropForeignKey
ALTER TABLE "Comprovante" DROP CONSTRAINT "Comprovante_grillUuid_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_grillUuid_fkey";

-- AddForeignKey
ALTER TABLE "Comprovante" ADD CONSTRAINT "Comprovante_grillUuid_fkey" FOREIGN KEY ("grillUuid") REFERENCES "Grill"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_grillUuid_fkey" FOREIGN KEY ("grillUuid") REFERENCES "Grill"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
