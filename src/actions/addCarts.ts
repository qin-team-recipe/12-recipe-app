"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const addCarts = async (recipeId: string, ingredientIds: number[]) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const cartListWithIngredients = await prisma.cartList.findMany({
    include: {
      CartListItem: true,
    },
    orderBy: {
      displayOrder: "desc",
    },
  });

  const foundCartList = cartListWithIngredients.find((cartList) => cartList.recipeId === recipeId);

  if (foundCartList) {
    createCartListItem(foundCartList.id, ingredientIds);
  } else {
    // カート内にレシピが存在しない場合
    const isEmpty = cartListWithIngredients.length === 0;
    const displayOrder = isEmpty ? 0 : cartListWithIngredients[0].displayOrder + 1;
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

async function createCartListItem(cartListId: number, ingredientIds: number[]) {
  const cartListItem = ingredientIds.map((ingredientId) => ({
    cartListId,
    ingredientId,
  }));

  await prisma.cartListItem.createMany({
    data: cartListItem,
  });
}
