"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const addFavoriteRecipe = async (recipeId: string) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("認証に失敗しました");
  }

  await prisma.favorite.create({
    data: {
      userId: user.id,
      recipeId,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

export const deleteFavoriteRecipe = async (recipeId: string) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("認証に失敗しました");
  }

  await prisma.favorite.delete({
    where: {
      userId_recipeId: {
        userId: user.id,
        recipeId,
      },
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
