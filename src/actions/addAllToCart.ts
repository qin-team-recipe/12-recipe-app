"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const addAllToCart = async (recipeId: string, ingredientIds: number[]) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const existingCartList = await prisma.cartList.findFirst({
    where: {
      userId: session.user.id,
      recipeId: recipeId,
    },
    include: {
      CartListItem: true,
    },
  });

  // レシピがすでにカートにある場合は、カートに入っていない材料のみを追加する
  if (existingCartList) {
    const existingIngredientIds = existingCartList.CartListItem.map((item) => item.ingredientId);
    const unAddedIngredientIds = ingredientIds.filter((id) => !existingIngredientIds.includes(id));

    await prisma.cartListItem.createMany({
      data: unAddedIngredientIds.map((ingredientId) => ({
        ingredientId,
        cartListId: existingCartList.id,
      })),
    });
  } else {
    const cartList = await prisma.cartList.create({
      data: {
        userId: session.user.id,
        recipeId,
      },
    });

    await prisma.cartListItem.createMany({
      data: ingredientIds.map((ingredientId) => ({
        ingredientId,
        cartListId: cartList.id,
      })),
    });
  }

  // TODO: 適切なパスを指定する
  revalidatePath("/my-recipe");
};
