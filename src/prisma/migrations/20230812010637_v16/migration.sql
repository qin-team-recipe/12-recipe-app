/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `Memo` table. All the data in the column will be lost.
  - Made the column `created_at` on table `CartList` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `CartList` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `CartListItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `CartListItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `DraftIngredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `DraftIngredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `DraftInstruction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `DraftInstruction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `DraftRecipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `DraftRecipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `DraftRecipeImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `DraftRecipeImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `DraftRecipeLink` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `DraftRecipeLink` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Favorite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Favorite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Instruction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Instruction` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `order` to the `Memo` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Memo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Memo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `RecipeImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `RecipeImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `RecipeLink` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `RecipeLink` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `UserFollower` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `UserFollower` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `UserLink` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `UserLink` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartList" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "CartListItem" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "DraftIngredient" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "DraftInstruction" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "DraftRecipe" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "DraftRecipeImage" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "DraftRecipeLink" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Instruction" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "deleted_at",
ADD COLUMN     "order" INTEGER NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "RecipeImage" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "RecipeLink" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserFollower" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserLink" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
