/*
  Warnings:

  - You are about to drop the column `weatherForecast` on the `Climate` table. All the data in the column will be lost.
  - Added the required column `city` to the `Climate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Climate" DROP COLUMN "weatherForecast",
ADD COLUMN     "city" TEXT NOT NULL;
