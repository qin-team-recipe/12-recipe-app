"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const restoreRecipe = async (formData: FormData) => {
  const id = String(formData.get("recipeId"));

  const user = await getAuthenticatedUser();

  if (user?.role !== "ADMIN") {
    throw new Error("権限がありません");
  }

  await prisma.recipe.update({
    data: {
      deletedAt: null,
    },
    where: {
      id,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
