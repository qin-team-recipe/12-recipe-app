"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { Ingredient, Instruction, RecipeLink } from "@prisma/client";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { zact } from "zact/server";

import { editRecipeFormSchema } from "@/src/components/edit-recipe-form";
import { EditRecipeFormValues } from "@/src/components/edit-recipe-form/schema";

export const putRecipe = zact(editRecipeFormSchema)(
  async ({
    recipeId,
    title,
    bio,
    ingredients,
    urls,
    servingCount,
    instructions,
    recipeImage,
  }): Promise<ActionsResult> => {
    const cookieStore = cookies();
    const {
      data: { session },
    } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

    if (!session) redirect("/favorite");

    try {
      const existingRecipe = await prisma.recipe.findUnique({
        where: { id: recipeId },
        include: {
          Ingredient: true,
          Instruction: true,
          RecipeLink: true,
          RecipeImage: true,
        },
      });

      if (!existingRecipe) {
        return { isSuccess: false, error: "レシピが見つかりませんでした🥲" };
      }

      // 材料に関する処理
      const { toBeCreatedIngredients, toBeDeletedIngredients, toBeUpdatedIngredients } = processIngredients(
        existingRecipe,
        ingredients
      );

      // 手順に関する処理
      const { toBeCreatedInstructions, toBeDeleteInstructions, toBeUpdatedInstructions } = processInstructions(
        existingRecipe,
        instructions
      );

      // レシピリンクに関する処理
      const { toBeCreatedUrls, toBeDeletedUrls, toBeUpdatedUrls } = processUrls(existingRecipe, urls);

      // レシピ画像に関する処理
      const existingRecipeImage = existingRecipe.RecipeImage[0]?.recipeImage;

      let recipeImageUpdateData = {};
      if (recipeImage) {
        if (existingRecipeImage) {
          // 既存の画像があり、新しい画像が提供されている場合、既存の画像を更新
          recipeImageUpdateData = {
            RecipeImage: {
              update: {
                where: { id: existingRecipe.RecipeImage[0].id },
                data: { recipeImage },
              },
            },
          };
        } else {
          // 既存の画像がなく、新しい画像が提供されている場合、新しい画像を追加
          recipeImageUpdateData = {
            RecipeImage: {
              create: { recipeImage },
            },
          };
        }
      } else if (existingRecipeImage) {
        // ユーザーがレシピ画像を削除した場合
        recipeImageUpdateData = {
          RecipeImage: {
            delete: { id: existingRecipe.RecipeImage[0].id },
          },
        };
      }

      await prisma.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          title,
          description: bio,
          servingCount,
          ...recipeImageUpdateData,
          Ingredient: {
            deleteMany: toBeDeletedIngredients.map((ingredient) => ({ id: ingredient.id })),
            updateMany: toBeUpdatedIngredients.map((ingredient) => ({
              where: { id: ingredient!.id },
              data: { title: ingredient?.name },
            })),
            create: toBeCreatedIngredients.map((ingredient) => ({
              title: ingredient?.name,
            })),
          },
          Instruction: {
            deleteMany: toBeDeleteInstructions.map((instruction) => ({ id: instruction.id })),
            updateMany: toBeUpdatedInstructions.map((instruction) => ({
              where: { id: instruction!.id },
              data: { stepDescription: instruction?.stepDescription, stepOrder: instruction?.stepOrder },
            })),
            create: toBeCreatedInstructions.map((instruction, index) => ({
              stepDescription: instruction?.value,
              stepOrder: instruction?.order ?? index + 1,
            })),
          },
          RecipeLink: {
            deleteMany: toBeDeletedUrls.map((url) => ({ id: url.id })),
            updateMany: toBeUpdatedUrls.map((url) => ({
              where: { id: url!.id },
              data: { linkUrl: url?.value },
            })),
            create: toBeCreatedUrls.map((url) => ({
              linkUrl: url?.value ?? "",
            })),
          },
        },
      });

      revalidatePath(`/my-recipe/${recipeId}`);

      return {
        isSuccess: true,
        message: "レシピの編集に成功しました🎉",
      };
    } catch (error) {
      console.log(error);
      return { isSuccess: false, error: "レシピの編集に失敗しました🥲" };
    }
  }
);

type ExistingRecipe = {
  id: string;
  title: string;
  description?: string;
  servingCount: number;
  Ingredient: Ingredient[];
  Instruction: Instruction[];
  RecipeLink: RecipeLink[];
};

const processIngredients = (existingRecipe: ExistingRecipe, ingredients: EditRecipeFormValues["ingredients"]) => ({
  toBeDeletedIngredients: existingRecipe.Ingredient.filter(
    (ingredient) => !ingredients.some((value) => value?.id === ingredient.id)
  ),
  toBeUpdatedIngredients: ingredients.filter((ingredient) => ingredient?.id !== undefined),
  toBeCreatedIngredients: ingredients.filter((ingredient) => ingredient?.id === undefined),
});

const processInstructions = (existingRecipe: ExistingRecipe, instructions: EditRecipeFormValues["instructions"]) => {
  const isOrderChanged = instructions.some(
    (instruction) =>
      instruction?.id !== undefined &&
      existingRecipe.Instruction.find((existingInstruction) => existingInstruction.id === instruction.id)?.stepOrder !==
        instruction?.order
  );

  const toBeDeleteInstructions = existingRecipe.Instruction.filter(
    (instruction) => !instructions.some((value) => value?.id === instruction.id)
  );

  const toBeUpdatedInstructions = existingRecipe.Instruction.filter(
    (instruction) => !toBeDeleteInstructions.includes(instruction)
  ).map((instruction, index) => {
    if (isOrderChanged) {
      return {
        ...instruction,
        stepOrder: instructions[index]?.order,
        stepDescription: instructions[index]?.value,
      };
    }
    return {
      ...instruction,
      stepDescription: instructions[index]?.value,
    };
  });

  const toBeCreatedInstructions = instructions.filter((instruction) => instruction?.id === undefined);

  return { toBeDeleteInstructions, toBeUpdatedInstructions, toBeCreatedInstructions };
};

const processUrls = (existingRecipe: ExistingRecipe, urls: EditRecipeFormValues["urls"]) => ({
  toBeDeletedUrls: existingRecipe.RecipeLink.filter((link) => !urls.some((url) => url?.id === link.id)),
  toBeUpdatedUrls: urls.filter((url) => url?.id !== undefined),
  toBeCreatedUrls: urls.filter((url) => url?.id === undefined),
});
