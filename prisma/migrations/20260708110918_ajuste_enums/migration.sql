/*
  Warnings:

  - The values [QUEIJO_QUALHO] on the enum `Sides` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Extras" ADD VALUE 'SAL_GROSSO';

-- AlterEnum
BEGIN;
CREATE TYPE "Sides_new" AS ENUM ('PAO_DE_ALHO', 'VINAGRETE', 'QUEIJO_COALHO', 'FAROFA');
ALTER TABLE "Item" ALTER COLUMN "side" TYPE "Sides_new" USING ("side"::text::"Sides_new");
ALTER TYPE "Sides" RENAME TO "Sides_old";
ALTER TYPE "Sides_new" RENAME TO "Sides";
DROP TYPE "public"."Sides_old";
COMMIT;
