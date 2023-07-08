/*
  Warnings:

  - You are about to drop the `_RecipeIngredients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipe_id` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_RecipeIngredients" DROP CONSTRAINT "_RecipeIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeIngredients" DROP CONSTRAINT "_RecipeIngredients_B_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "recipe_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_RecipeIngredients";

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
