/*
  Warnings:

  - You are about to alter the column `step_order` on the `Instruction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Instruction" ALTER COLUMN "step_order" SET DATA TYPE INTEGER;
