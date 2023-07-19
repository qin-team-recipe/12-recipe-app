-- DropForeignKey
ALTER TABLE "CartList" DROP CONSTRAINT "CartList_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "CartListItem" DROP CONSTRAINT "CartListItem_cart_list_id_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "Instruction" DROP CONSTRAINT "Instruction_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeImage" DROP CONSTRAINT "RecipeImage_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeLink" DROP CONSTRAINT "RecipeLink_recipe_id_fkey";

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeLink" ADD CONSTRAINT "RecipeLink_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartList" ADD CONSTRAINT "CartList_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartListItem" ADD CONSTRAINT "CartListItem_cart_list_id_fkey" FOREIGN KEY ("cart_list_id") REFERENCES "CartList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
