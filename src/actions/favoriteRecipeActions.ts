"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";
import { Database } from "../types/SupabaseTypes";

export const favoriteRecipe = async (recipeId: string): Promise<ActionsResult> => {
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies }).auth.getSession();

  if (!session) redirect("/login");

  try {
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        recipeId,
      },
    });

    // TODO: 適切なパスを指定する
    revalidatePath("/");

    return {
      isSuccess: true,
      message: "お気に入りに追加しました🎉",
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "お気に入りに追加できませんでした🥲" };
  }
};

export const unFavoriteRecipe = async (recipeId: string): Promise<ActionsResult> => {
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies }).auth.getSession();

  if (!session) redirect("/login");

  try {
    await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId,
        },
      },
    });

    // TODO: 適切なパスを指定する
    revalidatePath("/");

    return {
      isSuccess: true,
      message: "お気に入りから削除しました🔥",
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "お気に入りから削除できませんでした🥲" };
  }
};
