"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const deleteRecipe = async (id: string): Promise<ActionsResult> => {
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

    return { isSuccess: true, message: "指定のレシピを削除しました🔥" };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "レシピの削除に失敗しました🥲" };
  }
};
