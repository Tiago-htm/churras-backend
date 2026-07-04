-- CreateEnum
CREATE TYPE "Meat" AS ENUM ('FRANGO', 'SUINA', 'BOVINA', 'LINGUICA');

-- CreateEnum
CREATE TYPE "Sides" AS ENUM ('PAO_DE_ALHO', 'VINAGRETE', 'QUEIJO_QUALHO', 'FAROFA');

-- CreateEnum
CREATE TYPE "Vegetables" AS ENUM ('PIMENTOES', 'BATATA', 'MILHO', 'ABOBINHA');

-- CreateEnum
CREATE TYPE "Drinks" AS ENUM ('CERVEJA', 'REFRIGERANTE', 'AGUA', 'SUCO', 'ENERGETICO');

-- CreateEnum
CREATE TYPE "Extras" AS ENUM ('CARVAO', 'GELO');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Climate" (
    "uuid" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "weatherForecast" TEXT NOT NULL,

    CONSTRAINT "Climate_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Grill" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "adult" INTEGER NOT NULL,
    "kids" INTEGER NOT NULL,
    "isVegan" BOOLEAN NOT NULL,
    "userUuid" TEXT NOT NULL,
    "climateUuid" TEXT NOT NULL,

    CONSTRAINT "Grill_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Item" (
    "uuid" TEXT NOT NULL,
    "meat" "Meat",
    "side" "Sides",
    "vegetable" "Vegetables",
    "drink" "Drinks",
    "extra" "Extras",
    "quantity" DOUBLE PRECISION,
    "weight" TEXT,
    "grillUuid" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Grill" ADD CONSTRAINT "Grill_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grill" ADD CONSTRAINT "Grill_climateUuid_fkey" FOREIGN KEY ("climateUuid") REFERENCES "Climate"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_grillUuid_fkey" FOREIGN KEY ("grillUuid") REFERENCES "Grill"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
