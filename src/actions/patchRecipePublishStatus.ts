"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";

export const patchRecipePublishStatus = async (id: string): Promise<ActionsResult> => {
  try {
    const currentRecipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
      select: {
        isPublished: true,
      },
    });

    if (!currentRecipe) {
      return {
        isSuccess: false,
        error: "レシピの取得に失敗しました🥲",
      };
    }

    const updatedRecipe = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        isPublished: !currentRecipe.isPublished,
      },
      select: {
        isPublished: true,
      },
    });

    if (!updatedRecipe) {
      return {
        isSuccess: false,
        error: "レシピの更新に失敗しました🥲",
      };
    }

    revalidatePath(`/my-recipe/${id}`);

    return {
      isSuccess: true,
      message: `レシピの公開状態を${updatedRecipe.isPublished ? "「公開」" : "「非公開」"}に変更しました🎉`,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      error: "レシピの公開状態の変更に失敗しました🥲",
    };
  }
};
