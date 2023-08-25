"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { zact } from "zact/server";

import { createDraftRecipeFormSchema } from "@/src/components/create-recipe-form/schema";

export const postDraftRecipe = zact(createDraftRecipeFormSchema)(
  async ({ uid, title, bio, ingredients, urls, servingCount, instructions, recipeImage }): Promise<ActionsResult> => {
    try {
      await prisma.draftRecipe.create({
        data: {
          title: title ?? "",
          description: bio,
          userId: uid,
          servingCount: servingCount,

          DraftRecipeImage:
            recipeImage && recipeImage.length > 0
              ? {
                  create: {
                    recipeImage: recipeImage ?? "",
                  },
                }
              : undefined,

          DraftIngredient:
            ingredients && ingredients.filter((ingredient) => ingredient?.name).length > 0
              ? {
                  create: ingredients.map((ingredient) => ({
                    title: ingredient?.name ?? "",
                  })),
                }
              : undefined,

          DraftInstruction:
            instructions && instructions.filter((instruction) => instruction?.value).length > 0
              ? {
                  create: instructions.map((instruction, index) => ({
                    stepOrder: index + 1,
                    stepDescription: instruction?.value ?? "",
                  })),
                }
              : undefined,

          DraftRecipeLink:
            urls && urls.filter((url) => url?.value).length > 0
              ? {
                  create: urls.map((url) => ({
                    linkUrl: url?.value ?? "",
                  })),
                }
              : undefined,
        },
      });

      revalidatePath("/my-recipe/drafts");

      return { isSuccess: true, message: "下書きを作成しました🎉" };
    } catch (error) {
      console.log(error);
      return { isSuccess: false, error: "下書きの作成に失敗しました🥲" };
    }
  }
);
