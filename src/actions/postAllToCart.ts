"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";
import { Database } from "../types/SupabaseTypes";

export const postAllToCart = async (recipeId: string, ingredientIds: number[]): Promise<ActionsResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/login");

  try {
    const cartList = await prisma.cartList.findFirst({
      where: {
        userId: session.user.id,
        recipeId: recipeId,
      },
      include: {
        CartListItem: true,
      },
    });

    const foundRecipeInCartList = cartList !== null;

    if (foundRecipeInCartList) {
      // カード内に存在しない材料だけをカートに追加する
      const existsIngredientIds = cartList.CartListItem.map((item) => item.ingredientId);
      const unAddedIngredientIds = ingredientIds.filter((id) => !existsIngredientIds.includes(id));

      // TODO:全て追加されている場合の処理が必要であれば追加する

      await prisma.cartListItem.createMany({
        data: unAddedIngredientIds.map((ingredientId) => ({
          ingredientId,
          cartListId: cartList.id,
        })),
      });
    } else {
      // お買い物リストの中で一番表示順が大きくなるようにレシピを追加する。材料も併せて追加する。
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
    }

    // TODO: 適切なパスを指定する
    revalidatePath("/my-recipe");

    return {
      isSuccess: true,
      message: "お買い物リストに追加しました🎉",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "お買い物リストへの追加に失敗しました🥲",
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
