"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { supabaseServerClient } from "../lib/supabase/supabase-server";

export const addFavoriteRecipe = async (recipeId: string) => {
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  await prisma.favorite.create({
    data: {
      userId: session.user.id,
      recipeId,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

export const deleteFavoriteRecipe = async (recipeId: string) => {
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  await prisma.favorite.delete({
    where: {
      userId_recipeId: {
        userId: session.user.id,
        recipeId,
      },
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
