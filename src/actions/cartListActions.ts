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

  const existsRecipeInCartList = cartList !== null;

  if (existsRecipeInCartList) {
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
  } else {
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
  }
};

export const removeCartList = async (recipeId: string, cartListItemId: number) => {
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

  const existsRecipeInCartList = cartList !== null;

  if (existsRecipeInCartList) {
    await prisma.cartListItem.delete({
      where: {
        id: cartListItemId,
      },
    });

    const cartListItemSize = await prisma.cartListItem.count({
      where: {
        cartListId: cartList.id,
      },
    });

    if (cartListItemSize === 0) {
      // 材料がカート内に存在しない場合カートからレシピを削除する
      await prisma.cartList.delete({
        where: {
          id: cartList.id,
        },
      });
    }
  }
};
