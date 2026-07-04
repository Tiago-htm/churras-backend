/*
  Warnings:

  - You are about to drop the column `climateUuid` on the `Grill` table. All the data in the column will be lost.
  - Added the required column `city` to the `Grill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grill" DROP CONSTRAINT "Grill_climateUuid_fkey";

-- AlterTable
ALTER TABLE "Grill" DROP COLUMN "climateUuid",
ADD COLUMN     "city" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Comprovante" (
    "uuid" TEXT NOT NULL,
    "grillUuid" TEXT NOT NULL,
    "climateUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comprovante_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comprovante_grillUuid_key" ON "Comprovante"("grillUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Comprovante_climateUuid_key" ON "Comprovante"("climateUuid");

-- AddForeignKey
ALTER TABLE "Comprovante" ADD CONSTRAINT "Comprovante_grillUuid_fkey" FOREIGN KEY ("grillUuid") REFERENCES "Grill"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprovante" ADD CONSTRAINT "Comprovante_climateUuid_fkey" FOREIGN KEY ("climateUuid") REFERENCES "Climate"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
