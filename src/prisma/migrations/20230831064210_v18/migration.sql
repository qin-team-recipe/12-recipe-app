/*
  Warnings:

  - You are about to drop the column `is_custom` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `order` to the `CartListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartListItem" DROP CONSTRAINT "CartListItem_ingredient_id_fkey";

-- AlterTable
ALTER TABLE "CartListItem" ADD COLUMN     "is_custom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "ingredient_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "is_custom";

-- AddForeignKey
ALTER TABLE "CartListItem" ADD CONSTRAINT "CartListItem_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
