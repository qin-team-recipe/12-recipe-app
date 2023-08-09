"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

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
