/*
  Warnings:

  - You are about to drop the column `chef_id` on the `UserLink` table. All the data in the column will be lost.
  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `site_name` to the `UserLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "UserLink" DROP CONSTRAINT "UserLink_chef_id_fkey";

-- AlterTable
ALTER TABLE "UserLink" DROP COLUMN "chef_id",
ADD COLUMN     "site_name" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "RecipeIngredient";

-- CreateTable
CREATE TABLE "_RecipeIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeIngredients_AB_unique" ON "_RecipeIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeIngredients_B_index" ON "_RecipeIngredients"("B");

-- AddForeignKey
ALTER TABLE "UserLink" ADD CONSTRAINT "UserLink_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeIngredients" ADD CONSTRAINT "_RecipeIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeIngredients" ADD CONSTRAINT "_RecipeIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
