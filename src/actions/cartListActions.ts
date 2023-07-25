"use server";

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

export const addCartList = async (recipeId: string, ingredientId: number) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const cartList = await prisma.cartList.findFirst({
    where: {
      recipeId,
      userId: session.user.id,
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
          create: {
            ingredientId,
          },
        },
      },
    });
  } else {
    // 材料をカートに追加する
    const existsIngredientId = cartList.CartListItem.find((item) => item.ingredientId === ingredientId);

    if (!existsIngredientId) {
      throw new Error("選択された材料は既にカートに追加されています。");
    }

    await prisma.cartListItem.create({
      data: {
        cartListId: cartList.id,
        ingredientId,
      },
    });
  }
};
