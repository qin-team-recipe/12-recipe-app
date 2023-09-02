"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const deleteRecipe = async (recipeId: string): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    // 物理削除
    await prisma.$transaction([
      prisma.recipeImage.deleteMany({
        where: {
          recipeId,
        },
      }),
      prisma.recipeLink.deleteMany({
        where: {
          recipeId,
        },
      }),
      prisma.instruction.deleteMany({
        where: {
          recipeId,
        },
      }),
      prisma.cartList.deleteMany({
        where: {
          recipeId,
        },
      }),
      prisma.ingredient.deleteMany({
        where: {
          recipeId,
        },
      }),
      prisma.favorite.deleteMany({
        where: {
          recipeId,
        },
      }),
      prisma.recipe.delete({
        where: {
          id: recipeId,
        },
      }),
    ]);

    // TODO: 適切なパスを指定する
    revalidatePath("/mock");

    return { isSuccess: true, message: "指定のレシピを削除しました🔥" };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "レシピの削除に失敗しました🥲" };
  }
};
