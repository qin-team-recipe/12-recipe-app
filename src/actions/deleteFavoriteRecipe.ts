"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const deleteFavoriteRecipe = async (recipeId: number) => {
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
