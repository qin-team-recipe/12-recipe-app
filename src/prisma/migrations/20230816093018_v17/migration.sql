/*
  Warnings:

  - Changed the type of `step_description` on the `DraftInstruction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `step_description` on the `Instruction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DraftInstruction" DROP COLUMN "step_description",
ADD COLUMN     "step_description" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Instruction" DROP COLUMN "step_description",
ADD COLUMN     "step_description" JSONB NOT NULL;
