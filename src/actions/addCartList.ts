"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

const createCartListItem = async (cartListId: number, ingredientIds: number[]) => {
  await prisma.cartListItem.createMany({
    data: ingredientIds.map((ingredientId) => ({
      cartListId,
      ingredientId,
    })),
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
    // レシピが既にカート内に存在する場合は、カートに入っていない材料のみを追加する
    const existingIngredientIds = foundCartList.CartListItem.map((item) => item.ingredientId);
    const unAddedIngredientIds = ingredientIds.filter((id) => !existingIngredientIds.includes(id));
    createCartListItem(foundCartList.id, unAddedIngredientIds);
  } else {
    // レシピがカート内に存在しない場合、レシピをカートに追加したあと全ての材料を追加する
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
