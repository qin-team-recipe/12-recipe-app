"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

const createCartListItem = async (cartListId: number, ingredientIds: number[]) => {
  const cartListItem = ingredientIds.map((ingredientId) => ({
    cartListId,
    ingredientId,
  }));

  await prisma.cartListItem.createMany({
    data: cartListItem,
  });
};

export const addCartList = async (recipeId: string, ingredientIds: number[]) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const cartList = await prisma.cartList.findMany({
    include: {
      CartListItem: true,
    },
    orderBy: {
      displayOrder: "desc",
    },
  });

  const foundCartList = cartList.find((c) => c.recipeId === recipeId);

  if (foundCartList) {
    const existingIngredientIds = foundCartList.CartListItem.map((item) => item.ingredientId);
    const unAddedIngredientIds = ingredientIds.filter((id) => !existingIngredientIds.includes(id));
    createCartListItem(foundCartList.id, unAddedIngredientIds);
  } else {
    // カート内に追加対象のレシピが存在しない場合
    const isCartListEmpty = cartList.length === 0;
    const displayOrder = isCartListEmpty ? 0 : cartList[0].displayOrder + 1;
    const createdCartList = await prisma.cartList.create({
      data: {
        userId: session.user.id,
        recipeId,
        displayOrder,
      },
    });
    createCartListItem(createdCartList.id, ingredientIds);
  }
  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
