"use server";

import { revalidatePath } from "next/cache";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { zact } from "zact/server";

import { createRecipeFormSchema } from "@/src/components/create-recipe-form";

export const postRecipe = zact(createRecipeFormSchema)(
  async ({ uid, title, bio, ingredients, urls, servingCount, instructions, recipeImage }): Promise<ActionsResult> => {
    const user = await getAuthenticatedUser();

    try {
      await prisma.recipe.create({
        data: {
          title,
          description: bio,
          userId: uid,
          servingCount: servingCount,
          // 管理者が作成した場合（シェフのレシピ）は公開状態にする
          isPublished: user?.role === "ADMIN",
          RecipeImage: {
            create: {
              recipeImage: recipeImage ?? "",
            },
          },
          Ingredient: {
            create: ingredients.map((ingredient) => ({
              title: ingredient.name,
            })),
          },
          Instruction: {
            create: instructions.map((instruction, index) => ({
              stepOrder: index + 1,
              stepDescription: instruction.value,
            })),
          },
          ...(urls.find((url) => url!.value != "") && {
            RecipeLink: {
              create: urls.map((url) => ({
                linkUrl: url!.value ?? "",
              })),
            },
          }),
        },
      });

      // TODO: 適切なパスを指定する
      revalidatePath("/my-page");

      return {
        isSuccess: true,
        message: "レシピの作成に成功しました🎉",
      };
    } catch (error) {
      console.log(error);
      return { isSuccess: false, error: "レシピの作成に失敗しました🥲" };
    }
  }
);
