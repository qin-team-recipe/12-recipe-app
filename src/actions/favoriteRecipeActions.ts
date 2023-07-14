"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const favoriteRecipe = async (formData: FormData) => {
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies }).auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const recipeId = String(formData.get("recipeId"));

  await prisma.favorite.create({
    data: {
      userId: session.user.id,
      recipeId,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

export const unFavoriteRecipe = async (formData: FormData) => {
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies }).auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const recipeId = String(formData.get("recipeId"));

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
