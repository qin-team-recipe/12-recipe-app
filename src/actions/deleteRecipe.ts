"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/src/lib/prisma";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "../types/SupabaseTypes";

type DeleteRecipeResult = {
  isSuccess: boolean;
  error?: Error;
};

export const deleteRecipe = async (id: string): Promise<DeleteRecipeResult> => {
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies }).auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  try {
    // 物理削除
    await prisma.$transaction([
      prisma.recipeImage.deleteMany({
        where: {
          recipeId: id,
        },
      }),
      prisma.recipeLink.deleteMany({
        where: {
          recipeId: id,
        },
      }),
      prisma.instruction.deleteMany({
        where: {
          recipeId: id,
        },
      }),
      prisma.ingredient.deleteMany({
        where: {
          recipeId: id,
        },
      }),
      prisma.cartList.deleteMany({
        where: {
          recipeId: id,
        },
      }),
      prisma.favorite.deleteMany({
        where: {
          recipeId: id,
        },
      }),
      prisma.recipe.delete({
        where: {
          id,
        },
      }),
    ]);

    // TODO: 適切なパスを指定する
    revalidatePath("/mock");

    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: error as Error };
  }
};
