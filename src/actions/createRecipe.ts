"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { zact } from "zact/server";

import { formSchema } from "../app/mock/_components/new-recipe-form";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const createRecipe = zact(formSchema)(async ({ title, bio, ingredients, urls, servingCount, instructions }) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("認証に失敗しました");
  }

  // TODO: RecipeImageの追加
  await prisma.recipe.create({
    data: {
      title,
      description: bio,
      userId: user.id,
      servingCount: servingCount,
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

  revalidatePath("/mock/tsuboi");
});
