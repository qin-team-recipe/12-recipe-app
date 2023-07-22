"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

const getMaxDisplayOrder = async (userId: string) => {
  const maxDisplayOrderRecord = await prisma.cartList.findFirst({
    where: {
      userId,
    },
    orderBy: {
      displayOrder: "desc",
    },
  });
  const isCartListEmpty = maxDisplayOrderRecord === null;
  return isCartListEmpty ? 0 : maxDisplayOrderRecord.displayOrder + 1;
};

export const addAllToCart = async (recipeId: string, ingredientIds: number[]) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const cartList = await prisma.cartList.findFirst({
    where: {
      userId: session.user.id,
      recipeId: recipeId,
    },
    include: {
      CartListItem: true,
    },
  });

  const isNotfoundRecipeInCartList = cartList === null;

  if (isNotfoundRecipeInCartList) {
    // お買い物リストの中で一番表示順が大きくなるようにレシピを追加する
    const maxDisplayOrder = await getMaxDisplayOrder(session.user.id);

    await prisma.cartList.create({
      data: {
        userId: session.user.id,
        recipeId,
        displayOrder: maxDisplayOrder,
        CartListItem: {
          createMany: {
            data: ingredientIds.map((ingredientId) => ({
              ingredientId,
            })),
          },
        },
      },
    });
  } else {
    const existIngredientIds = cartList.CartListItem.map((item) => item.ingredientId);
    const unAddedIngredientIds = ingredientIds.filter((id) => !existIngredientIds.includes(id));

    await prisma.cartListItem.createMany({
      data: unAddedIngredientIds.map((ingredientId) => ({
        ingredientId,
        cartListId: cartList.id,
      })),
    });
  }

  // TODO: 適切なパスを指定する
  revalidatePath("/my-recipe");
};
