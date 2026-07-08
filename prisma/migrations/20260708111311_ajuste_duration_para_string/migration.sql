/*
  Warnings:

  - The values [ABOBINHA] on the enum `Vegetables` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Vegetables_new" AS ENUM ('PIMENTOES', 'BATATA', 'MILHO', 'ABOBRINHA');
ALTER TABLE "Item" ALTER COLUMN "vegetable" TYPE "Vegetables_new" USING ("vegetable"::text::"Vegetables_new");
ALTER TYPE "Vegetables" RENAME TO "Vegetables_old";
ALTER TYPE "Vegetables_new" RENAME TO "Vegetables";
DROP TYPE "public"."Vegetables_old";
COMMIT;

-- AlterTable
ALTER TABLE "Grill" ALTER COLUMN "time" SET DATA TYPE TEXT;
