"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";

import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const deleteRecipe = async (formData: FormData) => {
  const id = String(formData.get("recipeId"));

  const user = await getAuthenticatedUser();

  if (user?.role !== "ADMIN") {
    throw new Error("権限がありません");
  }

  // 論理削除
  await prisma.recipe.update({
    data: {
      deletedAt: new Date(),
      // TODO: 関連するデータも論理削除する
    },
    where: {
      id,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
