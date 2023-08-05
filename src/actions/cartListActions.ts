"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";
import { Database } from "../types/SupabaseTypes";

export const addCartList = async (recipeId: string, ingredientId: number): Promise<ActionsResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/login");

  try {
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

      if (existsIngredientId) {
        return {
          isSuccess: false,
          error: "選択された材料は既にカートに追加されています😟",
        };
      }

      await prisma.cartListItem.create({
        data: {
          cartListId: cartList.id,
          ingredientId,
        },
      });
    }

    return {
      isSuccess: true,
      message: "カートに追加しました🎉",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "カートに追加できませんでした🥲",
    };
  }
};

export const removeCartList = async (recipeId: string, cartListItemId: number) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/login");

  try {
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
      const cartListItemSize = await prisma.cartListItem.count({
        where: {
          cartListId: cartList.id,
        },
      });

      if (cartListItemSize === 1) {
        // 対象のレシピに紐づくアイテムが1つしかない場合はレシピも削除する
        prisma.$transaction([
          prisma.cartListItem.delete({
            where: {
              id: cartListItemId,
            },
          }),
          prisma.cartList.delete({
            where: {
              id: cartList.id,
            },
          }),
        ]);
      } else {
        // 2つ以上のアイテムがカート内に存在する場合はアイテムのみ削除する
        await prisma.cartListItem.delete({
          where: {
            id: cartListItemId,
          },
        });
      }
    }
  } catch (_error) {
    return {
      isSuccess: false,
      error: "削除処理に失敗しました。",
    };
  }
};

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
