/*
  Warnings:

  - You are about to drop the column `validatde` on the `CartaoCredito` table. All the data in the column will be lost.
  - Added the required column `validade` to the `CartaoCredito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartaoCredito" DROP COLUMN "validatde",
ADD COLUMN     "validade" TEXT NOT NULL;
